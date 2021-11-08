const express = require('express')
const app = express()
const puppeteer = require('puppeteer');
const comments = require('./const/comment')
console.log("comments", comments)

const PORT = process.env['PORT']

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/increase-like', async (req, res) => {
  if (!req.query.id) {
    res.status(422).json({ message: 'No query id' })
  }
  const url = 'https://padlet.com/chithuong70/uahr2skx76gww651';
  for (let i = 0; i < 321; i++) {
    try {
      puppeteer.clearCustomQueryHandlers()
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const test = await page.evaluate(async () => {
        b = document.querySelectorAll('#wish-1872646690 section .cursor-pointer')[0];
        a = document.querySelectorAll('#wish-1872938257 section .cursor-pointer')[0];
        if (a) {
          b.click();
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
  res.status(200).json('done')
})


  (async () => {
    const url = 'https://padlet.com/chithuong70/uahr2skx76gww651';
    for (let i = 0; i < 321; i++) {
      try {
        puppeteer.clearCustomQueryHandlers()
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const test = await page.evaluate(async () => {
          b = document.querySelectorAll('#wish-1872646690 section .cursor-pointer')[0];
          a = document.querySelectorAll('#wish-1872938257 section .cursor-pointer')[0];
          if (a) {
            b.click();
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

app.listen(PORT, () => console.log(`Server running on ${PORT}`))