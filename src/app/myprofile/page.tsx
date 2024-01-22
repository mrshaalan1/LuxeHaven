"use client";

import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Button, Form, Input, Upload, message, Select } from "antd";

import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const { Option } = Select;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function myprofile() {
  interface UserData {
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
  }
  useEffect(() => {
    getUserDetails();
  }, []);
  
  const [data, setData] = useState<UserData | null>(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data);
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);

      const res = await axios.post("/api/users/edit", {
        ...values,
        profilepic: imageUrl,
      });
      console.log(res);

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, color: "white" }}>Upload</div>
    </div>
  );
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80, color: "white" }}>
        <Option value="961">+961</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="bg-sky">
      <Navbar />

      <div className=" text-xl lg:pt-10 min-h-screen">
        <div className="bg-primary flex flex-col items-center lg:w-2/3 mx-auto lg:pt-10 lg:rounded-2xl">
          <Form
            onFinish={handleSubmit}
            initialValues={data || {}}
            layout="horizontal"
            className="w-5/6 text-xl "
          >
            <Form.Item
              name="avatar"
              className="flex justify-center items-center"
            >
              <label className="text-3xl flex justify-center items-center text-zinc-100" style={{fontSize: 30}}>
                Profile Picture
              </label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="flex justify-center items-center avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item name="FirstName" className="flex flex-col">
              <div className="flex flex-col">
                <label className="text-3xl text-zinc-100" style={{fontSize: 26}}>First Name</label>

                <Input
                  className="text-xl"
                  value={data?.FirstName}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      FirstName: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item name="LastName">
              <div className="flex flex-col">
                <label className="text-3xl text-zinc-100" style={{fontSize: 26}}>Last Name</label>
                <Input
                  className="text-xl"
                  value={data?.LastName}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      LastName: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="OldPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
              ]}
              hasFeedback
            >
              <div className="flex flex-col">
                <label className="text-3xl text-zinc-100" style={{fontSize: 26}}>Old Password</label>
                <Input.Password className="text-xl" />
              </div>
            </Form.Item>
            <Form.Item
              name="NewPassword"
              rules={[
                {
                  message: "Please input your new password!",
                  min: 8,
                },
                
              ]}
              style={{fontSize: 40}}
              hasFeedback
            >
              <div className="flex flex-col">
                <label className="text-3xl text-zinc-100" style={{fontSize: 26}}>New Password</label>
                <Input.Password className="text-xl" />
              </div>
            </Form.Item>

            <Form.Item
              name="ConfirmPassword"
              dependencies={["NewPassword"]}
              hasFeedback
              rules={[
                {
                  message: "Please confirm your password!",
                  min: 8,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("NewPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              style={{fontSize: 40}}
            >
              <div className="flex flex-col">
                <label className="text-zinc-100" style={{fontSize: 26}}>
                  Confirm Password
                </label>
                <Input.Password className="text-xl" />
              </div>
            </Form.Item>
            <Form.Item
              name="PhoneNumber"
              rules={[{ message: "Please input your phone number!" }]}
            >
              <div className="flex flex-col">
                <label className="text-zinc-100" style={{fontSize: 26}}>Phone Number</label>
                <Input
                  className="text-2xl text-zinc-100"
                  addonBefore={prefixSelector}
                  style={{ width: "100%", color: "white", fontSize: 40 }}
                  value={data?.PhoneNumber}
                  onChange={(event) =>
                    setData({ ...data, PhoneNumber: event.target.value })
                  }
                  
                />
              </div>
            </Form.Item>
            <Form.Item className="flex justify-center items-center w-auto h-auto">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 text-lg px-5 pb-7"
                style={{fontSize: 28}}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
