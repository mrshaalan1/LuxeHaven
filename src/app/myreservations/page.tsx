"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Car from "@/models/carModel";
import { json } from "stream/consumers";

export default function myreservations() {
  interface Reservation {
    _id: { $oid: string };
    customer: { $oid: string };
    RoomId: { $numberInt: string };
    CarId: { $numberInt: string };
    CarRentalFrom: string;
    CarRentalTo: string;
    spa: boolean;
    gym: boolean;
    __v: { $numberInt: string };
    reservationFrom: string;
    reservationTo: string;
  }

  const [roomDetails, setRoomDetails] = useState<Record<string, any>>({});
  const [carDetails, setCarDetails] = useState<Record<string, any>>({});
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3000/api/users/list", {
          token: token,
        })
        .then((response) => {
          const updatedReservations = response.data.reservations.map(
            async (reservation:any) => {
              const roomResponse = await axios.get(
                `http://localhost:3000/api/rooms/${reservation.RoomId}`
              );
              
              const carResponse = await axios.get(
                `http://localhost:3000/api/cars/car/${reservation.carReservation.CarId}`
              );
              setCarDetails(carResponse.data.car);
              
              setRoomDetails(roomResponse.data.room);
              
              return { ...reservation, roomDetails: roomResponse.data.room, carDetails:carResponse.data.car};
            }
          );
          Promise.all(updatedReservations)
            .then(setReservations)
            .catch((error) => {
              console.error("Error:", error);
            });
        });
    }
  }, []);

  const groupedReservations = reservations.reduce(
    (groups: Record<string, Reservation[]>, reservation: Reservation) => {
      const date = `${reservation.reservationFrom}-${reservation.reservationTo}`;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(reservation);
      return groups;
    },
    {}
  );

  return (
    <div className="bg-sky">
      <Navbar />
      <div>
        <h1 className=" text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          {" "}
          My Reservations
        </h1>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="join">
            <div>
              <div>
                <input
                  className="input input-bordered join-item bg-gray-200 text-black"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* <select className="select select-bordered join-item text-gray-700 hover:bg-gray-300 bg-gray-200">
              <option disabled selected>
                Filter
              </option>
              <option>Rooms</option>
              <option>Cars</option>
              <option>Menu Items</option>
            </select> */}

            <div className="indicator">
              <button className="btn join-item bg-gray-200 hover:bg-gray-300">
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
          {Object.entries(groupedReservations).map(
            ([dateRange, reservations]) => (
              <div key={dateRange}>
                {reservations.map((reservation) => (
                  <>
                    {roomDetails && (
                      
                      <div className=" bg-sand overflow-hidden shadow-md mt-10 mx-72 p-6 rounded-md relative">
                        {/* <h1>{JSON.stringify(roomDetails)}</h1> */}
                        <Image
                            src={roomDetails.RoomPicUrl}
                            alt={roomDetails.RoomType}
                            className="w-full object-cover rounded-lg"
                            height={500}
                            width={500}
                          />
                        <div>
                          <Link
                            className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
                            href="/myreservations"
                          >
                            View
                          </Link>
                        </div>
                        <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
                          <span>{roomDetails.RoomType}</span>
                        </div>
                        <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 right-0 mt-9 mr-1 shadow-md">
                          <span className="text-l">Room Number: {roomDetails.RoomNumber}</span>
                        </div>
                      </div>
                    )}
                    {carDetails &&(
                      <div className=" bg-primary-dark rounded overflow-hidden shadow-md mt-10 mx-72 p-8 relative">
                      <Image
                            src={carDetails.CarPicUrl}
                            alt={carDetails.CarName}
                            className="w-full object-cover rounded-lg"
                            height={500}
                            width={500}
                          />
                      <div>
                        <Link
                          className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
                          href="/myreservations"
                        >
                          View
                        </Link>
                      </div>
                      <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
                        <span>{carDetails.CarName}</span>
                      </div>
                    </div>
                    )}
                    
                  </>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <div className="pt-52">
        <Footer />
      </div>
    </div>
  );
}
