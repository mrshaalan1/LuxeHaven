"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LogIn from "./LogIn";
import Image from "next/image";
import { message } from "antd";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/api/users/status")
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/users/status")
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const logout = async () => {
    try {
    await axios.get("/api/users/logout");
    message.success("Logged Out Successfully");
    Cookies.remove("token");
    window.location.href = "/";
    } catch (error: any) {
    console.log(error.message);
    }
   };
   


  return (
    <div className="bg-sky">
      <div className="navbar mx-auto max-w-screen-xxl py-10 bg-secendary px-4 lg:px-8 lg:py-7 shadow-lg">
        <div className="flex-1">
          <a
            className=" btn btn-ghost mr-4 cursor-pointer py-1.5 font-sans font-extrabold hover:text-sand text-4xl navbar-brand"
            href="/"
          >
            LuxeHaven
          </a>
        </div>
        <ul className="menu menu-horizontal flex-auto">
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Menu"
            >
              Menu
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Car"
            >
              Car Rental
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/rooms"
            >
              Rooms
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/admin"
            >
              Admin
            </a>
          </li>
          <li>{!isLoggedIn && <LogIn />}</li>
        </ul>
        {isLoggedIn && (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="rounded-full w-96">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    src={require("../myprofile/image/default.png")}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary-dark rounded-box w-52"
              >
                <li>
                  <a className="justify-between text-xl" href="/myprofile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="justify-between text-xl" href="/myreservations">
                    My Reservation
                  </a>
                </li>
                <li>
                  <a onClick={logout} className="justify-between text-xl">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
