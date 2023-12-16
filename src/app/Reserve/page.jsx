"use client";

import React from "react";
import { Checkbox } from "antd";
import Navbar from "../components/NavBar";
import { DatePicker, Space } from "antd";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { Carousel } from "antd";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const { RangePicker } = DatePicker;
function Reserve() {
  const [roomType, setRoomType] = React.useState("");
  const onRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };
  return (
    <div className="Reserve bg-sky">
      <Navbar />
      <p className="text-5xl text-center font-extrabold mb-4 text-primary-dark">
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
            <option value="PoolRoom">Pool Room</option>
            <option value="SuperiorRoom">Superior Room</option>
            <option value="DeluxRoom">Delux Room</option>
            <option value="KingRoom">King Room</option>
          </select>

          <label className="font-bold mb-2 text-primary pt-10">
            Check-In/ Check-Out Date
          </label>
          <Space
            direction="vertical"
            size={12}
            className="felx object-none justify-center w-full"
          >
            <RangePicker className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-100 text-2xl" />
          </Space>
          <Checkbox
            className="text-xl text-gray-700 font-sans"
            onChange={onChange}
          >
            Spa Service
          </Checkbox>
          <Checkbox
            className="text-xl text-gray-700 font-sans"
            onChange={onChange}
          >
            Gym Service
          </Checkbox>
          <form>
            <button className="bg-sand hover:bg-primary text-white font-bold text-xl py-2 px-4 rounded h-12 w-32 mt-10 mb-96 mr-8">
              Reserve
            </button>
          </form>
        </li>
        <li className="col-span-2 mt-10">
          <Carousel autoplay className=" mx-20">
            {roomType === "PoolRoom" && (
              <>
                <Image
                  className="object-cover w-full h-96"
                  src={require("./room service/Room6.png")}
                  alt="slide 1"
                />
                <p className=" p-5 font-sans text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, asperiores iure odit provident obcaecati pariatur eius
                  quasi sit minima ratione perspiciatis natus corrupti, harum
                  qui ullam vel a, aperiam nisi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sapiente, nostrum libero! Odio
                  explicabo harum cupiditate delectus ea consectetur earum
                  accusantium sint in necessitatibus quasi, amet, nihil
                  voluptate doloribus mollitia similique.
                </p>
              </>
            )}
            {roomType === "SuperiorRoom" && (
              <>
                <Image
                  className="object-cover w-full h-96"
                  src={require("./room service/Room5.png")}
                  alt="slide 1"
                />
                                <p className=" p-5 font-sans text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, asperiores iure odit provident obcaecati pariatur eius
                  quasi sit minima ratione perspiciatis natus corrupti, harum
                  qui ullam vel a, aperiam nisi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sapiente, nostrum libero! Odio
                  explicabo harum cupiditate delectus ea consectetur earum
                  accusantium sint in necessitatibus quasi, amet, nihil
                  voluptate doloribus mollitia similique.
                </p>
              </>
            )}
            {roomType === "DeluxRoom" && (
              <>
                <Image
                  className="object-cover w-full h-96"
                  src={require("./room service/Room1.png")}
                  alt="slide 1"
                />
                                <p className=" p-5 font-sans text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, asperiores iure odit provident obcaecati pariatur eius
                  quasi sit minima ratione perspiciatis natus corrupti, harum
                  qui ullam vel a, aperiam nisi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sapiente, nostrum libero! Odio
                  explicabo harum cupiditate delectus ea consectetur earum
                  accusantium sint in necessitatibus quasi, amet, nihil
                  voluptate doloribus mollitia similique.
                </p>
              </>
            )}
            {roomType === "DeluxRoom" && (
              <>
                <Image
                  className="object-cover w-full h-96"
                  src={require("./room service/Room2.png")}
                  alt="slide 1"
                />
                                <p className=" p-5 font-sans text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, asperiores iure odit provident obcaecati pariatur eius
                  quasi sit minima ratione perspiciatis natus corrupti, harum
                  qui ullam vel a, aperiam nisi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sapiente, nostrum libero! Odio
                  explicabo harum cupiditate delectus ea consectetur earum
                  accusantium sint in necessitatibus quasi, amet, nihil
                  voluptate doloribus mollitia similique.
                </p>
              </>
            )}
            {roomType === "KingRoom" && (
              <>
                <Image
                  className="object-cover w-full h-96"
                  src={require("./room service/Room3.png")}
                  alt="slide 1"
                />
                                <p className=" p-5 font-sans text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, asperiores iure odit provident obcaecati pariatur eius
                  quasi sit minima ratione perspiciatis natus corrupti, harum
                  qui ullam vel a, aperiam nisi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sapiente, nostrum libero! Odio
                  explicabo harum cupiditate delectus ea consectetur earum
                  accusantium sint in necessitatibus quasi, amet, nihil
                  voluptate doloribus mollitia similique.
                </p>
              </>
            )}
            {roomType === "KingRoom" && (
              <>
                <Image
                  className="object-cover w-full h-96"
                  src={require("./room service/Room4.png")}
                  alt="slide 1"
                />
                                <p className=" p-5 font-sans text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, asperiores iure odit provident obcaecati pariatur eius
                  quasi sit minima ratione perspiciatis natus corrupti, harum
                  qui ullam vel a, aperiam nisi. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sapiente, nostrum libero! Odio
                  explicabo harum cupiditate delectus ea consectetur earum
                  accusantium sint in necessitatibus quasi, amet, nihil
                  voluptate doloribus mollitia similique.
                </p>
              </>
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
