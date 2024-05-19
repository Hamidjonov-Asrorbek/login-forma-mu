import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import Header from "../Header";
import Product from "../Product";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Product />
      </main>
      <footer></footer>
    </>
  );
}
