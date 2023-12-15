import React from "react";
import Image from "next/image";
import { Carousel } from "antd";
import Navbar from "../components/NavBar";

function RoomServices() {
  return (
    <div className="bg-sky">
      <Navbar />
      <ul className=" grid md:grid-cols-3 grid-rows-2 xs:grid-cols-2 md:gap-6 xs:gap-16">
        <li className="col-span-2 row-span-2 mt-10 col-start-1 row-start-1">
          <Carousel autoplay>
            <div>
              <Image
                className="object-cover w-full h-96"
                src={require("./images/room service/Room1.png")}
                alt="slide 1"
              />
            </div>
            <div>
              <Image
                className=" object-cover w-full h-96"
                src={require("./images/room service/Room2.png")}
                alt="slide 2"
              />
            </div>
            <div>
              <Image
                className="object-cover w-full h-96"
                src={require("./images/room service/Room3.png")}
                alt="slide 3"
              />
            </div>
          </Carousel>
        </li>
        <li>
          <div className=" bg-sand rounded shadow-md mt-10 h-52">
            <Image
              className="w-full px-4 pt-2 h-24 sm:h-36 object-cover rounded-lg"
              src={require("./images/room service/laundry.png")}
              alt="laundry"
            />
            <div className=" font-sans font-bold text-2xl p-4 text-slate-700 max-h-10">
              24/7 Laundry Service
            </div>
          </div>
        </li>
        <li>
          <div className=" bg-sand rounded shadow-md mt-10 h-52">
            <Image
              className="w-full px-4 pt-2 h-24 sm:h-36 object-cover rounded-lg"
              src={require("./images/room service/FoodService.png")}
              alt="FoodService"
            />
            <div className=" font-sans font-bold text-2xl p-4 text-slate-700 max-h-10">
              24/7 food service
            </div>
          </div>
        </li>
        <li className="col-span-2 row-span-2">
          <div className="  rounded  mt-8 h-80">
            <p className="pl-2 font-bold font-serif text-4xl text-primary-dark">
              Suites
            </p>
            <p className=" font-semibold font-serif text-2xl p-4 pt-6 text-primary">
              Our different suites:
            </p>
            <ul className="pt-4 list-disc">
              <li>
                <p className="pl-6 font-medium text-xl text-primary">
                  -Deluxe resort suite:
                </p>
                <p className="pl-7 pt-2 font-normal text-lg text-slate-700">
                  {" "}
                  &nbsp; Contains one the best views we can offer over a blue
                  oasis of pools in the heart of the resort along with 3 rooms
                  for you and your family members to enjoy,also a lounge to
                  welcome guests with a stylish decoration that adds a sense of
                  style and elegance.
                </p>
              </li>
              <li>
                <p className="pl-6 pt-9 font-medium text-xl text-primary">
                  -Deluxe sea view suit:
                </p>
                <p className="pl-7 pt-2 font-normal text-lg text-slate-700">
                  {" "}
                  &nbsp; With sweeping views of the sea, a spacious in the
                  majority of the rooms and lavish decor inspired by the
                  surrounding sea,our deluxe sea view suit will deliver.
                </p>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className=" bg-sand rounded shadow-md sm:mt-10 h-52 xs:mt-24">
            <Image
              className="w-full px-4 pt-2 h-24 sm:h-36 object-cover rounded-lg"
              src={require("./images/room service/SpaService.png")}
              alt="SpaService"
            />
            <div className=" font-sans font-bold text-2xl p-4 text-slate-700 max-h-10">
              24/7 Spa service
            </div>
          </div>
        </li>
        <li>
          <div className=" bg-sand rounded shadow-md sm:mt-10 h-52 xs:mt-24">
            <Image
              className="w-full px-4 pt-2 h-24 sm:h-36 object-cover rounded-lg"
              src={require("./images/room service/CarRental.png")}
              alt="CarRental"
            />
            <div className=" font-sans font-bold text-2xl p-4 text-slate-700 max-h-10">
              Car Rental Service
            </div>
          </div>
        </li>
        <li className="col-span-2 row-span-2 mt-5">
          <Carousel autoplay>
            <div>
              <Image
                className="object-cover w-full h-96"
                src={require("./images/room service/Room4.png")}
                alt="slide 4"
              />
            </div>
            <div>
              <Image
                className=" object-cover w-full h-96"
                src={require("./images/room service/Room5.png")}
                alt="slide 5"
              />
            </div>
            <div>
              <Image
                className="object-cover w-full h-96"
                src={require("./images/room service/Room6.png")}
                alt="slide 6"
              />
            </div>
          </Carousel>
        </li>
        <li>
          <div className=" bg-sand rounded shadow-md mt-10 h-52">
            <Image
              className="w-full px-4 pt-2 h-24 sm:h-36 object-cover rounded-lg"
              src={require("./images/room service/wifi.png")}
              alt="wifi"
            />
            <div className=" font-sans font-bold text-2xl p-4 text-slate-700 max-h-10">
              24/7 Free Wifi
            </div>
          </div>
        </li>
        <li>
          <div className=" bg-sand rounded shadow-md mt-10 h-52">
            <Image
              className="w-full px-4 pt-2 h-24 sm:h-36 object-cover rounded-lg"
              src={require("./images/room service/gym.png")}
              alt="gym"
            />
            <div className=" font-sans font-bold text-2xl p-4 text-slate-700 max-h-10">
              24/7 Open Gym
            </div>
          </div>
        </li>

        <li className="col-span-2 row-span-2">
          <div className="  rounded  mt-8 h-80">
            <p className="pl-2 font-bold font-serif text-4xl text-primary-dark">
              Rooms
            </p>
            <p className=" font-semibold font-serif text-2xl p-4 pt-6 text-primary">
              Our different rooms:
            </p>
            <ul className="pt-4 list-disc">
              <li>
                <p className="pl-6 font-medium text-xl text-primary">
                  -Superior Room:
                </p>
                <p className="pl-7 pt-2 font-normal text-lg text-slate-700">
                  {" "}
                  &nbsp; A stylish room with a welcoming decor,a view to the
                  gardens. The superior rooms are the perfect choice for couples
                  who want to have a short stay at our hotel.
                </p>
              </li>
              <li>
                <p className="pl-6 pt-9 font-medium text-xl text-primary">
                  -Pool Room
                </p>
                <p className=" pb-20 pl-7 pt-2 font-normal text-lg text-slate-700 bg-sky">
                  {" "}
                  &nbsp; A room with its own private access to a pool.Step out
                  to your own balcony and into your own pool with massage jets
                  to make your experience complete.
                </p>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="bg-sky md:mb-96 pb-10"> </div>
        </li>
      </ul>
    </div>
  );
}

export default RoomServices;
