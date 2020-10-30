import React, { useState } from "react";
import "./styles.scss";

const IotForm = ({ socket }) => {
  const [temp, setTemp] = useState(),
    [hum, setHum] = useState(),
    [moist, setMoist] = useState();

  const setTemperature = () => {
    socket.emit("autoTemp", { temp });
  };

  const setHumidity = () => {
    socket.emit("autoHum", { hum });
  };

  const setMoisture = () => {
    socket.emit("autoMoist", { moist });
  };

  return (
    <div className="iot_form">
      <div className="iot_form_title">
        <h4>Environment setup</h4>
      </div>
      <div className="iot_form_field">
        <label>Temperature in Celcius </label>
        <div>
          <input
            type="number"
            id="temperature"
            autoComplete="off"
            placeholder="set temperature"
            onChange={(e) => setTemp(parseInt(e.target.value))}
          />
          <button
            onClick={() => {
              setTemperature();
            }}
          >
            SET
          </button>
        </div>
      </div>
      <div className="iot_form_field">
        <label>Air humidity in % </label>
        <div>
          <input
            type="text"
            id="airHumidity"
            autoComplete="off"
            placeholder="Set air humidity"
            onChange={(e) => setHum(parseInt(e.target.value))}
          />
          <button onClick={() => setHumidity()}>SET</button>
        </div>
      </div>
      <div className="iot_form_field">
        <label>Soil humidity in 1-10 scale </label>
        <div>
          <input
            type="text"
            id="soilHumidity"
            autoComplete="off"
            placeholder="set soil humidity"
            onChange={(e) => setMoist(parseInt(e.target.value))}
          />
          <button
            onClick={() => {
              setMoisture();
            }}
          >
            SET
          </button>
        </div>
      </div>
    </div>
  );
};

export default IotForm;
