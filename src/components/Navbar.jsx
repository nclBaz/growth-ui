import React from "react";
import cover from "../images/cover.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="head_pic" style={{ backgroundImage: `url(${cover})` }} />
      <div className="navbar">
        <div className="navbar_nav">
          <div>
            <Link to="/blog">Blogs</Link>
          </div>
          <div>
            <Link to="/iot">Iot</Link>
          </div>
          <div>
            <Link to="/ai">AI</Link>
          </div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
