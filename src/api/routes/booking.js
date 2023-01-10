const router = require('express').Router()
const Booking = require("../../database/bookingschema")



router.get("/getall", async(req,res)=>{

try {
    const booking = await Booking.find()
    res.status(200).send(booking)
} catch (e) {
    console.log(e);
}

} )
 router.post("/send", async(req,res)=>{
    try {
        
        const booking = new Booking(req.body);
        const savebooking = await booking.save();
        res.status(200).send(savebooking);

    } catch (e) {
        console.log(e);
    }
 })
 router.delete("/delete/:id", async(req,res)=>{
    try {
    const id =req.params.id
         await Booking.findByIdAndRemove(id).exec();
       
     
     
      res.status(200).json({
        success: true,
        message: "Your Booking  has been deleted",
      });

    } catch (e) {
        console.log(e);
    }
 })

 router.get("/getall/:id",async(req,res)=>{
  try {
    const find = await Booking.findById(req.params.id)
    if(find){
        res.status(200).json({
            success: true,
            message: "Booking Found messgae",
            find
          });
    }
  } catch (e) {
    console.log(e);
  }
 })

module.exports = router