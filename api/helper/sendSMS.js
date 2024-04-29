// const dotenv = require("dotenv");
// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const MONGO_URL = process.env.MONGO_URL

// console.log(accountSid, authToken, MONGO_URL)

// const client = require("twilio")(accountSid, authToken);

// const sendSMS = async (body) => {
//   let msgOptions = {
//     from: "+917620307622",
//     to: "+919284834571",
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

const twilio = require("twilio");

// Your Twilio Account SID and Auth Token
const accountSid = "AC472166f1490388776b610f09a60430c4";
const authToken = "04403556680cb998786302b9a5025427";

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Sending SMS message
// exports.sendMSG = () => {
  // client.messages
  //   .create({
  //     body: "Your Registration is successfull for Loan Application.",
  //     from: "+12057934229", // Your Twilio phone number
  //     to: "+917620307622", // Recipient's phone number
  //   })
  //   .then((message) =>
  //     console.log("Message sent successfully. SID:", message.sid)
  //   )
  //   .catch((error) => console.error("Error sending message:", error));
// };
