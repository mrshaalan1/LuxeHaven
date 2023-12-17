"use client";

import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import { Skeleton, Rate } from "antd";
import Link from "next/link";
import Image from "next/image";

export default function myreservations() {
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
          <select className="select select-bordered join-item text-gray-700 hover:bg-gray-300 bg-gray-200">
            <option disabled selected>
              Filter
            </option>
            <option>Rooms</option>
            <option>Cars</option>
            <option>Menu Items</option>
          </select>

          <div className="indicator">
            <button className="btn join-item bg-gray-200 hover:bg-gray-300">
              Search
            </button>
          </div>
        </div>
      </div>
        <div className=" bg-sand rounded overflow-hidden shadow-md mt-10 mx-72 p-8 relative">
          <Image
            src={require("./room service/Room4.png")}
            alt="Room"
            className="w-full h-32 sm:h-48 object-cover hover:object-scale-down rounded-lg"
          />
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Reserve"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Type</span>
          </div>
        </div>
        <div className=" bg-primary-dark rounded overflow-hidden shadow-md mt-10 mx-72 p-8 relative">
          <Image
            src={require("./room service/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-none hover:object-scale-down rounded-lg "
          />
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Reserve"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Model</span>
          </div>
        </div>
      </div>

      <div className="pt-52">
        <Footer />
      </div>
    </div>
  );
}
