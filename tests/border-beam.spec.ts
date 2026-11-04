import { test, expect } from '@playwright/test'
import { PNG } from 'pngjs'
import { writeFileSync } from 'node:fs'

// A beam pixel must stay in the outer 2px capsule ring (one pixel diagonal of raster antialiasing tolerance). Comparing the same
// rendered frame with/without the beam excludes the approved gradient/shadows.
for (const theme of ['light', 'dark']) {
  test(`${theme}: beam stays on the pill perimeter for an entire orbit`, async ({ page }, testInfo) => {
    await page.goto(`/tests/fixtures/beam.html?theme=${theme}`)
    const buttons = page.locator('.axo-button--border-beam')
    await expect(buttons).toHaveCount(12)
    const client = await page.context().newCDPSession(page)
    await client.send('DOM.enable')
    await client.send('CSS.enable')
    const { root } = await client.send('DOM.getDocument')
    const { nodeIds } = await client.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.axo-button--border-beam' })
    for (const nodeId of nodeIds) await client.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] })
    await page.waitForTimeout(650) // Let approved surface transitions finish.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('.axo-button-border-beam rect')) {
        for (const animation of el.getAnimations()) { animation.pause(); animation.currentTime = 0 }
      }
    })
    const boxes = await buttons.evaluateAll(els => els.map(el => {
      const { x, y, width, height } = el.getBoundingClientRect()
      return { x, y, width, height }
    }))
    // Check the continuous centerline independently of pixel rasterization.
    const errors = await buttons.evaluateAll(els => els.map(el => {
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
    }))
    for (const error of errors) expect(error).toBeLessThan(.01)
    const hidden = await page.addStyleTag({ content: '.axo-button-border-beam rect { stroke-opacity: 0; }' })
    const baseBuffer = await page.screenshot()
    const baseline = PNG.sync.read(baseBuffer)
    await hidden.evaluate(el => el.remove())
    let changedFrames = 0
    const distinctFrames = new Set<string>()
    for (let phase = 0; phase < 120; phase++) {
      await page.evaluate(time => {
        for (const el of document.querySelectorAll('.axo-button-border-beam rect')) {
          for (const a of el.getAnimations()) a.currentTime = time
        }
      }, phase * 25)
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
        const path = testInfo.outputPath(`phase-${phase * 25}ms.png`)
        writeFileSync(path, buffer)
        await testInfo.attach(`phase-${phase * 25}ms`, { path, contentType: 'image/png' })
      }
      expect(violations, `Light outside border at ${phase * 25}ms`).toEqual([])
      expect(changed, 'Beam must remain visible at every phase').toBeGreaterThan(30)
      for (const count of counts) expect(count, 'Every button must show its beam').toBeGreaterThan(5)
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
