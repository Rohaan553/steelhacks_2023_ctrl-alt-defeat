const Video = require("../models/Videos")
const router = require("express").Router();

router.get("/test", (req, res)=>{
    res.send("test video!")
})

router.post("/", (req,res)=>{
    
})

module.exports = router