import { test, expect } from '@playwright/test'
import { PNG } from 'pngjs'
import { writeFileSync } from 'node:fs'

// A beam pixel must stay in the outer 2px capsule ring (one pixel diagonal of raster antialiasing tolerance). Comparing the same
// rendered frame with/without the beam excludes the approved gradient/shadows.
for (const theme of ['light', 'dark']) for (const motion of ['beam', 'spin']) {
  test(`${theme}/${motion}: light stays on the pill perimeter for an entire orbit`, async ({ page }, testInfo) => {
    await page.goto(`/tests/fixtures/beam.html?theme=${theme}&motion=${motion}`)
    const buttons = page.locator(`.axo-button--border-${motion}`)
    await expect(buttons).toHaveCount(12)
    const client = await page.context().newCDPSession(page)
    await client.send('DOM.enable')
    await client.send('CSS.enable')
    const { root } = await client.send('DOM.getDocument')
    const { nodeIds } = await client.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: `.axo-button--border-${motion}` })
    for (const nodeId of nodeIds) await client.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] })
    await page.waitForTimeout(650) // Let approved surface transitions finish.
    await page.evaluate(name => {
      for (const animation of document.getAnimations()) {
        if (animation instanceof CSSAnimation && animation.animationName === name) { animation.pause(); animation.currentTime = 0 }
      }
    }, motion === 'beam' ? 'axo-border-beam' : 'axo-border-spin')
    const boxes = await buttons.evaluateAll(els => els.map(el => {
      const { x, y, width, height } = el.getBoundingClientRect()
      return { x, y, width, height }
    }))
    // Check the continuous centerline independently of pixel rasterization.
    const errors = motion === 'beam' ? await buttons.evaluateAll(els => els.map(el => {
      const rect = el.querySelector('rect')!
      const outer = el.getBoundingClientRect()
      const radius = Math.min(outer.width, outer.height) / 2
      let error = 0
      for (let i = 0; i < 1000; i++) {
        const p = rect.getPointAtLength(rect.getTotalLength() * i / 1000)
        const cx = Math.max(radius, Math.min(outer.width - radius, p.x))
        error = Math.max(error, Math.abs(Math.hypot(p.x - cx, p.y - outer.height / 2) - (radius - 1)))
      }
      return error
    })) : []
    for (const error of errors) expect(error).toBeLessThan(.01)
    const hidden = await page.addStyleTag({ content: motion === 'beam' ? '.axo-button-border-beam rect { stroke-opacity: 0; }' : '.axo-button.axo-button--border-spin:hover::before { opacity: 0; }' })
    if (motion === 'spin') await expect.poll(() => buttons.first().evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('0')
    const baseBuffer = await page.screenshot()
    const baseline = PNG.sync.read(baseBuffer)
    await hidden.evaluate(el => el.remove())
    if (motion === 'spin') await expect.poll(() => buttons.first().evaluate(el => getComputedStyle(el, '::before').opacity)).toBe('1')
    let changedFrames = 0
    const distinctFrames = new Set<string>()
    for (let phase = 0; phase < 120; phase++) {
      const time = phase * (motion === 'beam' ? 25 : 2800 / 120)
      const label = Math.round(time)
      await page.evaluate(({time, name}) => {
        for (const a of document.getAnimations()) {
          if (a instanceof CSSAnimation && a.animationName === name) a.currentTime = time
        }
      }, { time, name: motion === 'beam' ? 'axo-border-beam' : 'axo-border-spin' })
      const buffer = await page.screenshot()
      const frame = PNG.sync.read(buffer)
      const counts = boxes.map(() => 0)
      let changed = 0
      const violations: string[] = []
      for (let y = 0; y < frame.height; y++) for (let x = 0; x < frame.width; x++) {
        const i = (y * frame.width + x) * 4
        if (Math.max(...[0, 1, 2].map(c => Math.abs(frame.data[i+c] - baseline.data[i+c]))) < 6) continue
        changed++
        const onRing = boxes.some((b, index) => {
          const radius = Math.min(b.width, b.height) / 2
          const px = x + .5 - b.x, py = y + .5 - b.y
          const cx = Math.max(radius, Math.min(b.width - radius, px))
          const distance = Math.hypot(px - cx, py - b.height / 2)
          const inside = distance >= radius - 2 - Math.SQRT2 && distance <= radius + Math.SQRT2
          if (inside) counts[index]++
          return inside
        })
        if (!onRing && violations.length < 5) violations.push(`${x},${y}`)
      }
      if (phase % 15 === 0 || violations.length) {
        const path = testInfo.outputPath(`phase-${label}ms.png`)
        writeFileSync(path, buffer)
        await testInfo.attach(`phase-${label}ms`, { path, contentType: 'image/png' })
      }
      expect(violations, `Light outside border at ${label}ms`).toEqual([])
      expect(changed, 'Beam must remain visible at every phase').toBeGreaterThan(30)
      for (const count of counts) expect(count, 'Every button must show its beam').toBeGreaterThan(5)
      // A moving accent must leave most of the perimeter unlit. A permanent
      // full ring would pass a position-only test, so sample it independently.
      for (const b of boxes) {
        const r = Math.min(b.width, b.height) / 2 - 1
        const straight = b.width - 2 * (r + 1)
        const perimeter = 2 * straight + 2 * Math.PI * r
        let lit = 0
        for (let sample = 0; sample < 64; sample++) {
          let d = sample / 64 * perimeter
          let px: number, py: number
          if (d < straight) { px = r + 1 + d; py = 1 }
          else if ((d -= straight) < Math.PI * r) {
            const a = -Math.PI / 2 + d / r
            px = b.width - r - 1 + Math.cos(a) * r; py = b.height / 2 + Math.sin(a) * r
          } else if ((d -= Math.PI * r) < straight) { px = b.width - r - 1 - d; py = b.height - 1 }
          else {
            d -= straight
            const a = Math.PI / 2 + d / r
            px = r + 1 + Math.cos(a) * r; py = b.height / 2 + Math.sin(a) * r
          }
          let visible = false
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const x = Math.round(b.x + px) + dx, y = Math.round(b.y + py) + dy
            const i = (y * frame.width + x) * 4
            if ([0,1,2].some(c => Math.abs(frame.data[i+c] - baseline.data[i+c]) >= 6)) visible = true
          }
          if (visible) lit++
        }
        expect(lit, 'Accent must not form a continuous frame').toBeLessThan(48)
      }
      distinctFrames.add(buffer.toString('base64'))
      changedFrames++
    }
    expect(changedFrames).toBe(120)
    expect(distinctFrames.size, 'Beam must travel, not stay stationary').toBe(120)
  })
}

