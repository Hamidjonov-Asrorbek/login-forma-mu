import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import Header from "../Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
