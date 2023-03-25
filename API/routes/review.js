const Review = require("../models/Review")
const router = require("express").Router();

router.get("/test", (req, res)=>{
    res.send("test review!")
})

module.exports = router