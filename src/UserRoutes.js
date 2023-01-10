const router = require("express").Router();
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new UserModel({
      username: req.body.username,
      password: hashedPass,
      desig: req.body.desig,
      photo: req.body.photo,
      email: req.body.email,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, resp) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      resp.status(500).json("Wrong Credentials!");
    } else {
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        resp.status(500).json("Wrong Credentials!");
      } else {
        resp.status(200).json(user);
      }
    }
  } catch (error) {
    resp.status(500).json(error);
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const desig = req.query.desig;
    let find;
    if (desig) {
      find = await UserModel.aggregate([
        { $match: { desig } },
        { $project: { username: 1, email: 1, photo: 1, desig: 1 } },
      ]);
    } else {
      find = await UserModel.aggregate([
        { $match: {} },
        { $project: { username: 1, email: 1, photo: 1, desig: 1 } },
      ]);
    }

    if (find) {
      res.status(200).send(find);
    } else {
      res.status(404).send("There is no user");
    }
  } catch (e) {
    res.status(404).send(e);
  }
});
router.put("/:id", async (req, res) => {
  try {  
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        let resp = await UserModel.findByIdAndUpdate(req.params.id,{username:req.body.username,password:hashedPass,photo:req.body.photo},{new:true})
         res.json(resp)
    } else {
        let resp = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(resp)
    }
    
  } catch (e) {
    res.send(e)
  }
});
module.exports = router;
