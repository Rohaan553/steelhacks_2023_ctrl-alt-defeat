const Video = require("../models/video.model");
const router = require("express").Router();
const {YoutubeTranscript} = require('youtube-transcript');

//Add video
router.post("/:url", async (req, res) => {
  myUrl = req.params.url
  const newVideo = new Video({
    questions: req.body.questions,
    url: myUrl,
  });
  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    const videoId = req.query.v; // extract video id from query parameters
    console.log(`[INFO] Retrieving transcript for video ${videoId}`);
    const rawRes = await YoutubeTranscript.fetchTranscript(`https://www.youtube.com/watch?v=${videoId}`);
    let ccList = rawRes.map((item) => item.text);
    ccList = ccList.filter(item => item!=='' && item!=='[MUSIC]');
    ccList.forEach((item, index) => {
      // remove extra spaces and trim, remove /n
      ccList[index] = item.replace(/\s\s+/g, ' ').trim().replace(/\n/g, '');
    });
    res.json(ccList); // send the transcript as the ressponse
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving transcript');
  }
});



module.exports = router;
