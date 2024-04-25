import React, { useEffect, useState } from "react";
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
  Paper,
  TextField,
  TableContainer,
  Typography,
} from "@mui/material";
import SideNav from "../components/SideNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const id = useParams().id;

  const [singleUser, setSingleUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/single-user/${id}`
        );
        if (data) {
          // console.log("Single user : ", data.user);
          setSingleUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/update-user/${id}`,
        {
          ...singleUser,
        }
      );
      if (data) {
        // console.log("Updated User : ", data);
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component={"div"}
      sx={{ display: "flex", bgcolor: "#F8F5F5", height: 90 + "vh" }}
    >
      <SideNav />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TableContainer component={Paper}>
          <Grid display={"flex"} justifyContent={"center"} sx={{ my: 2 }}>
            <Typography variant="h5" color={"gray"} sx={{ fontWeight: "bold" }}>
              Edit User
            </Typography>
          </Grid>
          <form onSubmit={handleUpdate}>
            {/* <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Loan Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    EMI Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Check Paid User
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{singleUser.fullname}</TableCell>
                  <TableCell align="right">{singleUser.loanAmount}</TableCell>
                  <TableCell align="right">{"Paid"}</TableCell>
                  <TableCell align="right">
                    {new Date(singleUser.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox onChange={(e) => setCheck(e.target.checked)} />
                  </TableCell>
                </TableRow>
                <Box>
                  <Button variant="contained" sx={{ m: 2 }}>
                    Submit
                  </Button>
                </Box>
              </TableBody>
            </Table> */}

            <>
              <Grid
                container
                spacing={2}
                sx={{ flexGrow: 1, marginBottom: "10px" }}
              >
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.nameOfApplicant}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        nameOfApplicant: e.target.value,
                      })
                    }
                    label="Name"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.loanAmountNumber}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        loanAmountNumber: e.target.value,
                      })
                    }
                    label="Loan Amount Requested"
                    variant="filled"
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
                    id="filled-basic"
                    type="text"
                    min="0"
                    value={singleUser.loanProduct}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        loanProduct: e.target.value,
                      })
                    }
                    label="Loan Product"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    id="filled-basic"
                    type="text"
                    value={singleUser.affordableEmi}
                    required
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        affordableEmi: e.target.value,
                      })
                    }
                    label="Affordable EMI"
                    variant="filled"
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
                    id="filled-basic"
                    type="text"
                    value={singleUser.addressOfProperty}
                    required
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        addressOfProperty: e.target.value,
                      })
                    }
                    label="Address Of Property"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    type="text"
                    variant="filled"
                    value={singleUser.fatherNameOfApplicant}
                    label="Father Name"
                    sx={{ width: 100 + "%" }}
                    required
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        fatherNameOfApplicant: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              {/* 
              <Grid>
                <TextField
                  type="text"
                  variant="filled"
                  value={singleUser.loanAmountWord}
                  required
                  label="Loan Amount Requested"
                  placeholder="In Words"
                  sx={{ width: 100 + "%", mb: 2 }}
                  onChange={(e) =>
                    setSingleUser({
                      ...singleUser,
                      loanAmountWord: e.target.value,
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
                    id="filled-basic"
                    type="text"
                    value={singleUser.loanProduct}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        loanProduct: e.target.value,
                      })
                    }
                    label="Loan Product"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.loanTensure}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        loanTensure: e.target.value,
                      })
                    }
                    label="Loan Tensure Requested"
                    placeholder="__years"
                    variant="filled"
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
                    id="filled-basic"
                    type="text"
                    value={singleUser.addressOfProperty}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        addressOfProperty: e.target.value,
                      })
                    }
                    label="Address of property offered as security"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.extentOfLand}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        extentOfLand: e.target.value,
                      })
                    }
                    label="Extent of land"
                    variant="filled"
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
                    id="filled-basic"
                    type="number"
                    value={singleUser.affordableEmi}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        affordableEmi: e.target.value,
                      })
                    }
                    label="Affordable EMI in Rs"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.extentInSqft}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        extentInSqft: e.target.value,
                      })
                    }
                    label="Extent of build in Sqft"
                    variant="filled"
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
                    id="filled-basic"
                    type="text"
                    value={singleUser.village}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        village: e.target.value,
                      })
                    }
                    label="SY No & Village"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.district}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        district: e.target.value,
                      })
                    }
                    label="District"
                    variant="filled"
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
                    id="filled-basic"
                    type="text"
                    value={singleUser.loginFreeRemmited}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        loginFreeRemmited: e.target.value,
                      })
                    }
                    label="Login Free Remmited"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
                <Grid item sm={12} lg={6}>
                  <TextField
                    required
                    id="filled-basic"
                    type="text"
                    value={singleUser.approxMarketValue}
                    onChange={(e) =>
                      setSingleUser({
                        ...singleUser,
                        approxMarketValue: e.target.value,
                      })
                    }
                    label="Approx Market Value"
                    variant="filled"
                    sx={{ width: 100 + "%" }}
                  />
                </Grid>
              </Grid> */}

              <Box sx={{ m: 2, display: "flex", alignSelf: "end" }}>
                <Button
                  type="submit"
                  onClick={handleUpdate}
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </>
          </form>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default EditUser;
