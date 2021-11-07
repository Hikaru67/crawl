const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const url = 'https://padlet.com/chithuong70/uahr2skx76gww651';
  for (let i = 0; i < 20; i++) {
    try {
      puppeteer.clearCustomQueryHandlers()
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const test = await page.evaluate(() => {
        a = document.querySelectorAll('#wish-1872938257 section .cursor-pointer')[0];
        return a.click();
      });
      console.log("test => test", test)

      await browser.close();
      await sleep(500);

      console.log(i);
    } catch (error) {
      console.log("error", error)
      continue;
    }
  }
})();