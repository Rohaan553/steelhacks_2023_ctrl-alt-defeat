const Video = require("../models/video.model");
const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("test video!");
});

router.post("/", async (req, res) => {
  //url = req.params.url
  const newVideo = new Video({
    questions: req.body.questions,
    url: req.body.url,
  });
  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
