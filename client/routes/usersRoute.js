const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async (req, res) => {
  const { name, email, password, contact } = req.body;
  const newuser = new User({ name, email, password, contact });

  try {
    const savedUser = await newuser.save();
    res.send({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      contact: savedUser.contact, 
      isAdmin: savedUser.isAdmin || false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Registration failed' });
  }
});


  

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const temp = {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,  
        isAdmin: user.isAdmin,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: 'Login failed' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});


module.exports = router