const express = require('express')
const app = express()
const puppeteer = require('puppeteer')
const { COMMENTS } = require('./const/comment')
const path = require('path');
const winston = require('winston')
const axios = require('axios')

const PORT = process.env.PORT || 7200

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, `logs/${new Date().toISOString().slice(0, 10)}.log`) })
  ]
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// app.get('/increase-like', async (req, res) => {
//   if (!req.query.id || !req.query.number) {
//     res.status(422).json({ message: 'No query id or number' })
//   }
//   const id = req.query.id
//   const number = req.query.number
//   for (let i = 0; i < number; i++) {
//     try {
//       await like(id)

//       console.log(i)
//     } catch (err) {
//       continue
//     }
//   }

//   res.status(200).json(id)
// })

app.get('/increase-like', async (req, res) => {
  if (!req.query.id || !req.query.number) {
    res.status(422).json({ message: 'No query id or number' })
  }
  const wishId = req.query.id
  const number = req.query.number
  for (let index = 0; index < number; index++) {
    try {
      await like(wishId)
      await sleep(Math.floor(Math.random() * 500))
      console.log("app.get => index", index)
    } catch (error) {
      continue
    }
  }

  res.status(200).json('done')
})

app.get('/increase-comment', async (req, res) => {
  if (!req.query.id || !req.query.number) {
    res.status(422).json({ message: 'No query id or number' })
  }
  const wishId = req.query.id
  const number = req.query.number
  for (let index = 0; index < number; index++) {
    try {
      const data = await comment(wishId)
      console.log('=>>> ~ data', data.attributes.body)
      await sleep(Math.floor(Math.random() * 500))
    } catch (error) {
      continue
    }
  }

  res.status(200).json('done')
})

async function like(wishId) {
  try {
    const { data } = await axios.post('https://padlet.com/api/5/reactions',
      {
        wish_id: wishId,
        value: 1,
        reaction_type: 'like'
      },
      {
        headers: {
          'Authorization': 'Bearer 123'
        }
      })
    return data
  } catch (err) {
    console.log('=>>> ~ err', err)
  }
}

async function comment(wishId) {
  try {
    const { data } = await axios.post('https://padlet.com/api/5/comments',
      {
        wish_id: wishId,
        body: COMMENTS[Math.floor(Math.random() * 200 + 35)]
      },
      {
        headers: {
          'Authorization': 'Bearer 123'
        }
      })
    return data
  } catch (err) {
    console.log('=>>> ~ err', err)
  }
}

// async function like(id) {
//   try {
//     const url = 'https://padlet.com/chithuong70/uahr2skx76gww651';
//     puppeteer.clearCustomQueryHandlers()
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url, {
//       waitUntil: 'networkidle2',
//     })

//     const work = await page.evaluate(async (id) => {
//       a = document.querySelectorAll(`#${id.id} section .cursor-pointer`)[0];
//       if (a) {
//         a.click()
//         b = document.querySelectorAll(`#${id.id} section .cursor-pointer span`)[0]
//         return b.innerText
//       }
//       return a
//     }, { id })
//     console.log(`work[${id}] =>`, work)

//     await browser.close()
//     await sleep(Math.floor(Math.random() * 1000))
//   } catch (error) {
//     console.log("error", error)
//   }
// }

// async function comment(id) {
//   try {
//     const url = 'https://padlet.com/chithuong70/uahr2skx76gww651';
//     puppeteer.clearCustomQueryHandlers()
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url)

//     const work = await page.evaluate(async () => {
//       a = document.querySelectorAll(`#${id} section .cursor-pointer`)[0];
//       if (a) {
//         return a.click()
//       }
//       return false
//     })
//     console.log("work =>", work)

//     await browser.close()
//     await sleep(Math.floor(Math.random() * 100))

//     console.log(i)
//   } catch (error) {
//     console.log("error", error)
//   }
// }

app.listen(PORT, () => console.log(`Server running on ${PORT}`))