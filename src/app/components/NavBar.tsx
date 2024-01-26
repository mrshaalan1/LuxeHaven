"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LogIn from "./LogIn";
import Image from "next/image";
import { message } from "antd";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faCar,
  faBed,
  faUsersCog,
  faSignInAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

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
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const toggleBurgerMenu = () => {
    setShowBurgerMenu(!showBurgerMenu);
  };
  return (
    <div>
      <div className="navbar mx-auto max-w-screen-xxl py-10 bg-primary-dark px-4 lg:px-8 lg:py-7 shadow-lg">
        <div className="flex items-center justify-between mr-auto">
          <a
            className="btn btn-ghost mr-4 cursor-pointer py-1.5 font-sans font-extrabold hover:text-sand text-4xl h-28 "
            href="/"
          >
            <Image
              src="/assets/logo/luxe logo.png"
              alt="{RoomType}"
              height={100}
              width={100}
            />
            LuxeHaven
          </a>
        </div>
        <div
          className="burger-menu cursor-pointer lg:hidden "
          onClick={toggleBurgerMenu}
        >
          <div className={`bar ${showBurgerMenu ? "active" : ""}`}></div>
          <div className={`bar ${showBurgerMenu ? "active" : ""}`}></div>
          <div className={`bar ${showBurgerMenu ? "active" : ""}`}></div>
        </div>
        <ul
          className={`menu menu-horizontal lg:flex-auto ${
            showBurgerMenu ? "hidden" : "flex"
          }`}
        >
          <li>
            <a
              className="btn-ghost font-bold hover:text-sand px-14 sm:px-auto text-2xl hidden lg:flex"
              href="/Menu"
            >
              Restaurant
              <FontAwesomeIcon icon={faUtensils} size="xs" />
            </a>
          </li>
          <li>
            <a
              className="btn-ghost font-bold hover:text-sand px-14 sm:px-auto text-2xl hidden lg:flex"
              href="/Car"
            >
              CarRental
              <FontAwesomeIcon icon={faCar} size="xs" />
            </a>
          </li>
          <li>
            <a
              className="btn-ghost font-bold hover:text-sand px-14 sm:px-auto text-2xl hidden lg:flex"
              href="/rooms"
            >
              Rooms
              <FontAwesomeIcon icon={faBed} size="xs" />
            </a>
          </li>
          <li>
            <a
              className="btn-ghost font-bold hover:text-sand px-14 sm:px-auto text-2xl hidden lg:flex"
              href="/admin"
            >
              Admin
              <FontAwesomeIcon icon={faUsersCog}  />
            </a>
          </li>
          <li className="hidden lg:flex">{!isLoggedIn && <LogIn />}</li>
        </ul>
        {isLoggedIn && (
          <div className="flex-none gap-2 ">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" w-full">
                  <FontAwesomeIcon className="h-9" icon={faUser} size="lg"  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary rounded-box w-52"
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
      {showBurgerMenu && (
        <ul className="menu menu-vertical lg:hidden bg-primary-dark z-50">
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand  px-14 sm:px-auto text-2xl"
              href="/Menu"
            >
              Restaurant
              <FontAwesomeIcon icon={faUtensils} size="xs" />
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-14 sm:px-auto text-2xl"
              href="/Car"
            >
              Car Rental
              <FontAwesomeIcon icon={faCar} size="xs" />
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-14 sm:px-auto text-2xl"
              href="/rooms"
            >
              Rooms
              <FontAwesomeIcon icon={faBed} size="xs" />
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-14 sm:px-auto text-2xl"
              href="/admin"
            >
              Admin
              <FontAwesomeIcon icon={faUsersCog} size="xs" />
            </a>
          </li>
          <li>{!isLoggedIn && <LogIn />}</li>
        </ul>
      )}
    </div>
  );
};
export default Navbar;
