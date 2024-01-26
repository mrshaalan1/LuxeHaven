"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import Skeleton from "@/app/components/Skeleton";

function Room() {
  interface RoomObject {
    room: {
      RoomId: number;
      RoomPic: string;
      RoomType: string;
      RoomDescription: string;
      RoomPrice: number;
    }[];
  }

  const [rooms, setRooms] = useState<RoomObject | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRooms(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setError(error);
      });
  }, []);

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
      <div className="bg-primary-dark h-3/4 w-full absolute top-[33%] "></div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1">
        {rooms
          ? rooms.room.map(({ RoomId, RoomType, RoomPic }) => (
              <>
                <div
                  key={RoomId}
                  className="room-details rounded hover:bg-water overflow-hidden m-5 p-2 relative"
                >
                  <Link href="/Reserve">
                    <Image
                      src={"data:image/png;base64," + RoomPic}
                      alt={RoomType}
                      className="w-full h-72 object-cover rounded-lg"
                      height={500}
                      width={500}
                    />
                  </Link>

                  <div></div>
                  <div className="bg-primary text-zinc-200 text-lg uppercase font-bold  p-2 shadow-md text-center border-b-8 border-sand">
                    <span>{RoomType}</span>
                  </div>
                </div>
              </>
            ))
          : Array.from({ length: 4 }).map((_, idx) => <Skeleton key={idx} />)}
      </div>
      <div className="pb-24"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Room;
