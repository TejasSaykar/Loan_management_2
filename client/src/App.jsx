import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserRegistration from "./pages/UserRegistration";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";
import TodaysEMi from "./pages/TodaysEMi";
import Report from "./pages/Report";
import CustomerList from "./pages/CustomerList";
import SingleCustomer from "./pages/SingleCustomer";
import Expenses from "./pages/Expenses";
import Addexpense from "./pages/Addexpense";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <div style={{ marginBottom: "3.5rem" }}>
        <Navbar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <IsLogin>
              <Home />
            </IsLogin>
          }
        />
        <Route
          path="/registration"
          element={
            <IsLogin>
              <UserRegistration />
            </IsLogin>
          }
        />
        <Route
          path="/users"
          element={
            <IsLogin>
              <Users />
            </IsLogin>
          }
        />
        <Route
          path="/today"
          element={
            <IsLogin>
              <TodaysEMi />
            </IsLogin>
          }
        />
        <Route
          path="/report"
          element={
            <IsLogin>
              <Report />
            </IsLogin>
          }
        />
        <Route
          path="/customer-list"
          element={
            <IsLogin>
              <CustomerList />
            </IsLogin>
          }
        />
        <Route
          path="/single-customer/:id"
          element={
            <IsLogin>
              <SingleCustomer />
            </IsLogin>
          }
        />
        <Route
          path="/expenses"
          element={
            <IsLogin>
              <Expenses />
            </IsLogin>
          }
        />
        <Route
          path="/add-expense"
          element={
            <IsLogin>
              <Addexpense />
            </IsLogin>
          }
        />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function IsLogin(props) {
  const [auth] = useAuth();

  if (auth?.user?.username || localStorage.getItem("auth")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default App;
