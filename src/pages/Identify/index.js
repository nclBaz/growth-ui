import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { toBase64, identifyPlant } from "../../functions";
import { BsCloudUpload } from "react-icons/bs";
import Plantcard from "../../components/PlantCard";
import "./styles.scss";

const Identify = () => {
  const [pic, setPic] = useState();
  const [picUrl, setUrl] = useState();
  const imgRef = useRef();
  const [suggestions, setSuggestions] = useState(false);

  const handleChange = async (e) => {
    //Creates an url of the pic
    setUrl(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      //sets picture to base64Format
      setPic(await toBase64(e.target.files[0]));
    } else console.log("err");
  };

  const handleClick = async () => {
    const ok = await identifyPlant(pic);
    setSuggestions(ok.suggestions);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="identify">
            <div className="identify_description">
              <h4>Identify your plant </h4>
              <p>
                It is as easy as{" "}
                <span
                  onClick={() => imgRef.current.click()}
                  style={{
                    color: "#339e66ff",
                    fontSize: "1.3em",
                    cursor: "pointer",
                  }}
                >
                  UPLOADING
                </span>{" "}
                a picture
              </p>
            </div>
            <div className="identify_frame">
              {pic ? (
                <img
                  className="img-fluid"
                  style={{
                    border: "5px solid  rgb(10,31,32)",
                    maxHeight: "15em",
                  }}
                  src={picUrl}
                  alt=""
                />
              ) : (
                <BsCloudUpload
                  size="10em"
                  color="#339e66ff"
                  onClick={() => imgRef.current.click()}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <div>
              <input
                type="file"
                className="d-none"
                onChange={(e) => handleChange(e)}
                ref={imgRef}
              />
              <button className="bttn mt-3" onClick={() => handleClick()}>
                Recognise
              </button>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          {suggestions
            ? suggestions.map((plant) => {
                return <Plantcard plant={plant} />;
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Identify;
