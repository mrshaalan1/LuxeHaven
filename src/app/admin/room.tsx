"use client";

import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, message } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
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

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const FormDisabledDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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
      <div style={{ marginTop: 8, color: "white" }}>Upload</div>
    </div>
  );
  return (
    
    <div className="pt-10 pb-32">
      <div className="bg-primary flex flex-col items-center lg:w-2/3 mx-auto lg:pt-10 lg:rounded-2xl">
      <h1 className="text-4xl flex justify-center items-center font-bold py-5 pb-5 ">Add New Room</h1>
        <Form layout="horizontal" className="w-5/6 text-xl pt-10">
          <label className="flex justify-center items-center text-zinc-100 pb-3" style={{fontSize: 28}}>
            Room Picture
          </label>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            className="flex justify-center items-center"
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="flex justify-center items-center  avatar-uploader"
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
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{fontSize: 26}}>Room name</label>
            <Input className="text-xl" />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{fontSize: 26}}>Room Description</label>
            <Input className="text-xl" />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{fontSize: 26}}>Room Type</label>
            <Input className="text-xl" />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{fontSize: 26}}>Room Price</label>
            <Input className="text-xl" />
          </div>

          <Form.Item className="flex justify-center items-center py-5">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 text-base"
                style={{fontSize: 28}}
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
