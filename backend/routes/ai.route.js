const router = require("express").Router();
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const OPEN_API_KEY = process.env.OPEN_API_KEY;

async function sendPostRequest(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

const token_limit = 3950;
const prompts = {
  "sumarize": "Please help me to summarize the following transcripts from a video. Please return only summarize content not include the origin text."
}
const OPENAPI_URL = 'https://api.openai.com/v1/chat/completions'

router.post('/sumarize', async (req, res) => {
  const { content } = req.body;
  // seperate the content to tokens based on the token_limit
  const tokens = [];
  let i = 0;
  while (i < content.length) {
    tokens.push(content.substring(i, i + token_limit));
    i += token_limit;
  }
  const prompt = prompts['sumarize'];
  const reqList = []
  tokens.forEach((token) => {
    const payload = {
      "user": "Summarize AI from Youtube Query",
      "model": "gpt-3.5-turbo",
      "temperature": 0.2,
      "presence_penalty": 0,
      "messages": [
        {
          "content": prompt,
          "role": "system"
        },
        {
          "role": "user",
          "content": token
        },
      ]
    }
    const options = {
      'method': 'POST',
      'url': OPENAPI_URL,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPEN_API_KEY}`
      },
      body: JSON.stringify(payload)
    };
    // send request
    const eachReq = sendPostRequest(options);
    reqList.push(eachReq)
  })
  const rawResList = await Promise.all(reqList);
  return res.json(rawResList);
})

module.exports = router;