const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const url = 'https://padlet.com/chithuong70/uahr2skx76gww651';
  for (let i = 0; i < 86; i++) {
    try {
      puppeteer.clearCustomQueryHandlers()
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const test = await page.evaluate(async () => {
        a = document.querySelectorAll('#wish-1872899933 section .cursor-pointer')[0];
        if (a) {
          return a.click();
        }
        return false
      });
      console.log("test => test", test)

      await browser.close();
      await sleep(Math.floor(Math.random() * 50));

      console.log(i);
    } catch (error) {
      console.log("error", error)
      continue;
    }
  }
})();