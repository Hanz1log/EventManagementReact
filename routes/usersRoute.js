const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async (req, res) => {
  const { name, email, password, contact } = req.body;
  const newuser = new User({ name, email, password, contact });

  try {
    const savedUser = await newuser.save();
    res.send('User Registered Successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

  

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }); // await is required
    if (user) {
      const temp = {
        name : user.name, 
        email : user.email,
        isAdmin : user.isAdmin,
        _id : user._id,
      }
      res.send(temp);

    } else {
      return res.status(400).json({ message: 'Login failed' });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});


module.exports = router