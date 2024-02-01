"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input, Form } from "antd";
import type { ColumnType } from "antd/lib/table/interface";

import axios from "axios";
import Swal from "sweetalert2";

interface DishObject {
  dish: {
    _id: number;
    RestaurantItempPic: string;
    RestaurantItemName: string;
    RestaurantItemIngredient: string;
    RestaurantItemType: string;
    RestaurantItemPrice: number;
    cachedImagePath?: string;
  }[];
}

interface DataType {
  key: string | number;
  DishId: { $id: string };
  DishName: any;
}

const FormDisabledDemo: React.FC = () => {
  const [dishs, setDishs] = useState<DishObject | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState<DishData | null>(null);
  const [editData, setEditData] = useState<DishData | null>(null);

  interface DishData {
    _id?: string;
    RestaurantItemName?: string;
    RestaurantItemIngredient?: string;
    RestaurantItemType?: string;
    RestaurantItemPrice?: string;
  }

  const columns: ColumnType<DataType>[] = [
    {
      title: "Dish ID",
      dataIndex: "DishId",
      key: "DishId",
    },
    {
      title: "Dish Name",
      dataIndex: "DishName",
      key: "DishName",
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
  const handleDelete = async (DishId: string) => {
    try {
      await axios.delete("/api/menu/dish/delete", {
        data: {
          DishId,
        },
      });
      message.success("Dish Deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Dish Deletion failed!!");
      console.error("Error deleting dish:", error);
    }
  };
  
  const handleSubmit = async (values: any) => {
    try {
      //console.log(values);

      const res = await axios.post("/api/menu/dish/edit", {
        RestaurantItemId: editData?._id,
        ...values,
      });
      //console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Dish Updated Successfully",
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
  const handleEdit = async (DishId: string) => {
    try {
      const response = await axios.post("/api/menu/dish/getDish", {
        DishId,
      });

      setData(response.data.dish);
      setEditData(response.data.dish);
    } catch (error) {
      console.error("Error fetching dish details for editing:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/menu/dish");
      const fetchedData = await response.json();
      setDishs(fetchedData);

      setDishs(fetchedData);
      const uniqueBrands = Array.from(
        new Set(
          fetchedData.dish.map(
            (dish: { RestaurantItemType: string }) => dish.RestaurantItemType
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
              dataSource={dishs?.dish.map((dish) => ({
                key: dish._id,
                DishId: dish._id,
                DishName: dish.RestaurantItemName,
              }))}
              pagination={{
                current: currentPage,
                pageSize,
                onChange: onChangePage,
                total: dishs?.dish.length,
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
            <span>{editData?._id}</span>
            <Form.Item name="RestaurantItemName" className="flex flex-col">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Dish Name
                </label>

                <Input
                  className="text-xl"
                  value={data?.RestaurantItemName}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RestaurantItemName: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="RestaurantItemIngredient">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Ingredient
                </label>
                <Input
                  className="text-xl"
                  value={data?.RestaurantItemIngredient}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RestaurantItemIngredient: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="RestaurantItemType" className="flex flex-col">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Dish Type
                </label>

                <Input
                  className="text-xl"
                  value={data?.RestaurantItemType}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RestaurantItemType: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="RestaurantItemPrice">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Dish Price
                </label>
                <Input
                  className="text-xl"
                  value={data?.RestaurantItemPrice}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RestaurantItemPrice: event.target.value,
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
