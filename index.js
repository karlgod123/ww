const { expect } = require('@playwright/test');
const { firefox } = require('playwright');

(async () => {
    const Array = ['РЗН 2021/14397','РЗН 2016/4721',
'РЗН 2016/5001',
'РЗН 2016/5073',
'РЗН 2016/5073',
'РЗН 2016/5073'
]
for (let i = 0; i < Array.length; i++) {
    var add = Array[i];

};
    const browser = await firefox.launch({ headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://roszdravnadzor.gov.ru/services/misearch');
    await page.fill('#id_q_mi_label_application', add);
    await page.press('input', 'Enter');
    await page.waitForTimeout(3000);
    const element = await expect(page.getByText(add)).toBeVisible();
    await page.click('.data-fancybox', element);
    // РУ
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('[Скачать РУ]').click();
    const download = await downloadPromise;
    await download.saveAs('/job/work/РУ/' + download.suggestedFilename());
    await page.waitForTimeout(3000)

    // Паспорт(инструкция)
    const passport = page.waitForEvent('download');
    await page.getByText('[Скачать Инструкцию]').click();
    const download_2 = await passport;
    await download_2.saveAs('/job/work/Инструкция/' + download.suggestedFilename());
    await page.waitForTimeout(3000);

    // Фото
    const flash = page.waitForEvent('download');
    await page.getByText('[Скачать Фото]').click();
    const download_3 = await flash;
    await download_3.saveAs('/job/work/Фото/' + download.suggestedFilename());
    await browser.close();
})()
// Сделать так чтобы он не выходил со страницы а работал только на ней  также чтобы он создал в каждом производители папку парсинг и внутри папки ру, паспорт, фото, выписка
// и отсылал каждую, также надо доделать код с циклом чтобы они по очереди проходили!!!приоритетно!
