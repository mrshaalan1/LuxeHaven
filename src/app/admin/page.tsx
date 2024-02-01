"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import MenuSetting from "./addMenu";
import Car from "./car";
import AddAdmin from "./addAdmin";
import Room from "./room";
import Trend from "./trend";
import jwt from "jsonwebtoken";
import { useMediaQuery } from "react-responsive";
import { Dropdown, Menu } from "antd";

export default function admin() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let decodedToken;

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  if (token !== null) {
    decodedToken = jwt.decode(token) as jwt.JwtPayload;
    //console.log("User role: ", decodedToken?.role);
  } else {
    //console.log("No token found");
  }

  if (
    !decodedToken ||
    (decodedToken.role !== "ADMIN" && decodedToken.role !== "SA")
  ) {
    window.location.href = "/";
    return null;
  }

  const [currentView, setCurrentView] = useState("Trend");

  const handleClick = (view: any) => {
    setCurrentView(view);
  };

  return (
    <div className="bg-sky">
      <Navbar />
      {isSmallScreen ? (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleClick("Trend")}>
                Trends Settings
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleClick("Room")}>
                Room Settings
              </Menu.Item>
              <Menu.Item key="3" onClick={() => handleClick("Car")}>
                Car Settings
              </Menu.Item>
              <Menu.Item key="4" onClick={() => handleClick("MenuSetting")}>
                Menu Settings
              </Menu.Item>
              {decodedToken?.role === "SA" && (
                <Menu.Item key="5" onClick={() => handleClick("AddAdmin")}>
                  Add Admins
                </Menu.Item>
              )}
            </Menu>
          }
        >
          <button className="text-xl font-bold p-5 w-full bg-primary-dark text-center">
            Settings
          </button>
        </Dropdown>
      ) : (
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
            onClick={() => handleClick("MenuSetting")}
          >
            Menu Settings
          </button>
          {decodedToken?.role === "SA" && (
            <button
              className="text-xl font-bold p-5"
              onClick={() => handleClick("AddAdmin")}
            >
              Add Admins
            </button>
          )}
        </div>
      )}
      <div>
        {currentView === "Trend" && <Trend />}
        {currentView === "Room" && <Room />}
        {currentView === "Car" && <Car />}
        {currentView === "MenuSetting" && <MenuSetting />}
        {currentView === "AddAdmin" && decodedToken?.role === "SA" && (
          <AddAdmin />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
