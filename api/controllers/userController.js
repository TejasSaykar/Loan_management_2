const userModel = require("../models/userModel");

// Register User
exports.userRegistration = async (req, res) => {
  // const { fullname, address, loanAmount, EMIType, penaltyAmount, guaranteePerson1, guaranteePerson2, guaranteePerson1Address, guaranteePerson2Address, nomineeName, nomineeAddress, refferalName, startEMI, endEMI, isPaid, guaranteePerson1Phone, guaranteePerson2Phone, nomineePhone, emiAmount, totalPenalty, advanceAmount } = req.body;

  try {
    const user = await new userModel({ ...req.body, applicationDate: req.body.applicationDate }).save();

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
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body, applicationDate: req.body.createdAt },
      { new: true }
    );
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
  // const mobile = req.body.mobile;
  // const email = req.body.email;
  // return console.log(mobile, email);
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
