const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    lgCodeAndName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    branchNameAndCode: {
      type: String,
      required: true,
    },
    rmCodeAndName: {
      type: String,
      required: true,
    },
    applicationDate: {
      type: String,
      required: true,
    },
    loanAmountNumber: {
      type: Number,
      required: true,
    },
    loanAmountWord: {
      type: String,
      required: true,
    },
    loanProduct: {
      type: String,
      required: true,
    },
    loanTensure: {
      type: String,
      required: true,
    },
    addressOfProperty: {
      type: String,
      required: true,
    },
    extentOfLand: {
      type: String,
      required: true,
    },
    affordableEmi: {
      type: String,
      required: true,
    },
    extentInSqft: {
      type: String,
    },
    village: {
      type: String,
    },
    district: {
      type: String,
    },
    loginFreeRemmited: {
      type: String,
    },
    approxMarketValue: {
      type: String,
    },
    serveNo:{
      type: String
    },
    propertyOwner: {
      type: String,
    },
    insuranceOpted: {
      type: String,
    },
    nameOfOtherApplicants: {
      type: String,
    },
    applicantRmCodeAndName: {
      type: String,
    },
    gender: {
      type: String,
    },
    PanNo: {
      type: String,
    },
    adhaarNo: {
      type: Number,
    },
    nameOfApplicant: {
      type: String,
    },
    fatherNameOfApplicant: {
      type: String,
    },
    motherNameOfApplicant: {
      type: String,
    },
    existingEsaf: {
      type: String,
    },
    NRI: {
      type: String,
    },
    dobOfApplicant: {
      type: String,
    },
    genderOfApplicant: {
      type: String,
    },
    statusOfApplicant: {
      type: String,
    },
    noOfDepedents: {
      type: String,
    },
    educationOfApplicant: {
      type: String,
    },
    religionOfApplicant: {
      type: String,
    },
    proofOfIdentity: {
      type: String,
    },
    identityNo: {
      type: Number,
    },
    ckycNo: {
      type: String,
    },
    proofOdAddress: {
      type: String,
    },
    presentResAddress: {
      type: String,
    },
    landmarkOfApplicant: {
      type: String,
    },
    yearsAtCurrentCity: {
      type: String,
    },
    cityOfApplicant: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    yearsAtCurrentRes: {
      type: Number,
    },
    state: {
      type: String,
    },
    telephone1: {
      type: Number,
    },
    mobileNo: {
      type: Number,
    },
    telephone2: {
      type: Number,
    },
    email: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    permanentLandmark: {
      type: String,
    },
    permanentCity: {
      type: String,
    },
    permanentState: {
      type: String,
    },
    permanentPinCode: {
      type: Number,
    },
    reference1Name: {
      type: String,
    },
    reference1Address: {
      type: String,
    },
    reference1Contact: {
      type: Number,
    },
    reference2Name: {
      type: String,
    },
    reference2Address: {
      type: String,
    },
    reference2Contact: {
      type: String,
    },
    occupation: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
