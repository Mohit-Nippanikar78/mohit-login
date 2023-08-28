const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    console.log("registerUser")
    const { username, password } = req.body;
    const user = await User.create({ username, passwordHash: password });
    res.status(201).json(user);
  } catch (error) {
    res.send(error.message);
  }
};
const loginUser = async (req, res) => {
  try {
    console.log("loginUser")
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) return res.status(404).json({ message: "User not found" });
    else {
      if (findUser.passwordHash === password)
        return res.status(200).json({ message: "Login successfull" });
      else return res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = { registerUser, loginUser };
