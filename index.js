const { expect } = require('@playwright/test');
const { chromium } = require('playwright');



(async () => {
    const Array = ['РЗН 2021/14397', 'WW']
    const browser = await chromium.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto('https://roszdravnadzor.gov.ru/services/misearch');
    await page.fill('#id_q_mi_label_application', Array[0]);
    await page.press('input', 'Enter');
    await page.waitForTimeout(3000);
    await expect(page.getByRole('data-fancybox', {name: '1'}))
    // await page.click('#med_products_new-76182')
})()