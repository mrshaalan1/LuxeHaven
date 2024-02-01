"use client";

import { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
import { message, Button, Checkbox } from "antd";
import { DatePicker, Space } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs, { Dayjs } from "dayjs";
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { Carousel } from "antd";
import { useParams } from "next/navigation";

const { RangePicker } = DatePicker;

export default function Page() {
  interface Room {
    _id: number;
    RoomType: string;
    RoomDescription: string;
    RoomPic: string;
    RoomNumber: number;
    RoomPrice: number;
    RoomRentalFrom: string;
    RoomRentalTo: string;
    RoomRating: number;
    __v: number;
    cachedImagePath?: string;
  }

  const { id } = useParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomType, setRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const [spa, setSpa] = useState(false);
  const [gym, setGym] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string | null>(null);

  const onCheckAvailability = async () => {
    try {
      const selectedRoom = rooms.find((room) => room.RoomType === roomType);

      if (!selectedRoom) {
        console.error("No room selected!");
        return;
      }
      const response = await axios.post("/api/reservation/availability", {
        RoomId: selectedRoom._id,
        reservationType: "room",
        checkInDate,
        checkOutDate,
      });

      setStatus(response.data.status);
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  const calculateTotal = () => {
    const selectedRoom = rooms.find((room) => room.RoomType === roomType);

    if (selectedRoom && checkInDate && checkOutDate) {
      const numberOfDays = dayjs(checkOutDate).diff(checkInDate, "days");
      const roomCost = selectedRoom.RoomPrice * numberOfDays;
      const spaCost = spa ? 25 : 0;
      const gymCost = gym ? 10 : 0;

      const totalCost = roomCost + spaCost + gymCost;
      setTotal(totalCost);
    }
  };
  useEffect(() => {
    calculateTotal();
  }, [roomType, checkInDate, checkOutDate, spa, gym]);

  const onRoomTypeChange = (e: any) => {
    setRoomType(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log(id);

        const response = await axios.post(`/api/reservation/getReservation`, {
          ReservationId: id,
        });

        const reservationDetails = response.data;
        //console.log(reservationDetails.reservation);

        // Rest of your data fetching logic...
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchData();
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/rooms")
      .then((response) => {
        if (Array.isArray(response.data.room)) {
          setRooms(response.data.room);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const disabledDate = (current: any) => {
    return (
      current &&
      (current < dayjs().startOf("day") || current < dayjs(checkInDate))
    );
  };

  const onUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage!");
        return;
      }
  
      const selectedRoom = rooms.find((room) => room.RoomType === roomType);
  
      if (!selectedRoom) {
        console.error("No room selected!");
        return;
      }
  
      const response = await axios.post("/api/reservation/edit", {
        RoomId: selectedRoom._id,
        roomType: roomType,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        spa: spa,
        gym: gym,
        ReservationId: id, // Pass the reservationId to identify the reservation to be updated
      });
  
      //console.log("Reservation updated", response.data);
  
      Swal.fire({
        icon: "success",
        title: "Reservation Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already reserved a room!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was an error updating the reservation!",
        });
        console.error("There was an error!", error);
      }
    }
  };
  

  const onSpaChange = (e: any) => {
    setSpa(e.target.checked);
  };

  const onGymChange = (e: any) => {
    setGym(e.target.checked);
  };

  return (
    <div className="Reserve bg-sky">
      <Navbar />
      <p className="text-5xl mt-10 text-center font-extrabold mb-4 text-primary-dark">
        {" "}
        EDIT RESERVATION
      </p>

      <ul className="grid md:grid-cols-3 xs:grid-cols-1 md:gap-4 xs:gap-5">
        <li className="px-4 mt-7 justify-center">
          <label className="font-bold mb-2 text-primary text-xl">
            ROOM TYPE
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-100 text-lg"
            id="room-type"
            onChange={onRoomTypeChange}
          >
            {rooms.map((room) => (
              <option key={room._id} value={room.RoomType}>
                {room.RoomType}
              </option>
            ))}
          </select>

          <label className="font-bold mb-2 text-primary pt-10 text-xl">
            Check-In/ Check-Out Date
          </label>
          <Space
            direction="vertical"
            size={12}
            className="felx object-none justify-center w-full text-lg"
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
            className="text-xl font-medium text-gray-700 font-sans"
            checked={spa}
            onChange={onSpaChange}
          >
            Spa Service
          </Checkbox>

          <Checkbox
            className="text-xl font-medium text-gray-700 font-sans"
            checked={gym}
            onChange={onGymChange}
          >
            Gym Service
          </Checkbox>
          <div className="w-40">
            <p className="text-xl font-medium text-black mt-5 bg-zinc-200 ">
              {" "}
              &nbsp;&nbsp;&nbsp; Total: ${total}
            </p>
          </div>
          <div className="w-48">
            <p
              className={`text-xl font-medium text-black mt-5 bg-zinc-200 ${
                status === "Available" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status || "Status: "}{" "}
              {/* Display status, or "Status: " if blank */}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="primary"
              onClick={onCheckAvailability}
              className="bg-sand hover:bg-primary text-white font-bold text-xl py-2 px-4 rounded h-12 w-72 mt-10 mr-8"
            >
              Check Availability
            </Button>
          </div>
          <form>
            <>
              {contextHolder}
              <div className="flex justify-center items-center">
                <Button
                  type="primary"
                  onClick={onUpdate}
                  className={`bg-sand hover:bg-primary text-white font-bold text-xl py-2 px-4 rounded h-12 w-72 mt-10 lg:mb-96 mr-8 ${
                    status !== "Available"
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={status !== "Available"} // Disable the Reserve button if the status is not available
                >
                  Update Reservation
                </Button>
              </div>
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
                      src={
                        room.cachedImagePath ? `${room.cachedImagePath}` : ``
                      }
                      alt={room.RoomType}
                      className="w-full h-96 object-cover rounded-lg"
                      height={500}
                      width={500}
                    />
                    <div className="bg-primary rounded-full text-zinc-200 text-lg uppercase font-bold p-2 shadow-md text-center absolute top-2 right-2">
                      <span>{room.RoomPrice}$/ Day</span>
                    </div>{" "}
                    <div className="pl-5 py-5 rounded-2xl bg-primary-dark mt-10">
                      <p className="text-zinc-100 font-bold text-xl">
                        Description:
                      </p>
                      <p className="text-zinc-200 font-medium text-lg py-10">
                        {room.RoomDescription}
                      </p>
                    </div>
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
