import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import {
  Box,
  Button,
  Card,
  Modal,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Expenses = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const navigate = useNavigate();

  let total;
  total = users.map((item) => item.amount).reduce((accu, val) => accu + val, 0);

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

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data: categories } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/all-categories`
      );
      if (categories) {
        console.log("CATS : ", categories);
        setCategories(categories);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCatChange = async (e) => {
    const slug = e.target.value.toLowerCase();
    if (slug === "all") {
      try {
        // setLoading1(true);
        const { data: expense } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/expense/get-expenses`
        );
        if (expense) {
          // console.log("EXPENSE : ", expense.expenses);
          setUsers(expense.expenses);
          // setLoading1(false);
        }
      } catch (error) {
        console.log(error);
        // setLoading1(false);
      }
    } else {
      try {
        // setLoading(true);
        const { data: expense } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/category/find-cat/${slug}`
        );
        if (expense) {
          // console.log("EXPENSE : ", expense);
          setUsers(expense.expense);
          // setLoading(false);
        }
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchExpense = async () => {
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
    };
    fetchExpense();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mx: 3, mt: 20 }}>
        <Box>
          <SideNav />
        </Box>
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
  if (loading1) {
    return (
      <Box sx={{ mx: 3, mt: 20 }}>
        <Box>
          <SideNav />
        </Box>
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
        height: 100 + "vh",
        width: 100 + "%",
      }}
    >
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <form className="w-full">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 px-3 py-3">
                <h2>Sort By : </h2>

                <select
                  className="py-2 px-4 ml-3 ring-1 rounded-md focus:ring-gray-500 cursor-pointer focus:outline-none ring-gray-300"
                  onChange={handleCatChange}
                >
                  {/* <option value={"users"}>-Select-</option> */}
                  <option className="cursor-pointer" value={"all"}>
                    All
                  </option>
                  {categories?.categories?.map((cat) => (
                    <option className="cursor-pointer" value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <Box display={"flex"} justifyContent={"space-between"} px={2}>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => navigate("/add-expense")}
                    className="bg-green-700 px-4 py-2 rounded-md text-white"
                  >
                    Add Expense
                  </button>
                </div>
              </Box>
            </div>
            <div className="text-center text-2xl font-semibold text-gray-600">
              <h2>Expenses</h2>
            </div>
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
                      <TableCell align="left">{expense.description}</TableCell>
                      <TableCell align="left">{expense.amount}</TableCell>
                      {/* <TableCell align="left">Total : {"2300"}</TableCell> */}
                    </TableRow>
                  ))}
                <div className="w-[176%] mt-5 flex justify-end">
                  <h2>
                    <span className="font-thin text-gray-600">Total :</span>
                    <span className="text-sm font-semibold ml-1">{total}</span>
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
          </Card>
        </form>
      </Box>
    </Box>
  );
};

export default Expenses;
