import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SideNav from "../components/SideNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEye } from "react-icons/io5";

const CustomerList = () => {
  const [users, setUsers] = useState([]);
  const [categories, setcategories] = useState([]);
  const [tab, setTab] = useState("users");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  let total;
  if (tab === "expense") {
    total = users
      .map((item) => item.amount)
      .reduce((accu, val) => accu + val, 0);
  }

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data: categories } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/all-categories`
      );
      if (categories) {
        // console.log("CATS : ", categories);
        setcategories(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [tab === "expense"]);

  const handleChange = async (e) => {
    setTab(e.target.value);
    let type = e.target.value;
    if (type === "users") {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/all-users`
        );
        if (data) {
          // console.log("Users : ", users);
          setUsers(data.users);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data: expenses } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/expense/get-expenses`
        );
        if (expenses) {
          // console.log("EXPENSES : ", expenses.expenses);
          setUsers(expenses.expenses);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCatChange = async (e) => {
    const slug = e.target.value.toLowerCase();
    console.log("SLUG : ", slug)
    try {
      const { data: expense } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/find-cat/${slug}`
      );
      if (expense) {
        // console.log("EXPENSE : ", expense);
        setUsers(expense.expense);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/all-users`
      );
      if (data) {
        setUsers(data.users);
        // console.log(data.users);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mx: 3, mt: 20 }}>
        <Card>
          <CardContent>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Loading....</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#F8F5F5",
        height: 100 + "%",
        width: 100 + "%",
      }}
    >
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <TableContainer component={Paper}>
          <Grid>
            <div className="flex items-center ml-3 pt-5">
              <label htmlFor="">Sort By : </label>
              <select
                className="py-2 px-4 ml-3 ring-1 rounded-md focus:ring-gray-500 cursor-pointer focus:outline-none ring-gray-300"
                onChange={handleChange}
              >
                {/* <option value={"users"}>-Select-</option> */}
                <option className="cursor-pointer" value={"users"}>
                  Customers
                </option>
                <option className="cursor-pointer" value={"expense"}>
                  Expenses
                </option>
              </select>
              {tab === "expense" && (
                <select
                  className="py-2 px-4 ml-3 ring-1 rounded-md focus:ring-gray-500 cursor-pointer focus:outline-none ring-gray-300"
                  onChange={handleCatChange}
                >
                  {/* <option value={"users"}>-Select-</option> */}
                  <option className="cursor-pointer" value={"users"}>
                    -Select-
                  </option>
                  {categories?.categories?.map((cat) => (
                    <option className="cursor-pointer" value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <Grid display="flex" justifyContent={"center"} sx={{ my: 2 }}>
              <Typography variant="h4" color={"gray"}>
                {tab === "users" ? "Customers List" : "Expenses"}
              </Typography>
            </Grid>
          </Grid>
          {tab === "users" && users.length > 0 && (
            <form>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                px={2}
              ></Box>
              <Table
                sx={{ width: 100 + "%", overflowX: "scroll" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Laon Amount Requested
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Loan Product
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Affordable EMI
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Address of Property
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Father Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      width: "100%",
                      margin: "auto",
                      justifyContent: "center",
                      padding: "5px 0px",
                    }}
                  >
                    {records.length === 0 && <h2>Customer Not Found</h2>}
                  </div>

                  {records &&
                    records.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell align="left">
                          {user.nameOfApplicant}
                        </TableCell>
                        <TableCell align="left">
                          {user.loanAmountNumber}
                        </TableCell>
                        <TableCell align="left">{user.loanProduct}</TableCell>
                        <TableCell align="left">{user.affordableEmi}</TableCell>
                        <TableCell align="left">
                          {user.addressOfProperty}
                        </TableCell>
                        <TableCell align="left">
                          {user.fatherNameOfApplicant}
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            sx={{
                              color: "darkblue",
                              textDecoration: "underline",
                            }}
                          >
                            <Link to={`/single-customer/${user._id}`}>
                              <IoEye style={{ fontSize: "1.3rem" }} />
                            </Link>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}

                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      m: 3,
                    }}
                  >
                    <Box>
                      <Button
                        disabled={firstIndex === 0}
                        variant={"contained"}
                        onClick={prePage}
                      >
                        Prev
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      {numbers.map((item) => (
                        <Typography
                          sx={
                            currentPage === item && {
                              backgroundColor: "skyblue",
                              color: "white",
                              px: 2,
                              py: 1,
                            }
                          }
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                    <Box>
                      <Button
                        // disabled={lastIndex === npage }
                        variant={"contained"}
                        onClick={nextPage}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>

                  {/* {searchedData !== undefined && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {1}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.nameOfApplicant}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.loanAmountNumber}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.loanProduct}
                      </TableCell>
                      <TableCell
                        align="left"
                      >
                        {searchedData.affordableEmi}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.addressOfProperty}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.fatherNameOfApplicant}
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            color: "darkblue",
                            textDecoration: "underline",
                          }}
                        >
                          <Link to={`/edit-user/${searchedData._id}`}>
                            Edit
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
              {/* {filteredUsers.length !== 0 && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" variant="contained" sx={{ m: 2 }}>
                    Submit
                  </Button>
                </Box>
              )} */}
            </form>
          )}

          {tab === "expense" && (
            <form>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                px={2}
              ></Box>
              <Table
                sx={{ width: 100 + "%", overflowX: "scroll" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Title
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      width: "100%",
                      margin: "auto",
                      justifyContent: "center",
                      padding: "5px 0px",
                    }}
                  >
                    {records.length === 0 && <h2>Expense Not Found</h2>}
                  </div>

                  {records &&
                    records.map((expense, index) => (
                      <TableRow key={expense._id}>
                        <TableCell align="left">
                          {expense?.title?.title}
                        </TableCell>
                        <TableCell align="left">
                          {expense.description}
                        </TableCell>
                        <TableCell align="left">{expense.amount}</TableCell>
                        {/* <TableCell align="left">Total : {"2300"}</TableCell> */}
                      </TableRow>
                    ))}
                  <div className="w-[176%] mt-5 flex justify-end">
                    <h2>
                      <span className="font-thin text-gray-600">Total :</span>
                      <span className="text-sm font-semibold ml-1">
                        {total}
                      </span>
                    </h2>
                  </div>
                  <div className="flex gap-3 items-center my-2 mx-3">
                    <Box>
                      <Button
                        disabled={firstIndex === 0}
                        variant={"contained"}
                        onClick={prePage}
                      >
                        Prev
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      {numbers.map((item) => (
                        <Typography
                          sx={
                            currentPage === item && {
                              backgroundColor: "skyblue",
                              color: "white",
                              px: 2,
                              py: 1,
                            }
                          }
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                    <Box>
                      <Button
                        // disabled={lastIndex === npage }
                        variant={"contained"}
                        onClick={nextPage}
                      >
                        Next
                      </Button>
                    </Box>
                  </div>
                </TableBody>
              </Table>
            </form>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CustomerList;
