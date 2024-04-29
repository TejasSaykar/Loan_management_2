import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const UserRegistration = () => {
  const [tab, setTab] = useState("tab1");

  const [inputs, setInputs] = useState({
    lgCodeAndName: "",
    location: "",
    branchNameAndCode: "",
    rmCodeAndName: "",
    applicationDate: "",
    loanAmountNumber: "",
    emiAmount: null,
    totalEmi: null,
    lastEmiDate: "",
    loanAmountWord: "",
    loanProduct: "",
    loanTensure: "",
    addressOfProperty: "",
    extentOfLand: "",
    affordableEmi: "",
    penalty: "",
    extentInSqft: "",
    village: "",
    district: "",
    loginFreeRemmited: "",
    approxMarketValue: "",
    serveNo: "",

    propertyOwner: "",
    insuranceOpted: "",
    nameOfOtherApplicants: "",
    applicantRmCodeAndName: "",
    gender: "",
    PanNo: "",
    adhaarNo: "",

    nameOfApplicant: "",
    fatherNameOfApplicant: "",
    motherNameOfApplicant: "",
    existingEsaf: "",
    NRI: "",
    dobOfApplicant: "",
    genderOfApplicant: "",
    statusOfApplicant: "",
    noOfDepedents: "",

    educationOfApplicant: "",
    religionOfApplicant: "",
    proofOfIdentity: "",
    identityNo: "",
    ckycNo: "",
    proofOdAddress: "",

    presentResAddress: "",
    landmarkOfApplicant: "",
    yearsAtCurrentCity: "",
    cityOfApplicant: "",
    pinCode: "",
    yearsAtCurrentRes: "",
    state: "",

    telephone1: "",
    mobileNo: "",
    telephone2: "",
    email: "",
    presentAddress: "",
    permanentAddress: "",
    permanentLandmark: "",

    permanentCity: "",
    permanentState: "",
    permanentPinCode: "",
    reference1Name: "",
    reference1Address: "",
    reference1Contact: "",
    reference2Name: "",
    reference2Address: "",

    reference2Contact: "",
    occupation: "",
  });

  // console.log("Inputs : ", inputs);

  const [loanType, setLoanType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!moment(inputs.applicationDate).format("YYYY-MM-DD")){
      return alert("Invalid Date")
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/user-registration`,
        {
          ...inputs,
          applicationDate: moment(inputs.applicationDate).format("DD-MM-YYYY"),
        }
      );
      if (data) {
        // console.log(data);
        // navigate("/users");
        message.success("Registration Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#F8F5F5" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Card
              sx={{
                maxWidth: 100 + "%",
                alignContent: "center",
                paddingTop: "5px",
              }}
            >
              <CardContent>
                {tab === "tab1" && (
                  <Box display={"flex"}>
                    <h2>Select Loan Type : </h2>
                    <select
                      style={{
                        border: "1px solid lightgray",
                        padding: "4px",
                        borderRadius: "5px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onChange={(e) => setLoanType(e.target.value)}
                    >
                      <option style={{ cursor: "pointer" }} value="Personal">
                        Personal
                      </option>
                      <option
                        style={{ cursor: "pointer" }}
                        value="Morgage Loan"
                      >
                        Morgage Laon
                      </option>
                      <option style={{ cursor: "pointer" }} value="Group Loan">
                        Group Loan
                      </option>
                    </select>
                  </Box>
                )}
                <Grid display={"flex"} justifyContent={"center"} sx={{ mb: 1 }}>
                  <Typography variant="h4" color={"gray"}>
                    User Registration
                  </Typography>
                </Grid>

                {tab == "tab1" && (
                  <>
                    <Box>
                      <div className="text-center pb-5 text-lg font-semibold text-gray-600">
                        <h2>SOURCING SECTION</h2>
                      </div>
                    </Box>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.lgCodeAndName}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              lgCodeAndName: e.target.value,
                            })
                          }
                          label="LG Code & Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.location}
                          onChange={(e) =>
                            setInputs({ ...inputs, location: e.target.value })
                          }
                          label="Location"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          min="0"
                          value={inputs.branchNameAndCode}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              branchNameAndCode: e.target.value,
                            })
                          }
                          label="Branch Name & Code"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          id="standard-basic"
                          type="text"
                          value={inputs.rmCodeAndName}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              rmCodeAndName: e.target.value,
                            })
                          }
                          label="RM Code & Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={12}>
                        <TextField
                          id="standard-basic"
                          type="date"
                          value={inputs.applicationDate}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              applicationDate: e.target.value,
                            })
                          }
                          label="Application Date"
                          placeholder="YYYY-MM-DD"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Box>
                      <div className="text-center py-5 font-semibold text-lg text-gray-600">
                        <h2>LOAN DETAILS</h2>
                      </div>
                    </Box>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="number"
                          variant="outlined"
                          value={inputs.loanAmountNumber}
                          label="Loan Amount Requested"
                          placeholder="In Number"
                          sx={{ width: 100 + "%" }}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              loanAmountNumber: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="text"
                          variant="outlined"
                          value={inputs.loanAmountWord}
                          required
                          label="Loan Amount Requested"
                          placeholder="In Words"
                          sx={{ width: 100 + "%", mb: 2 }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              loanAmountWord: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="number"
                          variant="outlined"
                          value={inputs.emiAmount}
                          label="EMI Amount"
                          placeholder="EMI Amount"
                          sx={{ width: 100 + "%" }}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              emiAmount: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="number"
                          variant="outlined"
                          value={inputs.totalEmi}
                          required
                          label="Total EMI"
                          placeholder="Total EMI"
                          sx={{ width: 100 + "%", mb: 2 }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              totalEmi: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item sm={12} lg={6}>
                      <TextField
                        type="text"
                        variant="outlined"
                        value={inputs.lastEmiDate}
                        required
                        label="Last EMI Date"
                        placeholder="DD-MM-YYYY"
                        sx={{ width: 100 + "%", mb: 2 }}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            lastEmiDate: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.loanProduct}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              loanProduct: e.target.value,
                            })
                          }
                          label="Loan Product"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.loanTensure}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              loanTensure: e.target.value,
                            })
                          }
                          label="Loan Tensure Requested"
                          placeholder="__years"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.addressOfProperty}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              addressOfProperty: e.target.value,
                            })
                          }
                          label="Address of property offered as security"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.extentOfLand}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              extentOfLand: e.target.value,
                            })
                          }
                          label="Extent of land"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.affordableEmi}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              affordableEmi: e.target.value,
                            })
                          }
                          label="Affordable EMI in Rs"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.penalty}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              penalty: e.target.value,
                            })
                          }
                          label="Penalty Amount"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid my={1} item sm={12} lg={12}>
                      <TextField
                        required
                        id="standard-basic"
                        type="text"
                        value={inputs.extentInSqft}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            extentInSqft: e.target.value,
                          })
                        }
                        label="Extent of build in Sqft"
                        variant="outlined"
                        sx={{ width: 100 + "%" }}
                      />
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.village}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              village: e.target.value,
                            })
                          }
                          label="SY No & Village"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.district}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              district: e.target.value,
                            })
                          }
                          label="District"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.loginFreeRemmited}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              loginFreeRemmited: e.target.value,
                            })
                          }
                          label="Login Free Remmited"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.approxMarketValue}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              approxMarketValue: e.target.value,
                            })
                          }
                          label="Approx Market Value"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    {loanType === "Morgage Loan" && (
                      <Grid mb={1} item sm={12} lg={12}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.serveNo}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              serveNo: e.target.value,
                            })
                          }
                          label="Serve Number/ GUT Number"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    )}
                  </>
                )}
                {tab == "tab2" && (
                  <>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.propertyOwner}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              propertyOwner: e.target.value,
                            })
                          }
                          label="Property Owner"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.insuranceOpted}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              insuranceOpted: e.target.value,
                            })
                          }
                          label="Insurance Opted?"
                          placeholder="Yes/No"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={12}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          min="0"
                          value={inputs.nameOfOtherApplicants}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              nameOfOtherApplicants: e.target.value,
                            })
                          }
                          label="Name of other Applicants"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      {/* <Grid item sm={12} lg={6}>
                        <TextField
                          id="standard-basic"
                          type="text"
                          value={inputs.applicantRmCodeAndName}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              applicantRmCodeAndName: e.target.value,
                            })
                          }
                          label="RM Code & Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid> */}
                    </Grid>

                    <Box>
                      <div className="text-center font-semibold my-5 text-lg text-gray-600">
                        <h2>APPLICANT SECTION</h2>
                      </div>
                    </Box>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Title
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.gender}
                          label="Gender"
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              gender: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"Mr"}>Mr</MenuItem>
                          <MenuItem value={"Ms"}>Ms</MenuItem>
                          <MenuItem value={"M/s"}>M/s</MenuItem>
                          <MenuItem value={"Others"}>Others</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="text"
                          variant="outlined"
                          value={inputs.PanNo}
                          label="PAN No"
                          sx={{ width: 100 + "%" }}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              PanNo: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={inputs.adhaarNo}
                        required
                        label="Aadhaar No"
                        sx={{ width: 100 + "%", mb: 2 }}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            adhaarNo: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.nameOfApplicant}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              nameOfApplicant: e.target.value,
                            })
                          }
                          label="Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.fatherNameOfApplicant}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              fatherNameOfApplicant: e.target.value,
                            })
                          }
                          label="Father's/ Spouse's Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.motherNameOfApplicant}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              motherNameOfApplicant: e.target.value,
                            })
                          }
                          label="Mother's Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.existingEsaf}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              existingEsaf: e.target.value,
                            })
                          }
                          label="Whether Existing ESAF Customer: Yes/ No"
                          placeholder="If yes, CIF No."
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.NRI}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              NRI: e.target.value,
                            })
                          }
                          label="Whether NRI / Resident"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.dobOfApplicant}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              dobOfApplicant: e.target.value,
                            })
                          }
                          label="Date of Birth / Incorporation"
                          placeholder="YYYY-MM-DD"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Gender
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.genderOfApplicant}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              genderOfApplicant: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"m"}>M</MenuItem>
                          <MenuItem value={"f"}>F</MenuItem>
                          <MenuItem value={"third"}>Third</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Status
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.statusOfApplicant}
                          label="Age"
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              statusOfApplicant: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"single"}>Single</MenuItem>
                          <MenuItem value={"married"}>Married</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.noOfDepedents}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              noOfDepedents: e.target.value,
                            })
                          }
                          label="No. of Dependents"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Education Details
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.educationOfApplicant}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              educationOfApplicant: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"undergraduate"}>
                            Undergraduate
                          </MenuItem>
                          <MenuItem value={"graduate"}>Graduate</MenuItem>
                          <MenuItem value={"post graduate"}>
                            Post Graduate
                          </MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </>
                )}
                {tab == "tab3" && (
                  <>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Religion
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.religionOfApplicant}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              religionOfApplicant: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"sc"}>SC</MenuItem>
                          <MenuItem value={"st"}>ST</MenuItem>
                          <MenuItem value={"obc"}>OBC</MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Proof Of Identity
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.proofOfIdentity}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              proofOfIdentity: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"passport"}>Passport</MenuItem>
                          <MenuItem value={"pan card"}>PAN Card</MenuItem>
                          <MenuItem value={"voters identity card"}>
                            Voters Identity Card
                          </MenuItem>
                          <MenuItem value={"driving license"}>
                            Driving License
                          </MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          min="0"
                          value={inputs.identityNo}
                          onChange={(e) =>
                            setInputs({ ...inputs, identityNo: e.target.value })
                          }
                          label="Identity Number"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          id="standard-basic"
                          type="text"
                          value={inputs.ckycNo}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              ckycNo: e.target.value,
                            })
                          }
                          label="CKYC No."
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Proof Of Address
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.proofOdAddress}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              proofOdAddress: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"passport"}>Passport</MenuItem>
                          <MenuItem value={"driving license"}>
                            Driving License
                          </MenuItem>
                          <MenuItem value={"bank statement"}>
                            Bank Statement
                          </MenuItem>
                          <MenuItem value={"electricity/telephone bill"}>
                            Electricity / Telephone Bill
                          </MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="text"
                          variant="outlined"
                          value={inputs.presentResAddress}
                          label="Present Res Address"
                          sx={{ width: 100 + "%" }}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              presentResAddress: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid>
                      <TextField
                        type="text"
                        variant="outlined"
                        value={inputs.landmarkOfApplicant}
                        required
                        label="Landmark"
                        sx={{ width: 100 + "%", mb: 2 }}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            landmarkOfApplicant: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.yearsAtCurrentCity}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              yearsAtCurrentCity: e.target.value,
                            })
                          }
                          label="Years at current city"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.cityOfApplicant}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              cityOfApplicant: e.target.value,
                            })
                          }
                          label="City"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.pinCode}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              pinCode: e.target.value,
                            })
                          }
                          label="PIN Code"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.yearsAtCurrentRes}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              yearsAtCurrentRes: e.target.value,
                            })
                          }
                          label="Years at current res"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.state}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              state: e.target.value,
                            })
                          }
                          label="State"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.telephone1}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              telephone1: e.target.value,
                            })
                          }
                          label="Tel(R)"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.mobileNo}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              mobileNo: e.target.value,
                            })
                          }
                          label="Mobile No."
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          id="standard-basic"
                          type="number"
                          value={inputs.telephone2}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              telephone2: e.target.value,
                            })
                          }
                          label="Tel(O)"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="email"
                          value={inputs.email}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              email: e.target.value,
                            })
                          }
                          label="Email ID"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Present Address Is
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.presentAddress}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              presentAddress: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"Owned"}>Owned</MenuItem>
                          <MenuItem value={"Parental"}>Parental</MenuItem>
                          <MenuItem value={"Company Provided"}>
                            Company Provided
                          </MenuItem>
                          <MenuItem value={"Rented"}>Rented</MenuItem>
                          <MenuItem value={"Same as Above"}>
                            Same as Above
                          </MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </>
                )}

                {tab == "tab4" && (
                  <>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          min="0"
                          value={inputs.permanentAddress}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              permanentAddress: e.target.value,
                            })
                          }
                          label="Permanent Address"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          min="0"
                          value={inputs.permanentLandmark}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              permanentLandmark: e.target.value,
                            })
                          }
                          label="Lankmark"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          min="0"
                          value={inputs.permanentCity}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              permanentCity: e.target.value,
                            })
                          }
                          label="City"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          id="standard-basic"
                          type="text"
                          value={inputs.permanentState}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              permanentState: e.target.value,
                            })
                          }
                          label="State"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          min="0"
                          value={inputs.permanentPinCode}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              permanentPinCode: e.target.value,
                            })
                          }
                          label="PIN Code"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          type="text"
                          variant="outlined"
                          value={inputs.reference1Name}
                          label="Personal Reference 1 Name"
                          sx={{ width: 100 + "%" }}
                          required
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              reference1Name: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid>
                      <TextField
                        type="text"
                        variant="outlined"
                        value={inputs.reference1Address}
                        required
                        label="Personal Reference 1 Address"
                        sx={{ width: 100 + "%", mb: 2 }}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            reference1Address: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.reference1Contact}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              reference1Contact: e.target.value,
                            })
                          }
                          label="Personal Reference 1 Contact"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.reference2Name}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              reference2Name: e.target.value,
                            })
                          }
                          label="Personal Reference 2 Name"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="text"
                          value={inputs.reference2Address}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              reference2Address: e.target.value,
                            })
                          }
                          label="Personal Reference 2 Address"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.reference2Contact}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              reference2Contact: e.target.value,
                            })
                          }
                          label="Personal Reference 2 Contact"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={12}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Occupation
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.occupation}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              occupation: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"salaried"}>Salaried</MenuItem>
                          <MenuItem value={"self-employed"}>
                            Self-Employed
                          </MenuItem>
                          <MenuItem value={"retired"}>Retired</MenuItem>
                          <MenuItem value={"housewife"}>Housewife</MenuItem>
                          <MenuItem value={"student"}>Student</MenuItem>
                          <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                      </Grid>
                      {/* <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.guaranteePerson2Address}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              guaranteePerson2Address: e.target.value,
                            })
                          }
                          label="Tel(R)"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid> */}
                    </Grid>

                    {/* <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="number"
                          value={inputs.nomineeName}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              nomineeName: e.target.value,
                            })
                          }
                          label="Mobile No."
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <TextField
                          id="standard-basic"
                          type="number"
                          value={inputs.nomineeAddress}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              nomineeAddress: e.target.value,
                            })
                          }
                          label="Tel(O)"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1, marginBottom: "10px" }}
                    >
                      <Grid item sm={12} lg={6}>
                        <TextField
                          required
                          id="standard-basic"
                          type="email"
                          value={inputs.nomineePhone}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              nomineePhone: e.target.value,
                            })
                          }
                          label="Email ID"
                          variant="outlined"
                          sx={{ width: 100 + "%" }}
                        />
                      </Grid>
                      <Grid item sm={12} lg={6}>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ ml: 0.2 }}
                        >
                          Present Address Is
                        </InputLabel>
                        <Select
                          variant="standard"
                          required
                          value={inputs.instalmentType}
                          sx={{ width: 100 + "%" }}
                          onChange={(e) =>
                            setInputs({
                              ...inputs,
                              instalmentType: e.target.value,
                            })
                          }
                        >
                          <MenuItem value={"Owned"}>Owned</MenuItem>
                          <MenuItem value={"Parental"}>Parental</MenuItem>
                          <MenuItem value={"Company Provided"}>
                            Company Provided
                          </MenuItem>
                          <MenuItem value={"Rented"}>Rented</MenuItem>
                          <MenuItem value={"Same as Above"}>
                            Same as Above
                          </MenuItem>
                        </Select>
                      </Grid>
                    </Grid> */}
                  </>
                )}

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    onClick={() => setTab("tab1")}
                    variant="contained"
                    sx={
                      tab == "tab1" && { bgcolor: "darkblue", color: "white" }
                    }
                  >
                    1
                  </Button>
                  <Button
                    onClick={() => setTab("tab2")}
                    variant="contained"
                    sx={
                      tab == "tab2" && { bgcolor: "darkblue", color: "white" }
                    }
                  >
                    2
                  </Button>
                  <Button
                    onClick={() => setTab("tab3")}
                    variant="contained"
                    sx={
                      tab == "tab3" && { bgcolor: "darkblue", color: "white" }
                    }
                  >
                    3
                  </Button>
                  <Button
                    onClick={() => setTab("tab4")}
                    variant="contained"
                    sx={
                      tab == "tab4" && { bgcolor: "darkblue", color: "white" }
                    }
                  >
                    4
                  </Button>
                  {tab == "tab4" && (
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default UserRegistration;
