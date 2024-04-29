const userModel = require("../models/userModel");
const cron = require("node-cron");
const moment = require("moment");

const { sendMSG } = require("../helper/sendSMS");

const twilio = require("twilio");

// Your Twilio Account SID and Auth Token
const accountSid = "AC472166f1490388776b610f09a60430c4";
const authToken = "04403556680cb998786302b9a5025427";

// Initialize Twilio client
const client = twilio(accountSid, authToken);
// Register User
exports.userRegistration = async (req, res) => {
  const currentDate = moment();
  const dueDate = moment(currentDate).add(1, "months").format("DD-MM-YYYY");

  try {
    const user = await new userModel({
      ...req.body,
      applicationDate: req.body.applicationDate,
      monthDue: dueDate,
    }).save();

    client.messages
      .create({
        body: "Your Registration is successfull for Loan Application.",
        from: "+12057934229",
        to: "+917620307622",
      })
      .then((message) =>
        console.log("Message sent successfully. SID:", message.sid)
      )
      .catch((error) => console.error("Error sending message:", error));

    return res.status(200).json({
      success: true,
      message: "User Registration Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while registration",
      error,
    });
  }
};

// Get all Users
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      success: true,
      message: "All users are getting",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the users",
      error,
    });
  }
};

// Get Single user
exports.getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Single user is getting",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the single user",
      error,
    });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  const currentDate = moment();
  const dueDate = moment(currentDate).add(1, "months").format("DD-MM-YYYY");

  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...req.body,
          totalEmiAmountRecieved: req.body.totalEmiAmountRecieved,
          totalEmiRecievedCount: +1,
          todayEmi: true,
          monthDue: dueDate,
        },
      },
      { new: true }
    );
    console.log("Updated User : ", user);
    return res.status(200).json({
      success: true,
      message: "User updated",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the user",
      error,
    });
  }
};

// Search User
exports.searchUser = async (req, res) => {
  const { mobile, email } = req.body;
  try {
    const user = await userModel.find({
      $or: [{ email: { $regex: email, $options: "i" } }, { mobileNo: mobile }],
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while searching the user",
      error,
    });
  }
};

// Get Users by Current Date
exports.getUserByCurrentDate = async (req, res) => {
  try {
    const currentDate = new Date();
    // Get the start of the current day
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Get the end of the current day
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const user = await userModel.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
    res.status(200).json({
      success: true,
      message: "User getting with current date",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the users",
      error,
    });
  }
};

// Send reminder message to that customers who have EMI payment today
cron.schedule("0 0 * * *", async () => {
  async function sendReminderMessage() {
    const date = moment().startOf("day").toDate();
    const today = moment(date).format("DD-MM-YYYY");

    console.log("__Today__", today);

    const users = await userModel.find({
      monthDue: {
        $regex: `^${today}`,
        $options: "i",
      },
    });

    // ----Send message to that customers who have an EMI Payment today at morning

    users.forEach((el) =>
      client.messages
        .create({
          body: "Today is your last day to pay emi",
          from: "+12057934229",
          to: "+917620307622",
        })
        .then((message) =>
          console.log("Message sent successfully. SID:", message.sid)
        )
        .catch((error) => console.error("Error sending message:", error))
    );
  }
  sendReminderMessage();
});

// Find users with last emi date

cron.schedule("0 0 * * *", async () => {
  async function getUsersByLastDate(req, res) {
    try {
      let result;

      const currentDate = moment();
      const dueDate = moment(currentDate).add(1, "months").format("DD-MM-YYYY");

      const yesterday = moment()
        .subtract(1, "days")
        .startOf("day")
        .format("DD-MM-YYYY");

      // console.log("Previous day's date:", yesterday);

      const users = await userModel.find({
        monthDue: {
          $regex: `^${yesterday}`,
          $options: "i",
        },
      });

      for (let user of users) {
        let userData = await userModel.findById({ _id: user._id });

        if (userData) {
          if (!userData.todayEmi) {
            userData.totalEmiBountCount += 1;
            userData.monthDue = dueDate;
          }

          if (userData.todayEmi) {
            userData.todayEmi = false;
            userData.monthDue = dueDate;
          }
        }

        // console.log("USERDATA : ", userData);

        result = await userModel.findByIdAndUpdate(
          { _id: user._id },
          { $set: userData },
          { new: true }
        );
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error while getting the users",
        error,
      });
    }
  }
  getUsersByLastDate();
});
