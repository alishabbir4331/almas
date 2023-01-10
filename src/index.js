const express = require("express")
const AlmasHotel = express();
const mongoose = require("mongoose")
const Bookingroute = require("./api/routes/booking")
const cors = require("cors");
require("dotenv").config()


mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URL).then(
    console.log("Your Connection is successful")
)
const PORT = 8000 ||process.env.PORT;
AlmasHotel.use(express.json());
AlmasHotel.use(express.urlencoded({extended:true}))
AlmasHotel.use(cors({origin:true}));
AlmasHotel.use("/booking",Bookingroute)
AlmasHotel.listen(PORT, ()=>{
    console.log(`Your Server is running on ${PORT}`)
})