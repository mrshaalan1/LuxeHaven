"use client";

import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Upload, message } from "antd";
import axios from "axios";

const FormDisabledDemo: React.FC = () => {
  const [admin, setAdmin] = React.useState({
    Email: "",
    Password: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const ERROR = () => {
    messageApi.open({
      type: "error",
      content: "Unknown Error occured",
    });
  };
  const onCreate = async () => {
    axios
      .post("/api/users/addAdmin", admin)
      .then((response) => {
        console.log("Admin Created Successfully");
        message.success("Admin Created Successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          message.error(`Admin Creation Failed: ${error.response.data.error}`);
        } else {
          ERROR();
        }
      });
  };

  return (
    <div className="pt-10 pb-32">
      <div className="bg-primary flex flex-col items-center lg:w-2/3 mx-auto lg:pt-10 lg:rounded-2xl">
        <h1 className="text-4xl flex justify-center items-center font-bold py-5 pb-5 ">
          Add New Admin
        </h1>
        <Form layout="horizontal" className="w-5/6 text-xl pt-10">
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{ fontSize: 26 }}>
              Admin Email
            </label>
            <Input
              className="text-xl"
              onChange={(e) => setAdmin({ ...admin, Email: e.target.value })}
            />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{ fontSize: 26 }}>
              Admin Password
            </label>
            <Input
              className="text-xl"
              type="Password"
              onChange={(e) => setAdmin({ ...admin, Password: e.target.value })}
            />
          </div>

          <Form.Item className="flex justify-center items-center py-5">
            <Button
              onClick={onCreate}
              type="primary"
              htmlType="submit"
              className="bg-green-500 text-base"
              style={{ fontSize: 28 }}
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default () => <FormDisabledDemo />;
