import { test, expect } from '@playwright/test'

const label = 'Otevřít nástroj z widgetu'
const demoMessage = 'Ukázka: otevření nástroje z widgetu. Navigace zatím není připojena.'
const errors = new WeakMap<object, { message: string; url: string }[]>()

test.beforeEach(async ({ page }) => {
  const messages: { message: string; url: string }[] = []
  errors.set(page, messages)
  page.on('pageerror', error => messages.push({ message: `pageerror: ${error.message}`, url: '' }))
  page.on('console', message => {
    if (message.type() === 'error') messages.push({ message: `console: ${message.text()}`, url: message.location().url })
  })
})

test.afterEach(async ({ page }, testInfo) => {
  const messages = errors.get(page) ?? []
  await testInfo.attach('browser-console', { body: JSON.stringify(messages, null, 2), contentType: 'application/json' })
  // These existing asset failures are recorded, but are unrelated to catalog JS.
  const isKnownAssetFailure = ({ message, url }: { message: string; url: string }) =>
    message.startsWith('console: Failed to load resource:') &&
    (url.startsWith('https://fonts.googleapis.com/') || url.startsWith('https://fonts.gstatic.com/') || new URL(url || 'about:blank').pathname === '/favicon.ico')
  expect(messages.filter(message => !isKnownAssetFailure(message)), 'Unexpected browser runtime and console errors').toEqual([])
})

for (const theme of ['light', 'dark'] as const) {
  test(`${theme}: catalog launcher renders safely and supports pointer and keyboard`, async ({ page }, testInfo) => {
    await page.goto('/')
    await page.getByRole('group', { name: 'Téma katalogu' }).getByRole('button', { name: theme === 'light' ? '☀ Light' : '☾ Dark', exact: true }).click()
    await page.getByRole('button', { name: 'Buttons', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Hierarchie akcí' })).toBeVisible()
    await expect(page.locator('.bs-variant-row')).toHaveCount(6)
    for (const variant of ['primary', 'primary-2', 'secondary', 'outline', 'ghost', 'danger']) {
      const buttons = page.locator(`.bs-variants .axo-button--${variant}`)
      await expect(buttons).toHaveCount(2)
      for (const button of await buttons.all()) await expect(button).toBeVisible()
    }

    const card = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Widget → Tool', exact: true }) })
    await expect(card).toHaveCount(1)
    await expect(card.getByText('02 / WIDGET ACTION', { exact: true })).toBeVisible()
    // The undefined example handler must stay literal text, never executable JSX.
    await expect(card.locator('code')).toContainText('onClick={handleOpenTool}')
    const launcher = card.getByRole('button', { name: label, exact: true })
    await expect(launcher).toHaveCSS('width', '32px')
    await expect(launcher).toHaveCSS('height', '32px')
    await expect(launcher).toHaveCSS('border-radius', '50%')
    await expect(launcher.locator('svg.axo-icon[data-icon="external-link"]')).toBeVisible()
    const palette = await launcher.evaluate(button => {
      const style = getComputedStyle(button)
      return { surface: style.getPropertyValue('--surface').trim(), brand: style.getPropertyValue('--brand').trim() }
    })
    const rgb = (hex: string) => `rgb(${[1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16)).join(', ')})`
    await expect(launcher).toHaveCSS('background-color', rgb(palette.surface))
    await expect(launcher).toHaveCSS('border-top-color', rgb(palette.brand))
    await expect(launcher.locator('svg')).toHaveCSS('color', await launcher.evaluate(button => getComputedStyle(button).color))
    await launcher.hover()
    await expect(launcher).toHaveCSS('background-color', rgb(palette.brand))
    await expect(launcher.locator('svg')).toHaveCSS('color', 'rgb(255, 255, 255)')
    await expect(launcher.locator('.axo-button-icon')).not.toHaveCSS('transform', 'none')
    await expect.poll(() => launcher.evaluate(button => getComputedStyle(button, '::after').opacity)).toBe('1')
    const tooltip = await launcher.evaluate(button => {
      const style = getComputedStyle(button, '::after')
      return { content: style.content, top: parseFloat(style.top), bottom: style.bottom, height: button.getBoundingClientRect().height }
    })
    expect(tooltip.content).toContain(label)
    expect(tooltip.top).toBeGreaterThan(tooltip.height)
    expect(parseFloat(tooltip.bottom)).toBeLessThan(0)
    await launcher.click()
    await expect(page.getByRole('status')).toHaveText(demoMessage)

    for (const key of ['Enter', 'Space']) {
      await page.locator('.bs-variants .axo-button--primary').first().click()
      await page.getByRole('button', { name: 'Sekundární akce', exact: true }).focus()
      await page.keyboard.press('Tab')
      await expect(launcher).toBeFocused()
      expect(await launcher.evaluate(button => button.matches(':focus-visible'))).toBe(true)
      await expect(launcher).toHaveCSS('outline-style', 'solid')
      await page.keyboard.press(key)
      await expect(page.getByRole('status')).toHaveText(demoMessage)
    }
    await card.screenshot({ path: testInfo.outputPath('widget-action.png') })
    await page.getByRole('button', { name: 'Inputs & Forms', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'File Upload', exact: true })).toBeVisible()
    await expect(page.locator('.widget-launch-button')).toHaveCount(0)
    await page.getByRole('button', { name: 'Buttons', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Widget → Tool', exact: true })).toBeVisible()
    await expect(page.locator('.bs-variant-row')).toHaveCount(6)
  })
}

test('launcher respects reduced motion and stays out of real widgets', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('button', { name: 'Buttons', exact: true }).click()
  const launcher = page.getByRole('button', { name: label, exact: true })
  await expect(launcher).toBeVisible()
  await launcher.hover()
  await expect(launcher.locator('.axo-button-icon')).toHaveCSS('transform', 'none')
  await expect(launcher.locator('.axo-button-icon')).toHaveCSS('transition-duration', '0s')
  await page.getByRole('button', { name: 'Widgets', exact: true }).click()
  await expect(page.locator('.widget-foundation')).toHaveCount(2)
  await expect(page.locator('.widget-launch-button')).toHaveCount(0)
})
