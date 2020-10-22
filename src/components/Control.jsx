import React, { useState, useEffect } from "react";
import { RiPlantFill } from "react-icons/ri";
import Switch from "react-switch";
import { useRecoilState } from "recoil";
import { envData } from "../recoilState/atoms";

const Control = ({ socket }) => {
  const [manual, setManual] = useState({
    light: false,
    water: false,
    heat: false,
    fan: false,
  });
  const [data, setData] = useRecoilState(envData);

  const handleSwitch = (id) => {
    console.log(manual[id]);
    setManual({ ...manual, [id]: !manual[id] });
    if (!manual[id]) {
      socket.emit(`${id}`, { state: 0 });
    } else {
      socket.emit(`${id}`, { state: 1 });
    }
  };
  useEffect(() => {
    socket.on("connected", (connData) => {
      const { currentTemp, currentHum, currentMoist } = connData;

      setData({ currentTemp, currentHum, currentMoist });
    });
    socket.on("temp", ({ currentTemp }) => {
      console.log(data);
      setData({ ...data, currentTemp });
    });
    socket.on("hum", ({ currentHum }) => {
      setData({ ...data, currentHum });
    });
    socket.on("moist", ({ currentMoist }) => {
      setData({ ...data, currentMoist });
    });
  }, [data, setData, socket]);

  return (
    <div className="control">
      <div className="control_data">
        <div>
          <span>Temperature </span>
          <span className="measure">{data.currentTemp}*C</span>
        </div>{" "}
        <div>
          <span>Air humidity</span>{" "}
          <span className="measure">{data.currentHum}%</span>{" "}
        </div>{" "}
        <div>
          <span>Soil moisture</span>{" "}
          <span className="measure">{data.currentMoist}</span>
        </div>
      </div>
      <div className="control_display">
        <RiPlantFill color="#00A86B" size="15em" />
      </div>
      <div className="control_manual">
        <div>
          <div>
            <span>Water</span>
            <Switch
              checked={manual.water}
              onChange={(e, i, id) => {
                handleSwitch(id);
              }}
              onColor="#218B8F"
              onHandleColor="#218B8F"
              height={20}
              width={50}
              className="react-switch"
              id="water"
            />
          </div>
          <div>
            <span>Light</span>
            <Switch
              checked={manual.light}
              onChange={(e, i, id) => {
                handleSwitch(id);
              }}
              onColor="#218B8F"
              onHandleColor="#218B8F"
              height={20}
              width={50}
              className="react-switch"
              id="light"
            />
          </div>
        </div>

        <div>
          <div>
            <span>Heat</span>
            <Switch
              checked={manual.heat}
              onChange={(e, i, id) => {
                handleSwitch(id);
              }}
              onColor="#218B8F"
              onHandleColor="#218B8F"
              height={20}
              width={50}
              className="react-switch"
              id="heat"
            />
          </div>
          <div>
            <span>Fan</span>
            <Switch
              checked={manual.fan}
              onChange={(e, i, id) => {
                handleSwitch(id);
              }}
              onColor="#218B8F"
              onHandleColor="#218B8F"
              height={20}
              width={50}
              className="react-switch"
              id="fan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;
