import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { login, passShow, pass_icon } from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      errors.email = "Email is not valid";
    }
    if (userInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
    } else {
      setErrors({ general: "Invalid email or password" });
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
          error={!!errors.email}
          helperText={errors.email}
        />
        <div className={passShow}>
          <TextField
            type={showPassword ? "text" : "password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            error={!!errors.password}
            helperText={errors.password}
          />
          {showPassword ? (
            <FaEye
              onClick={() => setShowPassword((prev) => !prev)}
              className={pass_icon}
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword((prev) => !prev)}
              className={pass_icon}
            />
          )}
        </div>
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
