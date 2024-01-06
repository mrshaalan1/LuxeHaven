"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import { Rate } from "antd";

function Room() {
  interface RoomObject {
    room: {
      RoomId: number;
      RoomPicUrl: string;
      RoomType: string;
      RoomDescription: string;
      RoomPrice: number;
      RoomRating: number;
    }[];
  }

  const [rooms, setRooms] = useState<RoomObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRooms(data);
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
  }, []);

  if (loading) return "Loading...";
  if (error) return "An error occurred.";

  return (
    <div className="Menu bg-sky">
      <Navbar />

      <div>
        <h1 className=" text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          {" "}
          Rooms
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-1">
        {rooms &&
          rooms.room.map(({RoomId,RoomType,RoomPicUrl,RoomRating }) => (
            <>
              <div key={RoomId} className="room-details lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
                <Image
                  src={RoomPicUrl}
                  alt={RoomType}
                  className="w-full h-72 object-cover rounded-lg"
                  height={500}
                  width={500}
                />
                <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
                  <Rate disabled allowHalf defaultValue={RoomRating} />
                </div>
                <div>
                  <Link
                    className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
                    href="/Reserve"
                  >
                    View
                  </Link>
                </div>
                <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
                  <span>{RoomType}</span>
                </div>
              </div>
            </>
          ))}
      </div>
      <div className="pb-24"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Room;
