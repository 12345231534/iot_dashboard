import { Card, Tabs } from "antd";
import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { LivingRoom } from "./Rooms/LivingRoom";
import axios from "axios";
const TabPane = Tabs.TabPane;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Dardboard = () => {
  const degree = 20;
  const [currentData, setCurrentData] = React.useState({});
  const [topData, setTopData] = React.useState({});
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: [],
  });
  const [chartData2, setChartData2] = React.useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    if (!topData || !Array.isArray(topData) || topData.length === 0) return;

    const labels = topData.map((item, index) => `#${index + 1}`);
    const temperatures = topData.map((item) => item.temperature);
    const humidities = topData.map((item) => item.humidity);
    const lights = topData.map((item) => item.light);
    const dust = topData.map((item) => item.dust);
    const wind = topData.map((item) => item.wind);

    const newChartData = {
      labels,
      datasets: [
        {
          label: "Nhiệt độ (°C)",
          data: temperatures,
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Độ ẩm (%)",
          data: humidities,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Ánh sáng (lux)",
          data: lights,
          borderColor: "gold",
          backgroundColor: "rgba(255, 255, 0, 0.5)",
        },
        {
          label: "Tốc độ gió (%)",
          data: wind,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    const newChartData2 = {
      labels,
      datasets: [
        {
          label: "Độ bụi (°C)",
          data: dust,
          borderColor: "green",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Tốc độ gió (%)",
          data: wind,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    setChartData(newChartData);
    setChartData2(newChartData2);
  }, [topData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sensor/topdata?limit=10"
        );
        console.log("topdata", response.data.data);
        setTopData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sensor/latest?limit=1"
        );
        console.log("datacurrent", response.data.data);
        setCurrentData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log("top", topData);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl text-center ">Nhiệt độ phòng</h1>
              <h2 className="text-center">{currentData.temperature} *C</h2>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-xl text-center">Độ ẩm</h1>
              <h2 className="text-center">{currentData.humidity} %</h2>
            </div>
          </Card>
          <Card>
            <h1 className="text-xl text-center">Ánh sáng</h1>
            <h2 className="text-center">{currentData.light} lux</h2>
          </Card>
          {/* <Card>
            <h1 className="text-xl text-center">Độ bụi</h1>
            <h2 className="text-center">{currentData.dust} μg/m³ </h2>
          </Card> */}
          <Card className={currentData.wind > 60 ? "blink-card" : ""}>
            <h1 className="text-xl text-center">Tốc độ gió</h1>
            <h2 className="text-center">{currentData.wind} km/h</h2>
          </Card>
        </div>
        <div className="grid grid-cols gap-10 ">
          <Line className="w-full" data={chartData} />
          {/* <Line className="w-full" data={chartData2} /> */}
        </div>
      </div>
      <div className="col-span-1 ">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bảng công tắc" key="1">
            <LivingRoom />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
