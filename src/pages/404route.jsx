import React from "react";
import { GiCarnivorousPlant } from "react-icons/gi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound_display">
        <div>
          <h3>Sorry This page does not exist</h3>
          <GiCarnivorousPlant size="12em" color="#00A86B" />
          <h1>404 Error page not found </h1>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
