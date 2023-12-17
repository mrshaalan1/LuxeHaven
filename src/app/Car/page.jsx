import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";

function Car() {
  return (
    <div className="Menu bg-sky">
      <Navbar />

      <div>
        <h1 className=" text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          {" "}
          Our Car Collection
        </h1>
      </div>
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
            <option>Model 1</option>
            <option>Model 2</option>
            <option>Model 3</option>
          </select>
          <select className="select select-bordered join-item text-gray-700 hover:bg-gray-300 bg-gray-200">
            <option disabled selected>
              Sort
            </option>
            <option>Price Descending</option>
            <option>price Ascending</option>
            <option>New</option>
            <option>popularity</option>
          </select>
          <div className="indicator">
            <button className="btn join-item bg-gray-200 hover:bg-gray-300">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-1">
        <div className="bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/1"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Model</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/2"
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
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/3"
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
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/4"
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
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Hamburgers </span>
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/5"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Model</span>
          </div>
        </div>

        <div className=" lg:bg-primary md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/6"
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
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/7"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Model</span>
          </div>
        </div>

        <div className=" lg:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/car.jpg")}
            alt="Car"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Car </span>
            <span className=" block text-slate-700 text-sm">Car </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Car/8"
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
