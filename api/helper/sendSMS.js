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


const twilio = require("twilio")

// Your Twilio Account SID and Auth Token
const accountSid = "AC472166f1490388776b610f09a60430c4";
const authToken = "92a1e97dabd3af4d0547d9d28cfad63e";

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Sending SMS message
client.messages
  .create({
    body: "This is a test message sent from Tejas Saykar",
    from: "+12057934229", // Your Twilio phone number
    to: "+919284834571", // Recipient's phone number
  })
  .then((message) =>
    console.log("Message sent successfully. SID:", message.sid)
  )
  .catch((error) => console.error("Error sending message:", error));
