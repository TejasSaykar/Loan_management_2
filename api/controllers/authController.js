const authModel = require("../models/authModel");

exports.Register = async (req, res) => {
  try {
    const user = await new authModel({ ...req.body }).save();
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while register",
    });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    const { password: pass, ...others } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      others,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while login",
      error,
    });
  }
};
