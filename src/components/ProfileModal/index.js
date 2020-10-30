import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { updateProfile } from "../../recoilState/api";
import "./styles.scss";

const ProfileModal = ({ show, handleShow, client }) => {
  const [info, setInfo] = useState({
    name: "",
    surname: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    setInfo({ ...info, [e.target.id]: e.target.value });
    console.log(info);
  };
  const handleSend = async () => {
    if (info.password !== info.confirmPassword) {
      setValidation(true);
    } else {
      setValidation(false);
      const update = await updateProfile(info);
      console.log(update);
    }
  };

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>Edit your info</Modal.Header>
      <div className="profileModal">
        <input
          type="text"
          id="name"
          placeholder={client.name}
          onChange={(e) => handleForm(e)}
        />
        <input
          type="text"
          id="surname"
          placeholder={client.surname}
          onChange={(e) => handleForm(e)}
        />
        <input
          type="text"
          id="email"
          placeholder={client.email}
          onChange={(e) => handleForm(e)}
        />
        <input
          type="text"
          id="oldPassword"
          placeholder="Old password"
          onChange={(e) => handleForm(e)}
        />
        <input
          type="password"
          id="password"
          className={validation ? "border-danger" : ""}
          placeholder="New password"
          onChange={(e) => handleForm(e)}
        />
        <input
          type="password"
          id="confirmPassword"
          className={validation ? "border-danger" : ""}
          placeholder="Confirm password"
          onChange={(e) => handleForm(e)}
        />
        <div className="profileModal_button">
          <button onClick={() => handleSend()}>Edit</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
