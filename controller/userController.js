const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    throw Error("All field are needed");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Mistake on password or email");
  }
});

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw Error("All field must be completed");
  }
  const userIsAvaible = await User.findOne({ email });
  if (userIsAvaible) {
    res.status(400);
    throw Error("User already exist");
  }
  const hashpassword = await bcrypt.hash(password, 10);
  console.log(hashpassword);
  const user = await User.create({
    username,
    email,
    password: hashpassword,
  });
  console.log(`User created: ${user}`);
  if (user) {
    res
      .status(201)
      .json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
  res.status(200).json({ message: "User registed" });
});

//@desc current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  loginUser,
  registerUser,
  currentUser,
};
