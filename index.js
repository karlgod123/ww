import  {searchItems} from "/job/work/utils/listCodes.js";
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://roszdravnadzor.gov.ru/services/misearch');

    for (const item of searchItems) {
        try {
            console.log(`Обрабатываю: ${item}`);
            
            // Поиск
            await page.fill('#id_q_mi_label_application', '');
            await page.fill('#id_q_mi_label_application', item[0]);
            await page.press('#id_q_mi_label_application', 'Enter');
            await page.waitForTimeout(3020);

            // Проверка видимости элемента
            await expect(page.getByText(item[0])).toBeVisible();
            await page.click('.data-fancybox'); 

            // рандомахер
            const randomTimeout = Math.floor(Math.random() * (5000 - 1000 + 1)) + 2000;

            // Скачивание РУ
            const downloadPromise = page.waitForEvent('download');
            await page.getByText('[Скачать РУ]').click();
            const download = await downloadPromise;
            // меняет / на -
            const newitem = item[0].replace(/\//g, '-');
            const newitem1 = item[1];
            // не забыть поместить до парсера
            await download.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/${newitem1}/РУ/${newitem}/` + download.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Скачивание выписки
            const extracts = page.waitForEvent('download');
            await page.getByTitle('Скачать выписку').click();
            const download_1 = await extracts;
            await download_1.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/${newitem1}/Выписки/${newitem}/` + download_1.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Скачивание инструкции
            const passport = page.waitForEvent('download');
            await page.getByText('[Скачать Инструкцию]').click();
            const download_2 = await passport;
            await download_2.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/${newitem1}/Паспорт/${newitem}/` + download_2.suggestedFilename());
            await page.waitForTimeout(randomTimeout);

            // Скачивание фото
            const flash = page.waitForEvent('download');
            await page.getByText('[Скачать Фото]').click();
            const download_3 = await flash;
            await download_3.saveAs(`//FileServer/Shara/Work/Прайсы/Прайсы индивидуальные/Сухих Никита Анатольевич/Парсер/${newitem1}/Фото/${newitem}/` + download_3.suggestedFilename());
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
// чтобы меня / на -  cделано
// чтобы сохранял на сеть сделано
// сохранял В разных производителей