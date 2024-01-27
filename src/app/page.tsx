"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/NavBar";
import Footer from "@/app/components/Footer";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Home() {
  const [text, { isDelete }] = useTypewriter({
    words: [
      "Discover Serenity at LuxeHaven. Where Luxury Meets Nature, and Every Moment Is a MASTERPIECE.",
    ],
    typeSpeed: 50,
    delaySpeed: 100,
  });

  return (
    <main>
      <div className="Home bg-sky">
        <Navbar />
        <div className="flex">
          <img
            src="/assets/main/Landing.png"
            alt="Landing"
            className="w-full "
          />
          <div className="absolute  lg:top-1/2 md:top-96 xs:top-72 left-1/2 transform -translate-x-3/4 -translate-y-1/2">
            <span className="typewriter-text font-extrabold lg:text-4xl md:text-3xl sm:text-2xl xs:text-lg text-zinc-100">
              {text}
            </span>
            {!isDelete && <Cursor />}
          </div>
        </div>

        <ul className="p-12 grid grid-cols-4 md:gap-14">
          <li className="lg:col-span-2 xs:col-span-4">
            <p
              className="font-sans font-extrabold text-3xl
             text-primary-dark "
            >
              Find Your Relaxation
            </p>
            <br />
            <p className="p-2 font-sans font-semibold text-xl text-gray-800">
              {" "}
              &nbsp; A Symphony of Luxury and Exploration. Immerse yourself in
              opulence, indulge in exquisite culinary journeys, and explore with
              ease. Your haven of extraordinary experiences awaits.
            </p>
          </li>
          <li className=" lg:col-span-2 col-span-4 md:col-start-2 xs:col-start-1">
            <Image
              className="h-80 w-full object-cover shadow-lg rounded-xl"
              src={require("./images/home/Relaxing.png")}
              alt="main"
            />
          </li>

          <li className=" lg:col-span-2 col-span-4 md:col-start-2 xs:col-start-1">
            <Image
              className="h-96 object-center w-full object-cover shadow-lg rounded-xl"
              src={require("./images/home/Room.png")}
              alt="rooms"
            />
          </li>
          <li className="lg:col-span-2 xs:col-span-4">
            <p className="font-sans font-extrabold text-3xl text-primary-dark capitalize">
              Hospitality and Rooms:
            </p>
            <br />
            <p className="p-2 font-sans font-semibold text-xl text-gray-800">
              {" "}
              &nbsp; At LuxeHaven, our commitment goes beyond accommodation;
              it's a promise of unparalleled hospitality. Each room is a
              sanctuary of luxury, meticulously designed to elevate your stay
              into an unforgettable experience. Your journey with us is more
              than a visit; it's a personalized retreat.
            </p>
          </li>

          <li className="lg:col-span-2 xs:col-span-4">
            <p className="font-sans font-extrabold text-3xl text-primary-dark capitalize">
              Car Rental Services
            </p>
            <br />
            <p className="p-2 font-sans font-semibold text-xl text-gray-800">
              {" "}
              &nbsp; Seamless Exploration Awaits! Unlock the freedom to roam at
              your pace with LuxeHaven's exclusive car rental services. From
              city exploration to scenic drives, our fleet ensures every journey
              is as remarkable as your stay. Drive into luxury and discover the
              world on your terms.
            </p>
          </li>
          <li className=" lg:col-span-2 col-span-4 md:col-start-2 xs:col-start-1">
            <Image
              className="h-72 w-full object-cover shadow-lg rounded-xl"
              src={require("./images/home/car.png")}
              alt="car"
            />
          </li>
          <li className=" lg:col-span-2 col-span-4 md:col-start-2 xs:col-start-1">
            <Image
              className="max-h-72 w-full object-cover shadow-lg rounded-xl"
              src={require("./images/home/menu.png")}
              alt="menu"
            />
          </li>
          <li className="lg:col-span-2 xs:col-span-4">
            <p className="font-sans font-extrabold text-3xl text-primary-dark capitalize">
              Gourmet Menu Offerings
            </p>
            <br />
            <p className="p-2 font-sans font-semibold text-xl text-gray-800">
              {" "}
              &nbsp; Savor Culinary Excellence at LuxeHaven. Our menu is a
              gastronomic journey, curated to delight your palate with exquisite
              flavors. From local delicacies to international cuisines, our
              chefs ensure every dish is a celebration of taste. Indulge in a
              symphony of flavors at LuxeHaven.
            </p>
          </li>

          <div className="flex items-center justify-center lg:col-span-2 xs:col-span-4 border-b-8 border-primary">
            <li>
              <p className="font-sans font-extrabold text-4xl text-primary capitalize">
                your room is this way ▸
              </p>
            </li>
          </div>

          <li className=" lg:col-span-2 col-span-4 md:col-start-2 xs:col-start-1 ">
            <Link href={"/rooms"}>
            <Image
              className="h-80 w-full object-cover shadow-lg rounded-xl hover:bg-primary-dark hover:border-8 hover:border-primary"
              src={require("./images/home/this way.png")}
              alt="room"
            />
            </Link>
          </li>
        </ul>
        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
