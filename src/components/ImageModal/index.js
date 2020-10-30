import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ modal, handleModal, image, index, name }) => {
  return (
    <Modal show={modal} onHide={handleModal}>
      <Modal.Header style={{ maxHeight: "10px" }} closeButton>
        {name}
      </Modal.Header>
      <div className="d-flex flex-column justify-content-center">
        <img src={image} alt="image" className="img-fluid" />
      </div>
    </Modal>
  );
};
export default ImageModal;
