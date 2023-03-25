const Video = require("../models/video.model");
const request = require('request');
const router = require("express").Router();
const {YoutubeTranscript} = require('youtube-transcript');
const dotenv = require('dotenv');
dotenv.config();
const OPEN_API_KEY = process.env.OPEN_API_KEY;
const OPENAPI_URL = 'https://api.openai.com/v1/chat/completions'

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
  "sumarize": "Please help me to summarize the following transcripts from a video. Please return only summarize content not include the origin text. Please use English to reply.",
  "suggest_questions": "Please help me to suggest 5 questions for the following transcripts from a video. Please return only questions not include the origin text. Please use English to reply.",
  "answer_questions": "Please help me to answer the following questions. Please return only answers not include the origin text. Please use English to reply."
}

//Add video
// router.post("/:url", async (req, res) => {
//   myUrl = req.params.url
//   const newVideo = new Video({
//     questions: req.body.questions,
//     url: myUrl,
//   });
//   try {
//     const savedVideo = await newVideo.save();
//     res.status(201).json(savedVideo);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Get all videos
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const videos = query
      ? await Video.find().sort({ _id: -1 }).limit(5)
      : await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Get an existing video
// router.get("/:url/", async (req, res) => {
//   myUrl = req.params.url
//   try { 
//     const video = await Video.findOne({ url: myUrl });
//     if (!video) {
//       return res.status(404).json({ error: 'Video not found.' });
//     }
//     res.json(video);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to retrieve video.' });
//   }
// });

// Get transcript from a video
router.get('/transcript', async (req, res) => {
  try {
    const videoId = req.query.videoId;
    console.log('query',req.query);
    if(!videoId) {
      console.log('[ERROR] Missing video id');
      return res.status(400).send('Missing video id');
    }
    console.log(`[INFO] Retrieving transcript for video ${videoId}`);
    const rawRes = await YoutubeTranscript.fetchTranscript(`https://www.youtube.com/watch?v=${videoId}`);
    let ccList = rawRes.map((item) => item.text);
    ccList = ccList.filter(item => item!=='' && item!=='[MUSIC]');
    ccList.forEach((item, index) => {
      // remove extra spaces and trim, remove /n
      ccList[index] = item.replace(/\s\s+/g, ' ').trim().replace(/\n/g, '');
    });
    console.log('[res]', ccList);
    return res.status(200).send(JSON.stringify({
      'res': ccList
    })); // send the transcript as the ressponse
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving transcript');
  }
});

async function AIrequest(content, prompt) {
  const tokens = [];
  let i = 0;
  while (i < content.length) {
    tokens.push(content.substring(i, i + token_limit));
    i += token_limit;
  }
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
  return rawResList;
}

// get AI suggested questions based on video transcript
router.get('/suggestQuestions', async (req, res) => {
  try {
    const videoId = req.query.videoId;
    console.log('query',req.query);
    if(!videoId) {
      console.log('[ERROR] Missing video id');
      return res.status(400).send('Missing video id');
    }
    console.log(`[INFO] Retrieving transcript for video ${videoId}`);
    const rawRes = await YoutubeTranscript.fetchTranscript(`https://www.youtube.com/watch?v=${videoId}`);
    let ccList = rawRes.map((item) => item.text);
    ccList = ccList.filter(item => item!=='' && item!=='[MUSIC]');
    ccList.forEach((item, index) => {
      // remove extra spaces and trim, remove /n
      ccList[index] = item.replace(/\s\s+/g, ' ').trim().replace(/\n/g, '');
    });
    const transcript = ccList.join(" ")
    const suggestion = await AIrequest(transcript, prompts["suggest_questions"]);
    return res.status(200).json({
      'res': suggestion,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving transcript');
  }
})


module.exports = router;
