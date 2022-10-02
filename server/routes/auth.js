const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//  Test GET 
router.get("/register", async (req, res) => {
  try {
    res.status(200).json("Register-GET");
  } catch (err) {
    res.status(500).json(err);
  }
});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

// LOGIN

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // !user && res.status(404).json("user not found") && break;
    // const validPassword = await bcrypt.compare(req.body.password, user.password);
    // !validPassword && res.status(400).json("wrong password");
    if (!user) {
      res.status(404).json( "user not found" );
      // stop further execution in this callback
      return;
    }
    console.log(user?.username)
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      console.log(user?.password);
      res.status(404).json("password is wrong");
      return;
    }
    res.status(200).json("You have been logged in successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;