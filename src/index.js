const express = require("express")
const AlmasHotel = express();
const mongoose = require("mongoose")
const Bookingroute = require("./api/routes/booking")
const userRoutes = require("./api/routes/UserRoutes")
const cors = require("cors");
require("dotenv").config()


mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URL).then(
    console.log("Your Connection is successful")
)
const PORT = process.env.PORT || 8000;
AlmasHotel.use(express.json());
AlmasHotel.use(express.urlencoded({extended:true}))
AlmasHotel.use(cors({origin:true}));
AlmasHotel.use("/booking",Bookingroute)
AlmasHotel.use('/api/auth', userRoutes)
AlmasHotel.listen(PORT, ()=>{
    console.log(`Your Server is running on ${PORT}`)
})
AlmasHotel.get("/",async(req,res)=>{
    try {
        res.send("this my backend")
    } catch (e) {
        console.log(e);
    }
})