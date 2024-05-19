import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { login } from "./style.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    setUserInfo((...prev) => ({ ...prev, email: "", password: "" }));
    const status = users.some(
      ({ email, password }) =>
        email === userInfo.email && password === userInfo.password
    );
    if (status) {
      const user = users.filter(({ email }) => email === userInfo.email)[0];
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/layout");
    }
  };
  return (
    <div className={login}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          required
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          required
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
