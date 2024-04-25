import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleCustomer = () => {

  const [user, setUser] = useState({});
  const {id} = useParams();

  console.log("Single User : ", user);

  const fetchUser = async () => {
    try {
      const {data : user} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/single-user/${id}`);
      if(user){
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  },[id])

  return (
    <Box
      sx={{
        display: "flex",
        // bgcolor: "#F8F5F5",
        height: 100 + "%",
        width: 100 + "%",
      }}
      className="bg-gray-200/50"
    >
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <div className="my-5 px-5">
          <h2 className="text-center text-lg font-semibold text-gray-500 underline">
            SOURCING SECTION
          </h2>
          <div className="grid grid-cols-3 mt-2 space-y-3">
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                LG Code & Name :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.lgCodeAndName}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Location :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.location}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Branch Name & Code :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.branchNameAndCode}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                RM Code & Name :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.rmCodeAndName}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Application Date :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.applicationDate}</h2>
            </div>
          </div>

          <h2 className="text-lg text-center my-5 font-semibold text-gray-500 underline">
            LOAN SECTION
          </h2>
          <div className="grid grid-cols-3 mt-2 space-y-3 pl-3">
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Loan Amount :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.loanAmountNumber}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Loan Amount (In Words) :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.loanAmountWord}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Loan Product :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.loanProduct}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Address of Property :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.addressOfProperty}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Extent of land :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.extentOfLand}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Affordable EMI (Rs) :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.affordableEmi}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Extent of build is Sqft :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.extentInSqft}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                SY No & Village :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.village}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                District :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.district}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Login free Remitted :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.loginFreeRemmited}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Approx Market Value :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.approxMarketValue}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Property Owner :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.propertyOwner}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Insurance Opted :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.insuranceOpted}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Name of other Applicants :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.nameOfOtherApplicants}</h2>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-500 my-5 text-center underline">APPLICANT SECTION</h2>
          <div className="grid grid-cols-3 mt-2 space-y-3 pl-3">
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Name :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.nameOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Father Name :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.fatherNameOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Mother Name :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.motherNameOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                PAN No :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.PanNo}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Aadhaar No :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.adhaarNo}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Date of Birth :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.dobOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Gender :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.gender}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Status :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.statusOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                No. of Dependents :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.noOfDepedents}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Educational Details :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.educationOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Proof of Address :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.proofOdAddress}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Landmark :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.landmarkOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                City :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.cityOfApplicant}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                Pin Code :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.pinCode}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                State :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.state}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="" className="text-[14px] text-gray-500">
                E-mail ID :{" "}
              </label>
              <h2 className="font-semibold">{user?.user?.email}</h2>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default SingleCustomer;
