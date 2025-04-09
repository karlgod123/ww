const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const {listCodes} = require('./utils/listCodes');


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
            await page.waitForTimeout(3020);

            // Проверка видимости элемента
            await expect(page.getByText(item)).toBeVisible();
            await page.click('.data-fancybox'); 

            // рандомахер
            const randomTimeout = Math.floor(Math.random() * (5000 - 1000 + 1)) + 2000;

            // Скачивание РУ
            const downloadPromise = page.waitForEvent('download');
            await page.getByText('[Скачать РУ]').click();
            const download = await downloadPromise;

            await download.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/РУ/${item + '-'}` + download.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Скачивание выписки
            const extracts = page.waitForEvent('download');
            await page.getByTitle('Скачать выписку').click();
            const download_1 = await extracts;
            await download_1.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/Выписки/${item}` + download.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Скачивание инструкции
            const passport = page.waitForEvent('download');
            await page.getByText('[Скачать Инструкцию]').click();
            const download_2 = await passport;
            await download_2.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/Паспорт/${item}` + download_2.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Скачивание фото
            const flash = page.waitForEvent('download');
            await page.getByText('[Скачать Фото]').click();
            const download_3 = await flash;
            await download_3.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/Фото/${item}` + download_3.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Возврат на страницу поиска для следующей итерации
            await page.goto('https://roszdravnadzor.gov.ru/services/misearch');
            await page.waitForTimeout(2030);

        } catch (error) {
            console.error(`Ошибка при обработке ${item}:`, error);
            // В случае ошибки продолжаем со следующим элементом
            await page.goto('https://roszdravnadzor.gov.ru/services/misearch');
        }
    };
    // Закрытие браузера
    await browser.close();
})();
// Рандомайзер сделано
// чтобы меня / на -
// чтобы сохранял на сеть сделано
// сохранял В разных производителей