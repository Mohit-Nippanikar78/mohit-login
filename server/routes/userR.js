const { registerUser, loginUser } = require("../controllers/userC");

const route = require("express").Router();
route.post("/register",registerUser);
route.post("/login",loginUser);


module.exports = route;
