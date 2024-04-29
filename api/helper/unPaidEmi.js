const userModel = require("../models/userModel");
const cron = require("node-cron");
// Function to send text messages to customers with unpaid EMIs
// async function sendReminderTexts() {
//   try {
//     const currentDate = new Date().toISOString().substring(0, 7);

//     const customersWithUnpaidEMI = await userModel.find({
//         "emiPayments.month": currentDate,
//         "emiPayments.paid": false,
//     });

//     return console.log("customersWithUnpaidEMI : ", customersWithUnpaidEMI);

//     for (const customer of customersWithUnpaidEMI) {
//       await MessagingService.sendTextMessage(
//         customer.phoneNumber,
//         "Reminder: Your EMI payment is due today. Please make the payment as soon as possible."
//       );
//       console.log(
//         `Reminder text message sent to customer ${customer.name} at ${customer.phoneNumber}`
//       );
//     }

//     console.log("Reminder text messages sent successfully.");
//   } catch (error) {
//     console.error("Error sending reminder text messages:", error);
//   }
// }

// sendReminderTexts();

// cron.schedule("*/5 * * * * *", async () => {
//   console.log("Running cron job to send reminder text messages...");
//   await sendReminderTexts();
// });

async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({});
    console.log("Getting Users");
    //   return res.status(200).json({
    //     success: true,
    //     message: "All users are getting",
    //     users,
    //   });
  } catch (error) {
    console.log(error);
    //   return res.status(500).json({
    //     success: false,
    //     message: "Error while getting the users",
    //     error,
    //   });
  }
}

getAllUsers();

// async function getUsers() {
//   try {
//     const currentDate = new Date().toISOString().substring(0, 10);
//     const users = await userModel.find({
//       "emiPayments.month": currentDate,
//       "emiPayments.paid": false,
//     });
//     console.log("Users : ", users);
//   } catch (error) {
//     console.log(error);
//   }
// }

// cron.schedule("*/5 * * * * *", async () => {
//   console.log("Running cron job to send reminder text messages...");
//   await getUsers();
// });

// Function to send text messages to customers with unpaid EMIs
// async function sendReminderTexts() {
//   try {
//     const currentDate = new Date().toISOString().substring(0, 7);

//     const customersWithUnpaidEMI = await userModel.find({
//       "emiPayments.month": currentDate,
//       "emiPayments.paid": false,
//     });

//     return console.log("customersWithUnpaidEMI : ", customersWithUnpaidEMI);

//     for (const customer of customersWithUnpaidEMI) {
//       await MessagingService.sendTextMessage(
//         customer.phoneNumber,
//         "Reminder: Your EMI payment is due today. Please make the payment as soon as possible."
//       );
//       console.log(
//         `Reminder text message sent to customer ${customer.name} at ${customer.phoneNumber}`
//       );
//     }

//     console.log("Reminder text messages sent successfully.");
//   } catch (error) {
//     console.error("Error sending reminder text messages:", error);
//   }
// }

// cron.schedule("0 0 * * *", async () => {
//   console.log("Running cron job to send reminder text messages...");
//   await sendReminderTexts();
// });
