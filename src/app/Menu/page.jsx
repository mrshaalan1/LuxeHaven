import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";

function Menu() {
  return (
    <div className="Menu bg-sky">
      <Navbar />

      <div>
        <h1 className=" text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          {" "}
          Our Menu
        </h1>
      </div>

      <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-1">
        <div className="bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/Omelet.png")}
            alt="Omelet"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Omelet </span>
            <span className=" block text-slate-700 text-sm">Egg </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/1"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>BreakFast</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/bowl-of-yogurt-granola-berries.png")}
            alt="yogurt"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Bowl of Yogurt Granola Berries </span>
            <span className=" block text-slate-700 text-sm">
              Yogurt, Blueberries, Raspberries ,Oat
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/2"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>BreakFast</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/scrambled-eggs with-toast-and-goat-cheese.png")}
            alt="scrambled-eggs"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Scrambled Eggs</span>
            <span className=" block text-slate-700 text-sm">
              Egg ,Toast, Goat Cheese{" "}
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/3"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>BreakFast</span>
          </div>
        </div>

        <div className=" bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/waffle-honey-yogurt-bananas-flickr.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Waffle </span>
            <span className=" block text-slate-700 text-sm">
              Waffle, Honey, Yogurt, Bananas{" "}
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/4"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>BreakFast</span>
          </div>
        </div>

        <div className=" lg:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/hamburgers.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Hamburgers </span>
            <span className=" block text-slate-700 text-sm">
              Meat Patty, Lettuce, Tomato, Onions, Chedder Cheese{" "}
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/5"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Lunch</span>
          </div>
        </div>

        <div className=" lg:bg-primary md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/Fish-and-chips.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Fish and Chips </span>
            <span className=" block text-slate-700 text-sm">
              Salmon, French Fries, Lemon{" "}
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/6"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Lunch</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/lasagna.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Lasagna </span>
            <span className=" block text-slate-700 text-sm">
              Pasta, Meat, Onions, Tomato Sauce, White Sauce{" "}
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/7"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Lunch</span>
          </div>
        </div>

        <div className=" lg:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/mini-beef-wellingtons.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Mini Beef Wellingtons </span>
            <span className=" block text-slate-700 text-sm">Beef, Bread</span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/8"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Lunch</span>
          </div>
        </div>

        <div className=" bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/hamburg-steak.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Hamburg Steak </span>
            <span className=" block text-slate-700 text-sm">
              Meat Patty, Roasted Potatos, Vegies{" "}
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/9"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Lunch</span>
          </div>
        </div>

        <div className=" lg:bg-primary xs:bg-primary md:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/ham-eggs-fried.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Ham and Eggs </span>
            <span className=" block text-slate-700 text-sm">
              Ham, Egg, French Fries
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/10"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Dinenr</span>
          </div>
        </div>

        <div className=" xs:bg-sand md:bg-primary rounded  overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/beef-stew.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Beef Stew </span>
            <span className=" block text-slate-700 text-sm">
              Beef, Potato, Carrot
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/11"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Dinner</span>
          </div>
        </div>

        <div className=" bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/england-fish-pie.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">England Fish Pie </span>
            <span className=" block text-slate-700 text-sm">Beef, Bread</span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/12"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Dinner</span>
          </div>
        </div>

        <div className=" bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/classic-meatloaf.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Classic Meatloaf </span>
            <span className=" block text-slate-700 text-sm">
              Meat, Mashed Potatoes, peas, bread
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/13"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Dinner</span>
          </div>
        </div>

        <div className=" md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/Latte.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Coffee Latte</span>
            <span className=" block text-slate-700 text-sm">Coffee, Milk</span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/14"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Drink</span>
          </div>
        </div>

        <div className=" lg:bg-sand md:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/strawberry.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Strawberry Smoothie</span>
            <span className=" block text-slate-700 text-sm">
              Strawberry, Milk, Ice
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/15"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Drink</span>
          </div>
        </div>

        <div className=" bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/mixed-burries-with-yogurt.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Mixed Burries with Yogurt</span>
            <span className=" block text-slate-700 text-sm">
              Raspberries, Strawberry, Yogurt
            </span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/16"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Drink</span>
          </div>
        </div>

        <div className=" lg:bg-primary xs:bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/pepsi.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Cola</span>
            <span className=" block text-slate-700 text-sm">Pepsi</span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/17"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Drink</span>
          </div>
        </div>

        <div className=" lg:bg-primary md:bg-sand xs:bg-primary rounded overflow-hidden shadow-md m-5 p-8 relative">
          <Image
            src={require("./images/menu/Coffe.png")}
            alt="waffle"
            className="w-full h-32 sm:h-48 object-cover rounded-lg"
          />
          <div className=" m-4">
            <span className=" font-bold">Dark Coffee</span>
            <span className=" block text-slate-700 text-sm">Coffee</span>
          </div>
          <div>
            <Link
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
              href="/Menu/18"
            >
              View
            </Link>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
            <span>Drink</span>
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

export default Menu;
