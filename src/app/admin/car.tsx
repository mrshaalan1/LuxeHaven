"use client";

import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import axios from "axios";
import EditCar from "./EditDeleteCar"

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

const FormDisabledDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const [car, setCar] = React.useState({
    CarName: "",
    CarDescription: "",
    CarBrand: "",
    CarPic: "",
    CarPrice: "",
  });
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        callback(reader.result.replace("data:", "").replace(/^.+,/, ""));
      } else {
        callback("");
      }
    });
    reader.readAsDataURL(img);
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
        car.CarPic = url;
      });
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const ERROR = () => {
    messageApi.open({
      type: "error",
      content: "Unknown Error occured",
    });
  };
  const onCreate = async () => {
    axios
      .post("/api/cars/car/add", car)
      .then((response) => {
        console.log("Car Created Successfully");
        message.success("Car Created Successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          message.error(`Car Created failed: ${error.response.data.error}`);
        } else {
          ERROR();
        }
      });
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
        <h1 className="text-4xl flex justify-center items-center font-bold py-5 pb-5 ">
          Add New Car
        </h1>
        <Form layout="horizontal" className="w-5/6 text-xl pt-10">
          <label
            className="flex justify-center items-center text-zinc-100 pb-3"
            style={{ fontSize: 28 }}
          >
            Car Picture
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
                  src={`data:image/png;base64,${imageUrl}`}
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
            <label className="text-zinc-100" style={{ fontSize: 26 }}>
              Car name
            </label>
            <Input
              className="text-xl"
              value={car.CarName}
              onChange={(e) => setCar({ ...car, CarName: e.target.value })}
            />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{ fontSize: 26 }}>
              Car Description
            </label>
            <Input
              className="text-xl"
              value={car.CarDescription}
              onChange={(e) =>
                setCar({ ...car, CarDescription: e.target.value })
              }
            />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{ fontSize: 26 }}>
              Car Brand
            </label>
            <Input
              className="text-xl"
              value={car.CarBrand}
              onChange={(e) => setCar({ ...car, CarBrand: e.target.value })}
            />
          </div>
          <div className="py-3 text-2xl">
            <label className="text-zinc-100" style={{ fontSize: 26 }}>
              Car Price
            </label>
            <Input
              className="text-xl"
              value={car.CarPrice}
              onChange={(e) => setCar({ ...car, CarPrice: e.target.value })}
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
      <EditCar/>
    </div>
  );
};

export default () => <FormDisabledDemo />;
