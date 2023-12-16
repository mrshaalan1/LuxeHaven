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
            alt="yogurt"
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
            alt="scrambled-eggs"
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
            alt="waffle"
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
            alt="waffle"
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
            alt="waffle"
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
            alt="waffle"
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
            alt="waffle"
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
