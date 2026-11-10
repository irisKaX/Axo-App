import { test, expect, type Page } from '@playwright/test'

async function noPageOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
}

test('converter uses shared viewport shells, preserves files and keeps actions reachable', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 })
  await page.goto('/?tool=image-converter')
  await expect(page.locator('.axo-app-shell')).toHaveCount(1)
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.locator('.axo-tool-shell .axo-workspace-layout')).toHaveCount(1)
  const action = page.getByRole('button', { name: 'Převést do WebP', exact: true })
  await expect(action).toBeDisabled()
  const box = await action.boundingBox()
  expect(box!.y + box!.height).toBeLessThanOrEqual(768)
  await page.locator('input[type=file]').first().setInputFiles({ name: 'a-very-long-image-filename-to-test-safe-truncation-without-any-page-overflow.png', mimeType: 'image/png', buffer: Buffer.from('image fixture') })
  await expect(action).toBeEnabled()
  await expect(page.locator('.icl-file-row')).toHaveCount(1)
  await noPageOverflow(page)
  await action.click()
  await expect(page.locator('.icl-result-note')).toContainText('ilustrační')
  await expect(page.getByText('Návrhová ukázka', { exact: false }).first()).toBeVisible()
})

for (const id of ['workspace', 'form-result', 'data', 'editor']) {
  test(`${id}: shared archetype renders empty and populated content`, async ({ page }) => {
    await page.goto(`/?preview=${id}&state=empty`)
    await expect(page.locator(`[data-layout-demo="${id}"]`)).toHaveCount(1)
    await expect(page.locator('.axo-tool-empty')).toBeVisible()
    await page.goto(`/?preview=${id}&state=ready`)
    await expect(page.getByText('Ilustrační data', { exact: false }).first()).toBeVisible()
    await expect(page.locator('.axo-tool-panel')).not.toHaveCount(0)
    await noPageOverflow(page)
  })
}

test('catalog preview uses literal CSS pixels and same standalone component tree', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Layouts', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Axolotl Layout System' })).toBeVisible()
  const iframe = page.locator('iframe[title="Workspace Layout · živý náhled"]')
  await expect(iframe).toHaveAttribute('width', '1366')
  await expect(iframe).toHaveAttribute('height', '768')
  expect(await iframe.evaluate(el => getComputedStyle(el).transform)).toBe('none')
  await expect(page.frameLocator('iframe').locator('.axo-app-shell .axo-tool-shell .axo-workspace-layout')).toHaveCount(1)
})

const viewports = [{ width: 1366, height: 768 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }]
for (const viewport of viewports) for (const theme of ['dark', 'light']) for (const id of ['image-converter', 'workspace', 'form-result', 'data', 'editor']) {
  test(`${id} ${viewport.width}x${viewport.height} ${theme}: geometry, overflow and CTA`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.goto(`/?preview=${id}&state=ready&theme=${theme}`)
    await expect(page.locator('.axo-app-shell')).toHaveAttribute('data-theme', theme)
    const shell = await page.locator('.axo-app-shell').boundingBox()
    expect(shell!.width).toBe(viewport.width)
    await noPageOverflow(page)
    const footer = page.locator('.axo-tool-footer')
    await expect(footer).toBeVisible()
    if (viewport.width > 620) {
      const box = await footer.boundingBox()
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height)
      // Supporting and working panels must have an independent, keyboard reachable scroll path.
      const primary = page.locator('.axo-layout-primary .axo-tool-panel').first()
      expect(await primary.evaluate(el => ['auto', 'scroll'].includes(getComputedStyle(el).overflowY))).toBe(true)
    } else {
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeInViewport()
      if(id==='data')expect(await page.locator('.axo-demo-table-scroll').evaluate(el => getComputedStyle(el).overflowX)).toBe('auto')
      else expect(await page.locator('.axo-tool-panel').first().evaluate(el => getComputedStyle(el).overflowY)).toBe('visible')
    }
    if (viewport.width === 1366 || viewport.width === 390) {
      await page.screenshot({ path: `docs/layout-system/screenshots/${id}-${viewport.width}-${theme}.png`, fullPage: true })
      await testInfo.attach('layout-viewport', { path: `docs/layout-system/screenshots/${id}-${viewport.width}-${theme}.png`, contentType: 'image/png' })
    }
  })
}

