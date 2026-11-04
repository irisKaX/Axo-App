import {test,expect} from '@playwright/test'

for(const theme of ['dark','light']){
  test(`${theme}: backdrop token is documented and shared with Typography composition`,async({page})=>{
    await page.goto('/')
    await page.getByRole('group',{name:'Téma katalogu'}).getByRole('button',{name:theme==='dark'?'☾ Dark':'☀ Light',exact:true}).click()
    await page.getByRole('button',{name:'Colors',exact:true}).click()
    const card=page.locator('.studio-backdrop-card').filter({hasText:theme==='dark'?'Dark Backdrop':'Light Backdrop'})
    await expect(card).toBeVisible()
    const previewBackground=await card.locator('.studio-backdrop-preview').evaluate(el=>getComputedStyle(el).backgroundImage)
    expect(previewBackground).toContain('radial-gradient')
    await page.getByRole('button',{name:'Typography',exact:true}).click()
    const typography=page.locator('.typo-preview')
    await expect(typography).toBeVisible()
    await expect(typography).toContainText('flow better.')
    expect(await typography.evaluate(el=>getComputedStyle(el).backgroundImage)).toBe(previewBackground)
    await page.getByRole('button',{name:'Visual Patterns',exact:true}).click()
    await expect(page.locator('.typo-preview')).toBeVisible()
    expect(await page.locator('.typo-preview').evaluate(el=>getComputedStyle(el).backgroundImage)).toBe(previewBackground)
    await page.getByRole('button',{name:'Zobrazit strukturu'}).click()
    await expect(page.getByRole('region',{name:'Anatomie kompozice'})).toContainText('Metric surface')
    await expect(page.getByText('Tool Surface',{exact:true})).toBeVisible()
  })
}
