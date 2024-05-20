import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { signUp, passShow, pass_icon } from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    setUserInfo((...prev) => ({
      ...prev,
      name: "",
      avatar: "",
      email: "",
      password: "",
    }));
    try {
      const req = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          Access: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userInfo }),
      });
      const data = await req.json();
      localStorage.setItem("users", JSON.stringify([...users, data]));

      navigate("/layout");

      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={signUp}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          id="name"
          label="Name"
          variant="outlined"
          value={userInfo.name}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, name: e.target.value.trim() }))
          }
          required
        />
        <TextField
          type="link"
          id="avatar"
          size="small"
          label="Avatar"
          variant="outlined"
          value={userInfo.avatar}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, avatar: e.target.value.trim() }))
          }
          required
        />
        <TextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo((prev) => ({
              ...prev,
              email: e.target.value.trim(),
            }))
          }
          required
        />
        <div className={passShow}>
          <TextField
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            variant="outlined"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                password: e.target.value.trim(),
              }))
            }
            required
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