for (const id of ['workspace', 'form-result', 'data', 'editor', 'image-converter']) for (const state of ['processing', 'error', 'disabled', 'success']) {
  test(`${id}: ${state} state is explicit and accessible`, async ({ page }) => {
    await page.goto(`/?preview=${id}&state=${state}`)
    if (state === 'processing') await expect(page.getByRole('status').filter({ hasText: /ukáz|Načítání/ }).first()).toBeVisible()
    if (state === 'error') await expect(page.getByRole('alert')).toBeVisible()
    if (state === 'disabled') {
      const control = id === 'image-converter' ? page.getByRole('button', { name: 'Převést do WebP', exact: true }) : page.locator('.axo-demo-root input,.axo-demo-root textarea').first()
      await expect(control).toBeDisabled()
    }
    if (state === 'success') await expect(page.getByText(/ilustrační|Ilustrační/).first()).toBeVisible()
  })
}

for (const id of ['workspace', 'data', 'editor']) {
  test(`${id}: optional panels leave no empty tracks`, async ({ page }) => {
    await page.goto(`/?preview=${id}&state=ready&panels=hidden`)
    await expect(page.locator('.axo-layout-support,.axo-editor-navigation,.axo-editor-inspector')).toHaveCount(0)
    const primary = await page.locator('.axo-layout-primary').boundingBox()
    const body = await page.locator('.axo-tool-body').boundingBox()
    expect(primary!.width).toBeCloseTo(body!.width, 0)
  })
}

test('converter long lists scroll without clipping desktop actions and remain editable', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 })
  await page.goto('/?tool=image-converter')
  await page.locator('input[type=file]').first().setInputFiles(Array.from({ length: 45 }, (_, i) => ({ name: `long-illustrative-image-filename-with-additional-content-number-${i}.png`, mimeType: 'image/png', buffer: Buffer.from('fixture') })))
  const list = page.locator('.icl-file-list')
  await expect(page.locator('.icl-file-row')).toHaveCount(45)
  expect(await list.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true)
  await page.locator('.icl-file-row').last().scrollIntoViewIfNeeded()
  await expect(page.locator('.icl-file-row').last()).toBeInViewport()
  await expect(page.getByRole('button', { name: 'Převést do WebP', exact: true })).toBeInViewport()
  await page.locator('.icl-file-row').last().getByRole('button').click()
  await expect(page.locator('.icl-file-row')).toHaveCount(44)
  await noPageOverflow(page)
  await page.screenshot({ path: 'docs/layout-system/screenshots/converter-long-list.png' })
})

test('keyboard focus, select, slider, navigation and theme remain usable', async ({ page }) => {
  await page.goto('/?tool=image-converter')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Přejít na obsah' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  const format = page.getByRole('button', { name: /Výstupní formát/ })
  await format.focus()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(format).toContainText('JPG')
  await expect(format).toBeFocused()
  expect(await format.evaluate(el => getComputedStyle(el).boxShadow)).toContain('inset')
  const slider = page.getByRole('slider', { name: 'Kvalita obrázku' })
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveValue('81')
  await page.getByRole('switch', { name: 'Tmavý režim' }).focus()
  await page.keyboard.press('Space')
  await expect(page.locator('.axo-app-shell')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'Tools', exact: true }).click()
  await expect(page.getByRole('menuitem', { name: 'Konvertor WebP' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('menuitem', { name: 'Konvertor WebP' })).toHaveCount(0)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Otevřít nabídku' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Otevřít nabídku' })).toBeFocused()
})

