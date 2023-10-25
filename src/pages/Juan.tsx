import React from "react";
import { useNavigate } from "react-router-dom";

const Juan = () => {
  console.log("me renderise");
  const navigate = useNavigate();

  return (
    <>
      <div>Hi juan</div>
      <button onClick={() => navigate("/")}>send</button>
    </>
  );
};

export default Juan;
