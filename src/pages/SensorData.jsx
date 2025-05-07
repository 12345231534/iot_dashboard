import React, { useEffect, useState } from "react";
import { Card, Input, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
const columns = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nhiệt độ",
    dataIndex: "temperature",
    key: "temperature",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Độ ẩm",
    dataIndex: "humidity",
    key: "humidity",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Ánh sáng",
    dataIndex: "light",
    key: "light",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
  },
  {
    title: "Độ bụi",
    dataIndex: "dust",
    key: "dust",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
  },
  {
    title: "Tốc độ gió",
    dataIndex: "wind",
    key: "wind",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
  },
  {
    title: "Thời gian",
    dataIndex: "createAt",
    key: "createAt",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
  },
];

export const SensorData = () => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("temperature");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [totalRecods, setTotalRecods] = useState(0);
  console.log(searchText, searchType);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: pagination.current,
          limit: pagination.pageSize,
        };

        if (searchText && searchType) {
          const floatFields = [
            "temperature",
            "humidity",
            "light",
            "dust",
            "wind",
          ];
          params[searchType] = floatFields.includes(searchType)
            ? parseFloat(searchText)
            : searchText;
        }
        const response = await axios.get("http://localhost:3000/sensor", {
          params,
        });
        console.log("response", response.data);
        setData(response.data.data);
        setTotalRecods(response.data.pagination.totalItems);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pagination.current, pagination.pageSize, searchText, searchType]);
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  return (
    <Card>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Input
          placeholder={`Tìm kiếm theo ${
            searchType === "temperature"
              ? "nhiệt độ"
              : searchType === "humidity"
              ? "độ ẩm"
              : searchType === "light"
              ? "ánh sáng"
              : searchType === "dust"
              ? "độ bụi"
              : searchType === "wind"
              ? "tốc độ gió"
              : searchType === "createAt"
          }...`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          value={searchType}
          onChange={setSearchType}
          style={{ width: 200 }}
        >
          <Option value="temperature">Tìm kiếm theo nhiệt độ</Option>
          <Option value="humidity">Tìm kiếm theo độ ẩm</Option>
          <Option value="light">Tìm kiếm theo ánh sáng</Option>
          <Option value="dust">Tìm kiếm độ bụi</Option>
          <Option value="wind">Tìm kiếm theo tốc độ gió</Option>
          <Option value="createAt">Tìm kiếm theo thời gian</Option>
        </Select>
      </div>
      <Table
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: totalRecods,
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize });
          },
        }}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
      />
    </Card>
  );
};
