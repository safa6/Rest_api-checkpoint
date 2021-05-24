const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbCollection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect to database");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;