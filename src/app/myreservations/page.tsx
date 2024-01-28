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
    roomDetails?: Record<string, any> | null;
    carDetails?: Record<string, any> | null;
  }

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [roomDetails, setRoomDetails] = useState<Record<string, any>>({});
  const [carDetails, setCarDetails] = useState<Record<string, any>>({});

  const deleteReservation = async (
    reservationId: any,
    reservationType: any
  ) => {
    try {
      await axios.delete("http://localhost:3000/api/users/deletereservation", {
        data: JSON.stringify({ reservationId, reservationType }),
      });

      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation._id.$oid !== reservationId
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/list",
          {}
        );
        const updatedReservations = response.data.reservations;

        const promises = updatedReservations.map(async (reservation:any) => {
          let room = reservation?.RoomId;
          let car = reservation?.carReservation?.CarId;

          // Sending POST request to get room details
          const roomResponse = room
            ? await axios.post("http://localhost:3000/api/rooms/getRoom", {
                RoomId: room,
              })
            : null;

          // Sending GET request to get car details
          const carResponse = car
            ? await axios.post("/api/cars/car/getCar", {
              CarId: car,
            })
            : null;

          return {
            ...reservation,
            roomDetails: roomResponse?.data.room || null,
            carDetails: carResponse?.data.car || null,
          };
        });

        const result = await Promise.all(promises);
        setReservations(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
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
        <h1 className="text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          My Reservations
        </h1>
      </div>
      <div>
        <div>
          {Object.entries(groupedReservations).map(
            ([dateRange, reservations]) => (
              <div key={dateRange}>
                {reservations.map((reservation) => (
                  <div key={reservation._id.$oid} className="grid grid-cols-2">
                    {reservation.roomDetails && (
                      <div className="bg-sand overflow-hidden shadow-md my-5 p-3 rounded-md relative mx-10">
                        {/* <span>{JSON.stringify(reservation.roomDetails)}</span> */}

                        <Image
                          src={
                            "data:image/png;base64," +
                            reservation.roomDetails.RoomPic
                          }
                          alt={reservation.roomDetails.RoomType}
                          className="w-full object-cover rounded-lg"
                          height={500}
                          width={500}
                        />
                        <div>
                          <Link
                            className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                            href="/myreservations"
                          >
                            Modify
                          </Link>
                        </div>
                        {/* ... Other room details display */}
                      </div>
                    )}
                    {reservation.carDetails && (
                      <div className="bg-primary-dark overflow-hidden shadow-md my-5 p-3 rounded-md relative mx-10">
                        {/* <span>{JSON.stringify()}</span> */}
                        <Image
                          src={
                            "data:image/png;base64," +
                            reservation.carDetails.CarPic
                          }
                          alt={reservation.carDetails.CarName}
                          className="w-full object-cover rounded-lg"
                          height={500}
                          width={500}
                        />

                        {/* ... Other car details display */}
                      </div>
                    )}

                    {/* Common code for both room and car details */}
                    <div>
                      <button
                        className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                        onClick={() =>
                          deleteReservation(reservation._id.$oid, "room")
                        }
                      >
                        Delete Reservation
                      </button>
                      <button
                        className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 left-4"
                        onClick={() =>
                          deleteReservation(reservation._id.$oid, "room")
                        }
                      >
                        Modify Reservation
                      </button>
                    </div>
                  </div>
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
