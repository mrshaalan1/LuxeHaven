"use client";

import { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Menu from "./menu";
import Car from "./car";
import Reservation from "./reservation";
import Room from "./room";
import Trend from "./trend";

export default function admin() {
  const [currentView, setCurrentView] = useState("Trend");

  const handleClick = (view:any) => {
    setCurrentView(view);
  };

  return (
    <div className="bg-sky">
      <Navbar />
      <div className="justify-between flex lg:px-40 bg-primary">
        <button
          className="text-xl font-bold p-5"
          onClick={() => handleClick("Trend")}
        >
          Trends Settings
        </button>
        <button
          className="text-xl font-bold p-5"
          onClick={() => handleClick("Room")}
        >
          Room Settings
        </button>
        <button
          className="text-xl font-bold p-5"
          onClick={() => handleClick("Car")}
        >
          Car Settings
        </button>
        <button
          className="text-xl font-bold p-5"
          onClick={() => handleClick("Menu")}
        >
          Menu Settings
        </button>
        <button
          className="text-xl font-bold p-5"
          onClick={() => handleClick("Reservation")}
        >
          Reservations Settings
        </button>
      </div>
      <div>
        {currentView === "Trend" && <Trend />}
        {currentView === "Room" && <Room />}
        {currentView === "Car" && <Car />}
        {currentView === "Menu" && <Menu />}
        {currentView === "Reservation" && <Reservation />}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
