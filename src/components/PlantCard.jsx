import React, { useState } from "react";
import Imagemodal from "./ImageModal";

const PlantCard = ({ plant }) => {
  const [modal, handleModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  return (
    <div className="col-sm-12 col-md-4 col-lg-4 p-3 ">
      <div className="card">
        <h3 className="card-title">{plant.plant_name}</h3>
        <div className="d-flex align-items-center">
          {plant.similar_images.map((img, index) => {
            return (
              <div>
                <img
                  src={img.url}
                  className="img-fluid img-thumbnail mx-1"
                  alt={img.id}
                  onClick={() => {
                    setImage(img.url);
                    handleModal(true);
                    setName(plant.plant_name);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="card-footer d-flex flex-column justify-content-center">
          <a href={plant.plant_details != null ? plant.plant_details.url : ""}>
            Find out more
          </a>
          <p>Probability : {Math.round(plant.probability * 100)}%</p>
        </div>
      </div>
      <Imagemodal
        modal={modal}
        handleModal={() => {
          handleModal(!modal);
        }}
        image={image}
        name={name}
      />
    </div>
  );
};
export default PlantCard;