for (const theme of ['light', 'dark']) {
  test(`${theme}: hover, keyboard focus, resize and reduced motion`, async ({ page }, testInfo) => {
    await page.goto('/')
    await page.getByRole('group', { name: 'Téma katalogu' }).getByRole('button', { name: theme === 'light' ? '☀ Light' : '☾ Dark', exact: true }).click()
    await page.getByRole('button', { name: 'Components / Buttons', exact: true }).click()
    const button = page.locator('.axo-button--border-beam')
    const beam = button.locator('.axo-button-border-beam')
    await expect(beam).toHaveCSS('opacity', '0')
    await button.hover()
    await expect(beam).toHaveCSS('opacity', '1')
    await testInfo.attach('actual-hover', { body: await button.screenshot(), contentType: 'image/png' })
    // Real content changes and a CSS height override must update both axes.
    await button.locator('.axo-button-label').evaluate(el => { el.textContent = 'Analyzovat všechny vybrané stránky' })
    await button.evaluate(el => { el.style.height = '64px' })
    await expect.poll(() => button.evaluate(el => {
      const b = el.getBoundingClientRect()
      const r = el.querySelector('.axo-button-border-beam rect')!
      return [Number(r.getAttribute('width')) + 2 - b.width,
        Number(r.getAttribute('height')) + 2 - b.height,
        Number(r.getAttribute('rx')) - (b.height - 2) / 2]
    })).toEqual([0, 0, 0])
    await page.mouse.move(0, 0)
    await expect(beam).toHaveCSS('opacity', '0')
    await button.focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(beam).toHaveCSS('opacity', '1')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(beam).toHaveCSS('opacity', '0')
    await expect(beam.locator('rect')).toHaveCSS('animation-name', 'none')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await button.evaluate(el => { el.blur(); el.setAttribute('disabled', '') })
    await button.hover({ force: true })
    await expect(beam).toHaveCSS('opacity', '0')
  })
}
