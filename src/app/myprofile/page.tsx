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
    message.error("Image must smaller than 2MB!");
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
  // Initialize the state with the UserData interface
  const [data, setData] = useState<UserData | null>(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="961">+961</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="bg-sky">
      <Navbar />

      <div className="justify-center w-full text-xl pt-10">
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 800 }}
            className="px-4 text-xl"
          >
            <Form.Item label="Profile">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader "
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item name="First name" label="First Name">
              <Input
                className="text-xl"
                value={data?.FirstName}
                onChange={(event) =>
                  setData({ ...data, FirstName: event.target.value })
                }
              />{" "}
            </Form.Item>

            <Form.Item name="Last name" label="Last Name">
              <Input
                className="text-xl"
                value={data?.LastName}
                onChange={(event) =>
                  setData({ ...data, LastName: event.target.value })
                }
              />{" "}
            </Form.Item>
            <Form.Item
              name="Old password"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                  min: 8,
                },
              ]}
              hasFeedback
            >
              <Input.Password className="text-xl" />
            </Form.Item>
            <Form.Item
              name="New password"
              label="New Password"
              rules={[
                {
                  message: "Please input your new password!",
                  min: 8,
                },
              ]}
              hasFeedback
            >
              <Input.Password className="text-xl" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["New password"]}
              hasFeedback
              rules={[
                {
                  message: "Please confirm your password!",
                  min: 8,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("New password") === value) {
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
            >
              <Input.Password className="text-xl" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ message: "Please input your phone number!" }]}
            >
              <Input
                className="text-xl"
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                value={data?.PhoneNumber}
                onChange={(event) =>
                  setData({ ...data, PhoneNumber: event.target.value })
                }
              />{" "}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary m-5"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </>
      </div>
      <div className="pt-56">
        <Footer />
      </div>
    </div>
  );
}
