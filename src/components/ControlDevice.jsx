import {
  HeatPumpRounded,
  LightbulbRounded,
  LightSharp,
  WindPower,
} from "@mui/icons-material";
import { Card, Spin, Switch } from "antd";
import axios from "axios";
import React, { useState } from "react";

function renderDeviceIcon(deviceType) {
  switch (deviceType) {
    case "led":
      return <LightbulbRounded />;
    case "fan":
      return <WindPower />;
    case "coi":
      return <HeatPumpRounded />;
    case "lamp":
      return <LightSharp />;
    default:
      return <LightbulbRounded />;
  }
}
export const ControlDevice = (props) => {
  const { deviceName, status, deviceId } = props;
  const [state, setState] = useState(status);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setState(!state);
    setIsLoading(true);
    await axios
      .post("http://localhost:3000/device/relay", {
        deviceId: deviceId,
        status: state ? 0 : 1,
      })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log(err);
      });
  };

  return (
    <Card>
      <div className="col-span-1" onClick={handleOnClick}>
        <div className="bg-white rounded-lg p-6 w-full">
          {isLoading ? (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-4`}
            >
              <Spin size="large" className="mb-4" />
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  state
                    ? "shadow-lg shadow-gray-300 bg-blue-400 text-white"
                    : "bg-gray-200"
                }`}
              >
                {renderDeviceIcon(deviceName)}
              </div>
              <Switch onChange={(e) => setState(e)} defaultValue={state} />
            </div>
          )}
          <p className="text-xl font-bold">{deviceName}</p>
        </div>
      </div>
    </Card>
  );
};