test('preview theme synchronization preserves files, exact viewport presets and fullscreen route', async ({ page, context }) => {
  await page.goto('/')
  await page.getByRole('group', { name: 'Téma katalogu' }).getByRole('button', { name: '☀ Light' }).click()
  await page.getByRole('button', { name: 'Layouts', exact: true }).click()
  await page.getByRole('navigation', { name: 'Axolotl Layout System' }).getByRole('button', { name: 'Image Converter', exact: true }).click()
  const child = page.frameLocator('iframe')
  await expect(child.locator('.axo-app-shell')).toHaveAttribute('data-theme', 'light')
  await child.locator('input[type=file]').first().setInputFiles({ name: 'theme-persistence.png', mimeType: 'image/png', buffer: Buffer.from('fixture') })
  await page.getByRole('group', { name: 'Téma katalogu' }).getByRole('button', { name: '☾ Dark' }).click()
  await expect(child.locator('.axo-app-shell')).toHaveAttribute('data-theme', 'dark')
  await expect(child.locator('.icl-file-row')).toHaveCount(1)
  await child.getByRole('switch', { name: 'Tmavý režim' }).click()
  await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'light')
  for (const [label, width, height] of [['Laptop · 1440 × 900', 1440, 900], ['Desktop · 1920 × 1080', 1920, 1080], ['Mobile · 390 × 844', 390, 844]] as const) {
    await page.getByRole('button', { name: /Viewport náhledu/ }).click()
    await page.getByRole('option', { name: label, exact: true }).click()
    const iframe = page.locator('iframe')
    expect(await iframe.evaluate(el => el.getBoundingClientRect().width)).toBe(width)
    expect(await iframe.evaluate(el => el.getBoundingClientRect().height)).toBe(height)
    await expect(child.locator('.icl-file-row')).toHaveCount(1)
  }
  const popupPromise = context.waitForEvent('page')
  await page.getByRole('link', { name: /Otevřít v celé obrazovce/ }).click()
  const popup = await popupPromise
  await popup.waitForLoadState()
  await expect(popup.locator('.axo-app-shell')).toHaveCount(1)
  await expect(popup.locator('.sidebar,.ls-preview-controls')).toHaveCount(0)
  expect(await popup.locator('.axo-app-shell').evaluate(el => el.clientWidth === window.innerWidth)).toBe(true)
})

test('action labels remain fully visible at approved control height', async ({ page }) => {
  await page.goto('/?tool=image-converter&state=ready')
  const button = page.getByRole('button', { name: 'Převést do WebP', exact: true })
  const label = button.locator('.axo-button-label')
  expect(await label.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)
  expect((await button.boundingBox())!.height).toBe(38)
})

for (const theme of ['dark', 'light']) for (const state of ['empty', 'success']) {
  test(`converter ${state} ${theme}: visual evidence`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(`/?tool=image-converter&state=${state}&theme=${theme}`)
    await expect(page.locator('.axo-tool-shell')).toBeVisible()
    await page.screenshot({ path: `docs/layout-system/screenshots/converter-${state}-${theme}.png` })
  })
}

test('short laptop and tablet workspaces retain scroll paths and visible footer', async ({ page }) => {
  for (const viewport of [{ width: 1366, height: 500 }, { width: 768, height: 1024 }]) {
    for (const id of ['workspace', 'editor', 'image-converter', 'form-result', 'data']) {
      await page.setViewportSize(viewport)
      await page.goto(`/?preview=${id}&state=ready`)
      await noPageOverflow(page)
      await expect(page.locator('.axo-tool-footer')).toBeInViewport()
    }
  }
})

test('compact form result has a scroll path and dashboard retains six live widgets', async ({ page }) => {
  await page.goto('/?preview=form-result&state=ready&presentation=compact')
  await expect(page.locator('.axo-form-result-layout')).toHaveClass(/is-compact/)
  await expect(page.getByRole('region', { name: 'Výstup', exact: true })).toBeVisible()
  await page.getByRole('region', { name: 'Výstup', exact: true }).scrollIntoViewIfNeeded()
  await expect(page.getByRole('button', { name: 'Vymazat ukázku' })).toBeInViewport()
  await page.goto('/?preview=dashboard')
  await expect(page.locator('.axo-app-shell')).toHaveCount(1)
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.locator('.widget-foundation')).toHaveCount(6)
  await noPageOverflow(page)
})

