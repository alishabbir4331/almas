const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bookingschema = schema({
  Name: {
    type: String,
  },
  Phone: {
    type: String,
  },
  CIdate: {
    type: Date,
  },
  Coutedate: {
    type: Date,
  },
  Message: {
    type: String,
  },
  masterBedroom: {
    type: String,
  },
  bedBasic3: {
    type: String,
  },
  bedDelux3: {
    type: String,
  },
  bed4: {
    type: String,
  },
  familySuit: {
    type: String,
  },
});
module.exports=booking= mongoose.model("booking",bookingschema);