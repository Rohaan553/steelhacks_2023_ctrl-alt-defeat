const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const VideoRoute = require("./routes/video.js")
const ReviewRoute = require("./routes/review.js")

dotenv.config()

mongoose.connect
(process.env.MONGO_URL).then(()=>{
    console.log("DB conn successful");
}).catch((err)=>{
    console.log(err);   
})

app.use("/api/videos", VideoRoute)
app.use("/api/reviews", ReviewRoute)



app.listen(5000, () =>{
    console.log("Backend server is running!");
})