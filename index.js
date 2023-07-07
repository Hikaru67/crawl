const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

const PORT = process.env.PORT || 7200

async function getPhone(url) {
  try {
    var btnCickClass = '.ShowPhoneButton_phoneButton__p5Cvt.ShowPhoneButton_phoneNotClicked__dlQn_'
    var phoneSpanClass = '.ShowPhoneButton_phoneButton__p5Cvt.ShowPhoneButton_phoneClicked__IxuR6 span'
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';
    await Promise.all([
      page.setViewport({ width: 2920, height: 1080 }),
      page.setUserAgent(ua),
      page.setRequestInterception(true)
    ])

    page.on('request', (req) => {
      if (req.resourceType() == 'font' || req.resourceType() == 'image') {
        req.abort();
      }
      else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: "networkidle2" })
    let element = await page.waitForSelector(btnCickClass, { visible: true })
    await page.evaluate(el => el.click(), element)

    let phone = null
    while (!phone || phone.indexOf('*') >= 0) {
      element = await page.waitForSelector(phoneSpanClass)
      phone = await page.evaluate(el => el.textContent, element)
    }

    await browser.close()

    return phone;
  } catch (error) {
    console.log("error", error)
    return 'error'
  }
}

app.get('/get-phone', async (req, res) => {
  if (!req.query.url) {
    res.status(422).json({ message: 'No query id or number' })
  }
  const url = req.query.url
  const phone = await getPhone(url)

  res.status(200).json({ [url]: phone })
})

app.get('/get-phones', async (req, res) => {
  if (!req.query.urls) {
    res.status(422).json({ message: 'No query id or number' })
  }
  const urls = req.query.urls
  const data = await Promise.all(urls.map(async (url) => { return { [url]: await getPhone(url) } }))

  res.status(200).json(data)
})

app.get('/ping', async (req, res) => {
  res.status(200).json('pong')
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))