const Review = require("../models/review.model")
const router = require("express").Router();

router.get("/test", (req, res)=>{
    res.send("test review!")
})

module.exports = router