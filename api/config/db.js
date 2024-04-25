const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MONGO GOT CONNECTED !`);
  } catch (error) {
    console.log(`MONGO ERROR : ${error}`);
  }
};

// const dotenv = require("dotenv");
// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const MONGO_URL = process.env.MONGO_URL;

// console.log(accountSid, authToken, MONGO_URL);

// const client = require("twilio")(accountSid, authToken);

// const sendSMS = async (body) => {
//   let msgOptions = {
//     from: +917620307622,
//     to: +919284834571,
//     body,
//   };
//   try {
//     const message = await client.messages.create(msgOptions);
//     console.log(message);
//   } catch (error) {
//     console.log(error);
//   }
// };

// sendSMS("Hello from Tejas Saykar");

module.exports = connectDb;
