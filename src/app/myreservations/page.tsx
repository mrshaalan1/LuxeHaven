"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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

  const deleteReservation = async (
    reservationId: any,
    reservationType: any
  ) => {
    try {
      console.log("1");

      await axios.delete(`http://localhost:3000/api/users/deletereservation`, {
        data: JSON.stringify({ reservationId, reservationType }),
      });

      console.log(reservationId);
      console.log(reservationType);

      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation._id.$oid !== reservationId
        )
      );
    } catch (error) {
      console.log("4");

      console.error("Error:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/list", {})
      .then(async (response) => {
        console.log(response.data.reservations[0]);

        const updatedReservations = response.data.reservations[0];

        const promises = Object.keys(updatedReservations).map(async (key) => {
          const reservation = updatedReservations[key];
          let room = reservation?.RoomId;
          let car = reservation?.carReservation?.CarId;

          const roomResponse = room
            ? await axios.get(`http://localhost:3000/api/rooms/${room}`)
            : null;

          const carResponse = car
            ? await axios.get(`http://localhost:3000/api/cars/car/${car}`)
            : null;

          return {
            ...reservation,
            roomDetails: roomResponse?.data.room || null,
            carDetails: carResponse?.data.car || null,
          };
        });

        Promise.all(promises)
          .then((result) => {
            setReservations(result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
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
        
        <div>
          {Object.entries(groupedReservations).map(
            ([dateRange, reservations]) => (
              <div key={dateRange}>
                {reservations.map((reservation) => (
                  <>
                  <div className="grid grid-cols-2 ">
                    {roomDetails && (
                      <div className=" bg-sand overflow-hidden shadow-md my-5 p-3 rounded-md relative mx-10">
                        <Image
                          src="/assets/rooms/Room1.png"
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
                        <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 right-10 mt-9 ml-1 shadow-md">
                          <span>{roomDetails.RoomType}</span>
                        </div>
                        <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 left-9 mt-9 mr-1 shadow-md">
                          <span className="text-l">
                            Room Number: {roomDetails.RoomNumber}
                          </span>
                        </div>
                        <button
                          className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                          onClick={() =>
                            deleteReservation(reservation._id.$oid, "room")
                          }
                        >
                          Delete Room Reservation
                        </button>
                        <button
                          className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 left-4"
                          onClick={() =>
                            deleteReservation(reservation._id.$oid, "room")
                          }
                        >
                          Modify Room Reservation
                        </button>
                      </div>
                    )}
                    {carDetails && (
                      <div className=" bg-primary-dark overflow-hidden shadow-md my-5 p-3 rounded-md relative mx-10">
                        <Image
                          src="/assets/rooms/Room5.png"
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
                        <button
                          className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                          onClick={() =>
                            deleteReservation(reservation._id.$oid, "car")
                          }
                        >
                          Delete Car Reservation
                        </button>
                      </div>
                    )}

                  </div>
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
