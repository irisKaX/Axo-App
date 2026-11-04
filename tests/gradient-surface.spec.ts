import { test, expect } from '@playwright/test'
import { PNG } from 'pngjs'

for (const theme of ['light', 'dark']) for (const motion of ['none', 'beam', 'spin']) {
  test(`${theme}/${motion}: idle gradient is a single uninterrupted Blue × Purple surface`, async ({ page }, testInfo) => {
    await page.goto(`/tests/fixtures/beam.html?theme=${theme}&motion=${motion}`)
    const buttons = page.locator('.axo-button--gradient')
    await expect(buttons).toHaveCount(12)
    // Keep the geometry, but hide text/glyphs so every pixel of the fill is tested.
    await page.addStyleTag({content: '.axo-button-label,.axo-button-icon {visibility:hidden} '})
    const actual = await page.screenshot()
    await testInfo.attach('idle-before-reference', { body: actual, contentType: 'image/png' })
    // Independent visual oracle: one approved gradient painted across the full
    // border box. There is no inset surface, outline, or inset shadow.
    await buttons.evaluateAll(els => els.forEach(el => {
      const button = el as HTMLElement
      button.style.background = 'linear-gradient(130deg,#0F9FDC 0%,#3B09C7 52%,#8101EC 100%) border-box no-repeat'
      button.style.borderColor = 'transparent'
      button.style.boxShadow = '0 3px 8px #00000026'
      button.style.outline = 'none'
      button.querySelector('.axo-button-gradient-surface')?.remove()
      button.querySelector('.axo-button-border-beam')?.remove()
    }))
    await page.addStyleTag({content: '.axo-button.axo-button--gradient::before { content: none; }'})
    const reference = await page.screenshot()
    const a = PNG.sync.read(actual), b = PNG.sync.read(reference)
    const boxes = await buttons.evaluateAll(els => els.map(el => {
      const {x,y,width,height}=el.getBoundingClientRect();return {x,y,width,height}
    }))
    let different = 0
    for (const box of boxes) {
      for(let y=Math.floor(box.y);y<Math.ceil(box.y+box.height);y++) {
        for(let x=Math.floor(box.x);x<Math.ceil(box.x+box.width);x++) {
          const i=(y*a.width+x)*4
          if([0,1,2].some(c=>Math.abs(a.data[i+c]-b.data[i+c])>3))different++
        }
      }
    }
    expect(different, 'Idle fill and perimeter must match a single full-box gradient, including the rounded ends').toBe(0)
  })
}

for (const theme of ['light','dark']) {
  test(`${theme}: gradient hover has neutral depth, no lift or colored icon ring`, async ({page}) => {
    await page.goto(`/tests/fixtures/beam.html?theme=${theme}&motion=none`)
    for (const button of await page.locator('.axo-button--gradient').all()) {
      const before = await button.boundingBox()
      await button.hover()
      await expect(button).toHaveCSS('transform','none')
      await expect(button).toHaveCSS('box-shadow','rgba(0, 0, 0, 0.16) 0px 5px 14px 0px')
      expect(await button.boundingBox()).toEqual(before)
    }
  })
}

test('approved Copy, Download, Plus and Arrow glyph motion is preserved', async ({page}) => {
  await page.goto('/')
  await page.getByRole('button',{name:'Components / Buttons',exact:true}).click()
  const studio=page.locator('.bs-motion-grid')
  const copy=studio.locator('.axo-button').filter({has:page.locator('.axo-glyph-copy-front')}).first()
  await copy.hover()
  await expect(copy.locator('.axo-glyph-copy-front')).toHaveCSS('transform','matrix(1, 0, 0, 1, 2, 2)')
  await expect(copy.locator('.axo-glyph-copy-back')).toHaveCSS('transform','matrix(1, 0, 0, 1, -2, -2)')
  const download=studio.locator('.axo-button').filter({has:page.locator('.axo-glyph-download-arrow')}).first()
  await download.hover()
  await expect(download.locator('.axo-glyph-download-arrow')).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, 3)')
  await expect(download.locator('.axo-glyph-download-tray')).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, 0.5)')
  const plus=studio.getByRole('button',{name:'Přidat položku',exact:true})
  await plus.hover()
  await expect(plus.locator('.axo-button-icon')).toHaveCSS('transform','matrix(0, 1, -1, 0, 0, 0)')
  const arrow=studio.locator('.axo-button--gradient').first()
  await arrow.hover()
  const glyph=arrow.locator('[data-icon="arrow-right"]')
  await expect(glyph).toHaveCSS('animation-name','axo-arrow-travel')
  await expect(glyph).toHaveCSS('opacity','1')
  await expect(glyph).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, 0)')
})

for (const theme of ['light', 'dark']) {
  test(`${theme}: gradient smoothly swaps blue and purple on hover without changing geometry`, async ({page}) => {
    await page.goto(`/tests/fixtures/beam.html?theme=${theme}&motion=none`)
    const button = page.locator('.axo-button--gradient').first()
    const initialBox = await button.boundingBox()
    const stops = async () => button.evaluate(el => {
      const s = getComputedStyle(el)
      return {
        first: s.getPropertyValue('--axo-gradient-first').trim(),
        last: s.getPropertyValue('--axo-gradient-last').trim(),
        background: s.backgroundImage,
      }
    })
    const start = await stops()
    expect(start.first).toBe('rgb(15, 159, 220)')
    expect(start.last).toBe('rgb(129, 1, 236)')
    await button.hover()
    await page.waitForTimeout(240)
    const halfway = await stops()
    expect(halfway.first).not.toBe(start.first)
    expect(halfway.last).not.toBe(start.last)
    await page.waitForTimeout(400)
    const reversed = await stops()
    expect(reversed.first).toBe(start.last)
    expect(reversed.last).toBe(start.first)
    expect(await button.boundingBox()).toEqual(initialBox)
    await page.mouse.move(0, 0)
    await page.waitForTimeout(560)
    expect((await stops()).first).toBe(start.first)
    expect((await stops()).last).toBe(start.last)
  })
}
