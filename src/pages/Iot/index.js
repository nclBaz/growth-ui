import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import IotForm from "../../components/IotForm";
import Control from "../../components/Control";
const io = require("socket.io-client");
const serverIp = "http://10.204.209.253:2000";

const Iot = () => {
  const socket = io(serverIp, { secure: true, rejectUnauthorized: false });

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
