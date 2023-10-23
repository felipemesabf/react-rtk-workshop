import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h1>Error</h1>;
  }

  return (
    <Layout>
      <Outlet></Outlet>
    </Layout>
  );
};

export default ProtectedRoutes;
