const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const VideoRoute = require("./routes/video.route")
const ReviewRoute = require("./routes/review.route.js")
const AIRoute = require('./routes/ai.route.js')

dotenv.config()

mongoose.connect
(process.env.MONGO_URL).then(()=>{
    console.log("DB conn successful");
}).catch((err)=>{
    console.error(err);   
})

app.use(express.json())

app.use("/api/videos", VideoRoute)
app.use("/api/reviews", ReviewRoute)
app.use("/api/ai", AIRoute);


app.listen(7001, () =>{
    console.log("Backend server is running!");
})