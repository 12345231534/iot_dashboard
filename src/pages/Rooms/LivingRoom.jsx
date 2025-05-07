import React, { useEffect } from "react";
import { ControlDevice } from "../../components/ControlDevice";
import { BulbOutlined } from "@ant-design/icons";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import MonitorIcon from "@mui/icons-material/Monitor";
import axios from "axios";
export const LivingRoom = () => {
  // const devices = [
  //   {
  //     id: "1",
  //     deviceName: "Đèn",
  //     deviceIcon: <BulbOutlined />,
  //     statusDevice: true,
  //   },
  //   {
  //     id: "2",
  //     deviceName: "Quạt",
  //     deviceIcon: <AirIcon />,
  //     statusDevice: false,
  //   },
  //   {
  //     id: "3",
  //     deviceName: "Điều hòa",
  //     deviceIcon: <AcUnitIcon />,
  //     statusDevice: true,
  //   },
  //   {
  //     id: "4",
  //     deviceName: "Tivi",
  //     deviceIcon: <MonitorIcon />,
  //     statusDevice: false,
  //   },
  // ];
  const [devices, setDevices] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/device/device");

        // console.log("data", response.data.data);
        setDevices(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 ">
      {devices.map((device, index) => (
        <ControlDevice
          key={index}
          deviceId={device.id}
          deviceName={device.name}
          status={device.status}
        />
      ))}
    </div>
  );
};
