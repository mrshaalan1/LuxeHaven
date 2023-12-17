import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import { Rate } from "antd";


function Car() {
  return (
    <div className="Menu bg-sky">
      <Navbar />

      <div>
        <h1 className=" text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          {" "}
          Rooms
        </h1>
      </div>
      {/* <div className="flex justify-center">
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
            <option>Pool Room</option>
            <option>Pool Room</option>
            <option>Delux Room</option>
            <option>King Room</option>

          </select>
          <div className="indicator">
            <button className="btn join-item bg-gray-200 hover:bg-gray-300">
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-1">
      <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room1.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={4}/>
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
            <span>Model</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room2.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={3.5}/>
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
            <span>Model</span>
          </div>
        </div>
        <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room3.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={4.5}/>
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
            <span>Model</span>
          </div>
        </div>

        <div className=" bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room4.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={4}/>
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
            <span>Model</span>
          </div>
        </div>

        <div className=" lg:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room5.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={5}/>
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
            <span>Pool Room</span>
          </div>
        </div>

        <div className=" lg:bg-primary md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room6.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={4.5}/>
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
            <span>Model</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
                  src={require("./room service/Room3.png")}
                  alt="Room"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className="rounded-full p-2 absolute top-0 mt-9 right-10 bg-primary">
          <Rate disabled allowHalf defaultValue={5}/>
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
            <span>Model</span>
          </div>
        </div>
      </div>
      <div className="pb-24"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Car;
