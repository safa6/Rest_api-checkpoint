const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");

const app = express();

app.use(express.json());

const User = require("./models/User");

connectDB();


app.post("/add", async (req, res) => {
  const { name, lastName, email, phone } = req.body;
  const newUser = new User({ name, email, lastName, phone });
  try {
    let user = await newUser.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});


app.get("/get", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:userID", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userID);
    res.send({ message: "user deleted" });
  } catch (error) {
    res.send(error);
  }
});

app.put("/edit/:userID", async (req, res) => {
  try {
    let editedUser = await User.findByIdAndUpdate(
      req.params.userID,
      { ...req.body },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    res.send(error);
  }
});

app.listen(5000, () => console.log(`server is running on port  5000`));