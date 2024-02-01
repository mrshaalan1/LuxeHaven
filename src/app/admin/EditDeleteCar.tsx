"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input, Form } from "antd";
import type { ColumnType } from "antd/lib/table/interface";

import axios from "axios";
import Swal from "sweetalert2";

interface CarObject {
  car: {
    _id: number;
    CarName: string;
    CarDescription: string;
    CarBrand: string;
    CarPrice: number;
  }[];
}

interface DataType {
  key: string | number;
  CarId: { $id: string };
  CarName: any;
}

const FormDisabledDemo: React.FC = () => {
  const [cars, setCars] = useState<CarObject | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState<CarData | null>(null);
  const [editData, setEditData] = useState<CarData | null>(null);

  interface CarData {
    _id?: string;
    CarName?: string;
    CarDescription?: string;
    CarBrand?: string;
    CarPrice?: string;
  }

  const columns: ColumnType<DataType>[] = [
    {
      title: "Car ID",
      dataIndex: "CarId",
      key: "CarId",
    },
    {
      title: "Car Name",
      dataIndex: "CarName",
      key: "CarName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.key && (
            <>
              <a onClick={() => handleEdit(record.key)}>Edit</a>

              <a onClick={() => handleDelete(record.key)}>Delete</a>
            </>
          )}
        </Space>
      ),
    },
  ];
  const handleDelete = async (CarId: string) => {
    try {
      await axios.delete("/api/cars/car/delete", {
        data: {
            CarId,
        },
      });
      message.success("Car Deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Car Deletion failed!!");
      console.error("Error deleting Car:", error);
    }
  };
  const handleSubmit = async (values: any) => {
    try {
      //console.log(values);

      const res = await axios.post("/api/cars/car/edit", {
        CarId: editData?._id,
        ...values,
      });
      //console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Car Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error Occured",
      });
    }
  };
  const handleEdit = async (CarId: string) => {
    try {
      const response = await axios.post("/api/cars/car/getCar", {
        CarId,
      });

      setData(response.data.car);
      setEditData(response.data.car);
    } catch (error) {
      console.error("Error fetching car details for editing:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cars/car");
      const fetchedData = await response.json();
      setCars(fetchedData);

      setCars(fetchedData);
      const uniqueBrands = Array.from(
        new Set(
          fetchedData.car.map(
            (car: { CarBrand: string }) => car.CarBrand
          )
        )
      ) as string[];
      setTypes(uniqueBrands);
    } catch (error: any) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-10 mb-32">
      <div className="bg-primary flex flex-col items-center lg:w-2/3 mx-auto lg:pt-10 lg:rounded-2xl">
        <h1 className="text-4xl flex justify-center items-center font-bold py-5 pb-5 ">
          Delete Item
        </h1>
        <div className="bg-primary-dark justify-center items-center w-full p-7">
          <div className="text-2xl" style={{ fontSize: 12, height: "400px" }}>
            <Table
              columns={columns}
              dataSource={cars?.car.map((car) => ({
                key: car._id,
                CarId: car._id,
                CarName: car.CarName,
              }))}
              pagination={{
                current: currentPage,
                pageSize,
                onChange: onChangePage,
                total: cars?.car.length,
                itemRender: (current: any, type: any, originalElement: any) => {
                  if (
                    type === "prev" ||
                    type === "next" ||
                    type === "jump-prev" ||
                    type === "jump-next"
                  ) {
                    return React.cloneElement(originalElement, {
                      style: { color: "white" },
                    });
                  }
                  return (
                    <span
                      style={{
                        color: current === currentPage ? "black" : "white",
                      }}
                    >
                      {current}
                    </span>
                  );
                },
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl flex justify-center items-center font-bold py-5 pb-5 ">
          Edit Item
        </h1>
        <div className="bg-primary flex flex-col items-center lg:w-2/3 mx-auto lg:pt-10 lg:rounded-2xl">
          <Form
            onFinish={handleSubmit}
            initialValues={editData || {}}
            layout="horizontal"
            className="w-5/6 text-xl "
          >
            <Form.Item name="CarName" className="flex flex-col">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Car Name
                </label>

                <Input
                  className="text-xl"
                  value={data?.CarName}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      CarName: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="CarDescription">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Description
                </label>
                <Input
                  className="text-xl"
                  value={data?.CarDescription}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      CarDescription: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="CarBrand" className="flex flex-col">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Brand
                </label>

                <Input
                  className="text-xl"
                  value={data?.CarBrand}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      CarBrand: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="CarPrice">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Car Price
                </label>
                <Input
                  className="text-xl"
                  value={data?.CarPrice}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      CarPrice: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item className="flex justify-center items-center w-auto h-auto">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 text-lg px-5 pb-7"
                style={{ fontSize: 28 }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>{" "}
      </div>
    </div>
  );
};

export default () => <FormDisabledDemo />;
