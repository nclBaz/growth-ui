import React, { useState } from "react";
import Navbar from "../components/Navbar";
import IotForm from "../components/IotForm";
import Control from "../components/Control";
const io = require("socket.io-client");

const Iot = () => {
  const [socket, setSocket] = useState(io("http://192.168.0.34:5000"));

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 align-items-center d-flex">
            <IotForm socket={socket} />
          </div>
          <div className="col-sm-12  col-md-8 my-3">
            <Control socket={socket} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Iot;
