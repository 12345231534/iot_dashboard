import { Card } from "antd";
import React from "react";

export const Profile = () => {
  return (
    <div>
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label>Họ và tên</label>
            <input
              className="border border-gray-300 mt-1.5 h-8 rounded-md px-3 w-full"
              value="Trần Tuấn Linh"
              type="text"
            />
          </div>
          <div className="col-span-1">
            <label>Mã sinh viên</label>
            <input
              className="border border-gray-300 mt-1.5 h-8 rounded-md px-3 w-full"
              value="B21DCPT145"
              type="text"
            />
          </div>
          <div className="col-span-2">
            <label>Link github</label>
            <input
              className="border border-gray-300 mt-1.5 h-8 rounded-md px-3 w-full"
              value="..."
              type="text"
            />
          </div>
          <div className="col-span-2">
            <label>Link báo cáo </label>
            <input
              className="border border-gray-300 mt-1.5 h-8 rounded-md px-3 w-full"
              type="text"
              value="..."
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