test('catalog stays within mobile page while its native-size preview scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Layouts', exact: true }).click()
  await noPageOverflow(page)
  const scroll = page.getByRole('region', { name: 'Posouvat náhled v původní velikosti' })
  expect(await scroll.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true)
  await page.screenshot({ path: 'docs/layout-system/screenshots/catalog-mobile.png', fullPage: true })
})

for (const id of ['app-shell', 'tool-shell']) test(`${id}: real shell supports both themes`, async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    await page.goto(`/?preview=${id}&state=ready&theme=${theme}`)
    await expect(page.locator('.axo-app-shell')).toHaveAttribute('data-theme', theme)
    await expect(page.locator(`[data-layout-demo=${id}]`)).toBeVisible()
    await expect(page.getByRole('main')).toHaveCount(1)
  }
})

for (const fixture of [{ id: 'form-result', width: 1366, height: 768, extra: '&presentation=compact' }, { id: 'editor', width: 1000, height: 500, extra: '' }]) {
  test(`${fixture.id}: stacked regions never overlap and supporting controls remain reachable`, async ({ page }) => {
    await page.setViewportSize({ width: fixture.width, height: fixture.height })
    await page.goto(`/?preview=${fixture.id}&state=ready${fixture.extra}`)
    const panels = page.locator('.axo-tool-panel')
    const boxes = await panels.evaluateAll(els => els.map(el => el.getBoundingClientRect().toJSON()).sort((a, b) => a.y - b.y))
    for (let i = 1; i < boxes.length; i++) expect(boxes[i].y).toBeGreaterThanOrEqual(boxes[i - 1].bottom - 1)
    await panels.last().scrollIntoViewIfNeeded()
    await expect(panels.last()).toBeInViewport()
  })
}

test('empty status does not inherit unrelated icon-catalog layout rules', async ({ page }) => {
  await page.goto('/?tool=image-converter')
  const footer = page.locator('.axo-tool-footer')
  expect((await footer.boundingBox())!.height).toBeLessThan(90)
})

test('mobile preview dialog stays isolated from the catalog and restores child focus', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Layouts', exact: true }).click()
  await page.getByRole('button', { name: /Viewport náhledu/ }).click()
  await page.getByRole('option', { name: 'Mobile · 390 × 844', exact: true }).click()
  const child = page.frameLocator('iframe')
  await child.getByRole('button', { name: 'Otevřít nabídku' }).click()
  await expect(child.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.getByRole('group', { name: 'Téma katalogu' }).getByRole('button', { name: '☀ Light' }).click()
  await expect(child.locator('.axo-app-shell')).toHaveAttribute('data-theme', 'light')
  await expect(child.getByRole('dialog')).toBeVisible()
  await child.getByRole('dialog').getByRole('button', { name: 'Zavřít menu' }).press('Escape')
  await expect(child.getByRole('dialog')).not.toBeVisible()
  await expect(child.getByRole('button', { name: 'Otevřít nabídku' })).toBeFocused()
})

test('supporting panels stay within defined sizing constraints on wide desktops', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  for (const id of ['workspace', 'image-converter']) {
    await page.goto(`/?preview=${id}&state=ready`)
    const width = (await page.locator('.axo-layout-support').boundingBox())!.width
    expect(width).toBeGreaterThanOrEqual(260)
    expect(width).toBeLessThanOrEqual(415)
  }
})

test('converter upload inherits semantic surfaces and focus tokens in both themes', async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    await page.goto(`/?tool=image-converter&theme=${theme}`)
    const tokens = await page.locator('.axo-app-shell').evaluate(el => ({ surface: getComputedStyle(el).getPropertyValue('--surface'), text: getComputedStyle(el).getPropertyValue('--text'), focus: getComputedStyle(el).getPropertyValue('--focus-ring') }))
    const upload = await page.locator('.afu-dropzone').evaluate(el => ({ surface: getComputedStyle(el).getPropertyValue('--surface'), text: getComputedStyle(el).getPropertyValue('--text'), focus: getComputedStyle(el).getPropertyValue('--focus-ring') }))
    expect(upload).toEqual(tokens)
  }
})
