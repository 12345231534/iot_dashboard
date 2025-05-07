import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select, Table } from "antd";
import { data } from "../MOCK_DATA.js";
import axios from "axios";
const { Option } = Select;
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Thiết bị",
    dataIndex: "deviceId",
    key: "deviceId",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
    render: (value) => <span>{value ? "on" : "off"}</span>,
  },
  {
    title: "Thời gian",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => a.device - b.device,
    sortDirection: ["ascend", "desend"],
    key: "time",
  },
];

export const History = () => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("device");
  const [data, setData] = useState([]);
  const [totalRecods, setTotalRecods] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: pagination.current,
          limit: pagination.pageSize,
        };
        if (searchText && searchType) {
          params[searchType] = searchText;
        }
        const response = await axios.get("http://localhost:3000/device", {
          params,
        });
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
            searchType === "deviceId"
              ? "thiết bị"
              : searchType === "status"
              ? "trạng thái"
              : "thời gian"
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
          <Option value="deviceId">Tìm kiếm theo thiết bị</Option>
          <Option value="status">Tìm kiếm theo trạng thái</Option>
          <Option value="createdAt">Tìm kiếm theo thời gian</Option>
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
