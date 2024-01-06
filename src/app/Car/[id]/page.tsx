"use client";

import Navbar from "../../components/NavBar";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import React, { useEffect, useState } from "react";
import { DatePicker, Space, message } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export default function Page() {
  interface Car {
    CarId: number;
    CarPicUrl: string;
    CarName: string;
    CarBrand: string;
    CarPrice: number;
    CarDescription: string;
  }
  const { id } = useParams();
  const [cars, setCars] = useState<Car | null>(null);
  const [carRentalFrom, setCarRentalFrom] = useState<Dayjs | null>(null);
  const [carRentalTo, setCarRentalTo] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const disabledDate = (current: any) => {
    return (
      current &&
      (current < dayjs().endOf("day") ||
        current < dayjs(carRentalFrom).add(1, "day"))
    );
  };
  useEffect(() => {
    fetch(`http://localhost:3000/api/cars/car/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setCars(data.car);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return "Loading...";
  if (error) return "An error occurred.";
  const onReserve = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage!");
      return;
    }
    if (!cars) {
      console.error("No car selected!");
      return;
    }
    axios
      .post("http://localhost:3000/api/reservation/new", {
        car: cars.CarId,
        carRentalFrom: carRentalFrom,
        carRentalTo: carRentalTo,
        token: token,
      })
      .then((response) => {
        console.log("Rental success", response.data);
        message.success("Rental Successful");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          message.error("User already rented a Car");
        } else if (error.response && error.response.status === 405) {
          message.error(
            "User must have a Room reservation before renting a Car"
          );
        } else if (error.response && error.response.status === 406) {
          message.error(
            "Car rental period cannot be outside the room reservation period"
          );
        } else {
          console.error("There was an error!", error);
        }
      });
  };

  return (
    <div className="bg-sky">
      <Navbar />
      {cars && (
        <div>
          <div className="container mx-auto px-4 h-max mt-7 ">
            <p className="text-5xl text-center font-extrabold mb-4 text-primary-dark">
              {" "}
              {cars.CarName}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-sand mt-5 xl:mx-10 relative">
              <div className="overflow-hidden info-details">
                <Image
                  src={cars.CarPicUrl}
                  alt={cars.CarName}
                  className="w-full object-cover rounded-lg"
                  height={500}
                  width={500}
                />
              </div>
              <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-3 ml-3 shadow-md">
                <span>{cars.CarBrand}</span>
              </div>
              <div>
                <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute mb-3 mr-3 shadow-md bottom-0 right-0 flex">
                  <span>Price/Day: {cars.CarPrice}$</span>
                </div>
              </div>
            </div>
            <div className="md:pt-28 text-xl text-gray-700">
              <p>{cars.CarDescription}</p>
              <Space direction="vertical" size={12} className="pt-10">
                <RangePicker
                  disabledDate={disabledDate}
                  className="w-96 h-10 text-2xl"
                  onCalendarChange={(dates) => {
                    if (dates) {
                      setCarRentalFrom(dates[0]);
                      setCarRentalTo(dates[1]);
                    }
                  }}
                />{" "}
              </Space>
              <div className="pt-5">
                <label htmlFor="Status" className="bg-gray-100 ">
                  {" "}
                  Status: &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-11 w-full flex justify-between">
        <Link
          className="bg-red-700 text-sky text-s uppercase font-bold rounded-full p-2"
          href="/Car"
        >
          Go Back
        </Link>
        <button
          className="bg-green-600 text-sky text-s uppercase font-bold rounded-full p-2 shadow-md"
          onClick={onReserve}
        >
          Order
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
