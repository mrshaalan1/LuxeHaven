"use client";

import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import Navbar from "../components/NavBar";
import { DatePicker, Space } from "antd";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { Carousel, Rate, Button, message } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

function Reserve() {
  const [roomType, setRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const [spa, setSpa] = useState(false);
  const [gym, setGym] = useState(false);

  const onRoomTypeChange = (e: any) => {
    setRoomType(e.target.value);
  };

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/rooms/room")
      .then((response) => {
        setRooms(response.data.room);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const disabledDate = (current: any) => {
    return (
      current &&
      (current < dayjs().endOf("day") ||
        current < dayjs(checkInDate).add(1, "day"))
    );
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Reservation Successful!",
    });
  };

  const onReserve = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage!");
      return;
    }

    axios
      .post("http://localhost:3000/api/reservation/new", {
        roomType: roomType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        spa: spa,
        gym: gym,
        token: token,
      })

      .then((response) => {
        console.log("Reservation success", response.data);
        message.success("Reservation Successful");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          message.error("User already reserved a room");
        } else {
          console.error("There was an error!", error);
        }
      });
  };

  const onSpaChange = (e: any) => {
    setSpa(e.target.checked);
  };

  const onGymChange = (e: any) => {
    setGym(e.target.checked);
  };
  const [rooms, setRooms] = useState<IRoom[]>([]);

  interface IRoom {
    RoomId: number;
    RoomType: string;
    RoomDescription: string;
    RoomPicUrl: string;
    RoomNumber: number;
    RoomPrice: number;
    RoomRentalFrom: string;
    RoomRentalTo: string;
    RoomRating: number;
    __v: number;
  }

  return (
    <div className="Reserve bg-sky">
      <Navbar />
      <p className="text-5xl mt-10 text-center font-extrabold mb-4 text-primary-dark">
        {" "}
        RESERVATION
      </p>

      <ul className="grid md:grid-cols-3 xs:grid-cols-1 md:gap-6 xs:gap-5">
        <li className="px-4 mt-7 justify-center">
          <label className="font-bold mb-2 text-primary">ROOM TYPE</label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-100"
            id="room-type"
            onChange={onRoomTypeChange}
          >
            {rooms.map((room) => (
              <option key={room.RoomId} value={room.RoomType}>
                {room.RoomType}
              </option>
            ))}
          </select>

          <label className="font-bold mb-2 text-primary pt-10">
            Check-In/ Check-Out Date
          </label>
          <Space
            direction="vertical"
            size={12}
            className="felx object-none justify-center w-full"
          >
            <RangePicker
              disabledDate={disabledDate}
              className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-100 text-2xl"
              onCalendarChange={(dates) => {
                if (dates) {
                  setCheckInDate(dates[0]);
                  setCheckOutDate(dates[1]);
                }
              }}
            />
          </Space>
          <Checkbox
            className="text-xl text-gray-700 font-sans"
            checked={spa}
            onChange={onSpaChange}
          >
            Spa Service
          </Checkbox>

          <Checkbox
            className="text-xl text-gray-700 font-sans"
            checked={gym}
            onChange={onGymChange}
          >
            Gym Service
          </Checkbox>
          <form>
            <>
              {contextHolder}
              <Button
                type="primary"
                onClick={onReserve}
                className="bg-sand hover:bg-primary text-white font-bold text-xl py-2 px-4 rounded h-12 w-32 mt-10 mb-96 mr-8"
              >
                Reserve
              </Button>
            </>
          </form>
        </li>
        <li className="col-span-2 mt-10">
          <Carousel autoplay className=" mx-20">
            {rooms.map(
              (room) =>
                room.RoomType === roomType && (
                  <>
                    <Image
                      src={room.RoomPicUrl}
                      alt={room.RoomType}
                      className="w-full h-96 object-cover rounded-lg"
                      height={500}
                      width={500}
                    />
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={room.RoomRating}
                      className="pt-4"
                    />
                    <p className=" p-5 font-sans text-lg">
                      {room.RoomDescription}
                    </p>
                  </>
                )
            )}
          </Carousel>
        </li>
      </ul>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Reserve;
