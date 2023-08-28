require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL, {
    //.connect("mongodb+srv://rnippanikar7:mhtnipp77cluster1.9d5uwua.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on 3001");
    });
  });
  
app.get("/test", (req, res) => {
  res.send("Ready with 1.0.0 offline");
});
app.use("/users", require("./routes/userR"));
