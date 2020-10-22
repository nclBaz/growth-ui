import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ProfilePicModal = ({ url, show, cancel, update, handleModal }) => {
  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>Update profile image?</Modal.Header>
      <div className="d-flex flex-column align-items-center">
        <div
          className="client_img"
          style={{
            width: "300px",
            height: "300px",
            backgroundImage: `url('${url}')`,
          }}
        />
        <div className="buttons">
          <button className="btn-danger" onClick={cancel}>
            Cancel
          </button>{" "}
          <button className="btn-info" onClick={update}>
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ProfilePicModal;
