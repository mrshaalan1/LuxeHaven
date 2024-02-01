"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input, Form } from "antd";
import type { ColumnType } from "antd/lib/table/interface";

import axios from "axios";
import Swal from "sweetalert2";

interface RoomObject {
  room: {
    _id: number;
    RoomType: string;
    RoomDescription: string;
    RoomNumber: string;
    RoomPrice: number;
  }[];
}

interface DataType {
  key: string | number;
  RoomId: { $id: string };
  RoomType: any;
}

const FormDisabledDemo: React.FC = () => {
  const [rooms, setRooms] = useState<RoomObject | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState<RoomData | null>(null);
  const [editData, setEditData] = useState<RoomData | null>(null);

  interface RoomData {
    _id?: string;
    RoomType?: string;
    RoomDescription?: string;
    RoomNumber?: string;
    RoomPrice?: string;
  }

  const columns: ColumnType<DataType>[] = [
    {
      title: "Room ID",
      dataIndex: "RoomId",
      key: "RoomId",
    },
    {
      title: "Room Type",
      dataIndex: "RoomType",
      key: "RoomType",
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
  //TODO:HEHE
  const handleDelete = async (RoomId: string) => {
    try {
      await axios.delete("/api/rooms/delete", {
        data: {
            RoomId,
        },
      });
      message.success("Room Deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Room Deletion failed!!");
      console.error("Error deleting Room:", error);
    }
  };
  //TODO:HEE
  const handleSubmit = async (values: any) => {
    try {
      //console.log(values);

      const res = await axios.post("/api/rooms/edit", {
        RoomId: editData?._id,
        ...values,
      });
      //console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Room Updated Successfully",
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
  const handleEdit = async (RoomId: string) => {
    try {
      const response = await axios.post("/api/rooms/getRoom", {
        RoomId,
      });

      setData(response.data.room);
      setEditData(response.data.room);
    } catch (error) {
      console.error("Error fetching room details for editing:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/rooms");
      const fetchedData = await response.json();
      setRooms(fetchedData);

      setRooms(fetchedData);
      const uniqueBrands = Array.from(
        new Set(
          fetchedData.room.map(
            (room: { RoomNumber: string }) => room.RoomNumber
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
              dataSource={rooms?.room.map((room) => ({
                key: room._id,
                RoomId: room._id,
                RoomType: room.RoomType,
              }))}
              pagination={{
                current: currentPage,
                pageSize,
                onChange: onChangePage,
                total: rooms?.room.length,
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
            <Form.Item name="RoomType" className="flex flex-col">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Room Type
                </label>

                <Input
                  className="text-xl"
                  value={data?.RoomType}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RoomType: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="RoomDescription">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Room Description
                </label>
                <Input
                  className="text-xl"
                  value={data?.RoomDescription}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RoomDescription: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="RoomNumber" className="flex flex-col">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Room Number
                </label>

                <Input
                  className="text-xl"
                  value={data?.RoomNumber}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RoomNumber: event.target.value,
                    };
                    setData(updatedData);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="RoomPrice">
              <div className="flex flex-col">
                <label
                  className="text-3xl text-zinc-100"
                  style={{ fontSize: 26 }}
                >
                  Room Price
                </label>
                <Input
                  className="text-xl"
                  value={data?.RoomPrice}
                  onChange={(event) => {
                    const updatedData = {
                      ...data,
                      RoomPrice: event.target.value,
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
