import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import axios from "axios";
import { message } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Expenses = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);

  const [inputs, setInputs] = useState({
    category: "",
    description: "",
    amount: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!inputs.category || !inputs.description || !inputs.amount){
      return message.error("All Fields Are Required !")
    }
    try {
      const { data: expense } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/expense/create-expense`,
        {
          title: inputs.category,
          description: inputs.description,
          amount: parseInt(inputs.amount),
        }
      );
      if (expense) {
        // console.log("Expense Created : ", expense);
        message.success("Expense Created");
        setInputs({
          category: "",
          description: "",
          amount: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data: categories } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/all-categories`
      );
      if (categories) {
        // console.log("ALL Categories : ", categories);
        setCategories(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [title, setTitle]);

  const createTitle = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/category/create-category`,
        {
          title,
        }
      );
      if (data) {
        // console.log("Category : ", data);
        message.success("Title Created");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#F8F5F5",
        height: 90 + "vh",
        width: 100 + "%",
      }}
    >
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="lg:w-1/2 mx-auto h-full flex justify-center items-center">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-end my-2 mx-1">
              <button
                onClick={(e) => handleOpen(e)}
                className="bg-green-600 py-2 px-3 text-white font-semibold rounded-md"
              >
                Create Title
              </button>
            </div>
            <Card>
              <h2 className="text-center mt-4 text-lg text-gray-600 font-semibold">
                Create Expense
              </h2>
              <div className="p-8 flex flex-col gap-4 w-full">
                <div className="md:flex gap-5 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 font-medium">Title</label>
                    {/* <input
                      type="text"
                      className="ring-1 p-2 w-full rounded-md focus:outline-none ring-gray-300 focus:ring-gray-500"
                      placeholder="Name"
                    /> */}
                    <select
                      className="ring-1 px-2 py-[10px] w-full rounded-md focus:outline-none ring-gray-300 focus:ring-gray-500 cursor-pointer"
                      onChange={(e) =>
                        setInputs({ ...inputs, category: e.target.value })
                      }
                    >
                      <option value="" aria-readonly className="text-gray-400">
                        -Select-
                      </option>
                      {categories?.categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="" className="text-gray-600 font-medium">
                      Description
                    </label>
                    <input
                      type="text"
                      className="ring-1 p-2 w-full rounded-md focus:outline-none ring-gray-300 focus:ring-gray-500"
                      placeholder="Description"
                      value={inputs.description}
                      onChange={(e) =>
                        setInputs({ ...inputs, description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-gray-600 font-medium">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={inputs.amount}
                    onChange={(e) =>
                      setInputs({ ...inputs, amount: e.target.value })
                    }
                    className="ring-1 p-2 rounded-md focus:outline-none ring-gray-300 focus:ring-gray-500"
                    placeholder="Amount"
                  />
                </div>
                <div>
                  <button className="bg-blue-500 text-white rounded-md hover:bg-blue-400 px-4 py-2">
                    Submit
                  </button>
                </div>
              </div>
            </Card>
          </form>
        </div>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
            component="h2"
          >
            Create Title
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ring-1 p-2 rounded-md focus:outline-none ring-gray-400 focus:ring-gray-500"
              placeholder="Title..."
            />
            <Button
              disabled={!title}
              onClick={createTitle}
              variant="contained"
              type="submit"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Expenses;
