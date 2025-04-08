// Сделать так чтобы он не выходил со страницы а работал только на ней  также чтобы он создал в каждом производители папку парсинг и внутри папки ру, паспорт, фото, выписка
// и отсылал каждую, также надо доделать код с циклом чтобы они по очереди проходили!!!приоритетно!

const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

(async () => {
    const searchItems = [
        'РЗН 2021/14397',
        'РЗН 2016/4721',
        'РЗН 2016/5001',
        'РЗН 2016/5073',
        'РЗН 2016/5073',
        'РЗН 2016/5073'
    ];

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://roszdravnadzor.gov.ru/services/misearch');

    for (const item of searchItems) {
        try {
            console.log(`Обрабатываю: ${item}`);
            
            // Поиск
            await page.fill('#id_q_mi_label_application', '');
            await page.fill('#id_q_mi_label_application', item);
            await page.press('#id_q_mi_label_application', 'Enter');
            await page.waitForTimeout(3000);

            // Проверка видимости элемента
            await expect(page.getByText(item)).toBeVisible();
            await page.click('.data-fancybox');

            // Скачивание РУ
            const downloadPromise = page.waitForEvent('download');
            await page.getByText('[Скачать РУ]').click();
            const download = await downloadPromise;
            await download.saveAs(`/Парсер/РУ/${item}` + download.suggestedFilename());
            await page.waitForTimeout(3000);

            // Скачивание инструкции
            const passport = page.waitForEvent('download');
            await page.getByText('[Скачать Инструкцию]').click();
            const download_2 = await passport;
            await download_2.saveAs(`/Парсер/Инструкция/${item}` + download_2.suggestedFilename());
            await page.waitForTimeout(3000);

            // Скачивание фото
            const flash = page.waitForEvent('download');
            await page.getByText('[Скачать Фото]').click();
            const download_3 = await flash;
            await download_3.saveAs(`/Парсер/Фото/${item}` + download_3.suggestedFilename());

            // Возврат на страницу поиска для следующей итерации
            await page.goto('https://roszdravnadzor.gov.ru/services/misearch');
            await page.waitForTimeout(2000);

        } catch (error) {
            console.error(`Ошибка при обработке ${item}:`, error);
            // В случае ошибки продолжаем со следующим элементом
            await page.goto('https://roszdravnadzor.gov.ru/services/misearch');
        }
    };
    // Закрытие браузера
    await browser.close();
})();