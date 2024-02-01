"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Skeleton from "@/app/components/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [loading, setLoading] = useState<boolean>(true);

  const deleteReservation = async (
    reservationId: any,
    reservationType: any
  ) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete("api/reservation/delete", {
          data: JSON.stringify({ reservationId, reservationType }),
        });

        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation._id.$oid !== reservationId
          )
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your reservation has been deleted.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the reservation.",
        icon: "error",
      });
    }
  };
  const viewOrders = async () => {
    try {
      const response = await axios.get("/api/menu/dish/list");

      //console.log(response);

      const orders = response.data.cart;
      //console.log(orders);

      const dishDetailsPromises = orders.map(async (order: any) => {
        const dishDetails = await Promise.all(
          order.items.map(async (item: any) => {
            const dishRes = await axios.post("/api/menu/dish/getDish", {
              DishId: item.menuItemId,
            });
            return dishRes.data;
          })
        );
        return { ...order, dishDetails };
      });

      const ordersWithDishDetails = await Promise.all(dishDetailsPromises);

      Swal.fire({
        title: "My Orders",
        html: ordersWithDishDetails
          .map(
            (order: any) => `
            <div style="margin-bottom: 20px;">
              ${
                order.dishDetails
                  ? `<p><strong>Dishes:</strong></p>
                <ul>
                  ${order.dishDetails
                    .map(
                      (dish: any) => `<li>${dish.dish.RestaurantItemName}</li>`
                    )
                    .join("")}
                </ul>`
                  : ""
              }
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
            </div>
            <hr>
          `
          )
          .join(""),
        icon: "info",
        confirmButtonText: "Close",
        width: "600px",
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching orders.",
        icon: "error",
      });
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

        const promises = updatedReservations.map(async (reservation: any) => {
          let room = reservation?.RoomId;
          let car = reservation?.carReservation?.CarId;

          const roomResponse = room
            ? await axios.post("http://localhost:3000/api/rooms/getRoom", {
                RoomId: room,
              })
            : null;

          const carResponse = car
            ? await axios.post("/api/cars/car/getCar", {
                CarId: car,
              })
            : null;

            //console.log(carResponse);
            

          return {
            ...reservation,
            roomDetails: roomResponse?.data.room || null,
            carDetails: carResponse?.data.car || null,
          };
        });

        const result = await Promise.all(promises);
        setReservations(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
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
          <FontAwesomeIcon
            onClick={viewOrders}
            className="fixed bottom-10 right-12 z-40 bg-sand p-5 rounded-lg"
            icon={faShoppingCart}
            size="2xl"
          />
        </div>
        <div>
          {loading ? (
            // Display skeleton loading state
            <div className="skeleton-loading">
              <Skeleton />
            </div>
          ) : (
            Object.entries(groupedReservations).map(
              ([dateRange, reservations]) => (
                <div key={dateRange}>
                  <div></div>
                  {reservations.map((reservation) => (
                    <div
                      key={reservation._id.$oid}
                      className="grid grid-cols-2"
                    >
                      <div className="col-span-2 border-b-primary-dark border-b-8 pt-6">
                        <p className="font-bold text-2xl text-primary-dark border-b-primary border-b-8 pl-12">
                          Reserved From:{" "}
                          {new Date(reservation.reservationFrom)
                            .toISOString()
                            .substring(0, 10)}{" "}
                          To:{" "}
                          {new Date(reservation.reservationTo)
                            .toISOString()
                            .substring(0, 10)}
                        </p>
                      </div>

                      {reservation.roomDetails && (
                        <div className="bg-sand overflow-hidden shadow-md my-5 p-3 rounded-md relative mx-10 h-5/6 w-5/6">
                          <Image
                            src={
                              reservation.roomDetails.cachedImagePath
                                ? `${reservation.roomDetails.cachedImagePath}`
                                : ``
                            }
                            alt={reservation.roomDetails.RoomType}
                            className="w-full object-cover rounded-lg"
                            height={500}
                            width={500}
                          />
                          <div>
                            <div className="text-lg p-2 font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute top-4  right-4">
                              Room Number:{"  "}
                              {reservation.roomDetails.RoomNumber}
                            </div>
                            <Link
                              href={"/Reserve/" + reservation._id}
                              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 left-4"
                            >
                              Modify
                            </Link>
                          </div>
                          <button
                            className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                            onClick={() =>
                              deleteReservation(reservation._id, "room")
                            }
                          >
                            Delete Room Reservation
                          </button>
                        </div>
                      )}
                      {reservation.carDetails && (
                        <div>
                          <div className="bg-primary-dark overflow-hidden shadow-md my-5 p-3 rounded-md relative mx-10">
                            {/* <span>{JSON.stringify()}</span> */}
                            <Image
                              src={
                                reservation.carDetails.cachedImagePath
                                  ? `${reservation.carDetails.cachedImagePath}`
                                  : ``
                              }
                              alt={reservation.carDetails.CarName}
                              className="w-full object-cover rounded-lg"
                              height={500}
                              width={500}
                            />
                            <button
                              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                              onClick={() =>
                                deleteReservation(reservation._id, "car")
                              }
                            >
                              Delete Car Reservation
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )
          )}
        </div>
      </div>
      <div className="pt-52">

      </div>
      <div className="pt-96">
        <Footer />
      </div>
    </div>
  );
}
