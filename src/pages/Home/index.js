import React, { useState } from "react";
import bgImage from "../../static/images/cover.jpg";
import Signin from "../../Auth/Signin";
import Signup from "../../Auth/SignupModal";
import "./styles.scss";

const Home = (props) => {
  const [showModal, setModal] = useState(false);

  return (
    <>
      <div
        className="head_pic"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      <div className="home">
        <div className="home_welcome">
          <div className="home_welcome_text">
            <h4>Growth</h4>
            <h5>Create a better environment for your plants</h5>
          </div>
          <Signin
            {...props}
            openModal={() => {
              setModal(true);
            }}
          />
          <Signup
            {...props}
            show={showModal}
            handleModal={() => {
              setModal(!showModal);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
