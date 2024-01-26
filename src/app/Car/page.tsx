"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import Skeleton from "@/app/components/Skeleton";

function Car() {
  interface CarObject {
    car: {
      _id: number;
      CarPic: string;
      CarName: string;
      CarDescription: string;
      CarBrand: string;
      CarPrice: number;
    }[];
  }

  const [cars, setCars] = useState<CarObject | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/cars/car")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCars(data);
        const uniqueBrands = Array.from(
          new Set(data.car.map((car: { CarBrand: string }) => car.CarBrand))
        ) as string[];
        setBrands(uniqueBrands);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setError(error);
      });
  }, []);

  if (error) return "An error occurred.";

  return (
    <div className="Menu bg-sky">
      <Navbar />

      <div className="flex justify-center mb-5 mt-10">
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered join-item bg-gray-200 text-black"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            className="select select-bordered join-item text-gray-700 hover:bg-gray-300 bg-gray-200"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option disabled selected>
              Filter
            </option>
            {brands.map((brand, index) => (
              <option key={index}>{brand}</option>
            ))}
          </select>

          <select
            className="select select-bordered join-item text-gray-700 hover:bg-gray-300 bg-gray-200"
            onChange={(e) => setSort(e.target.value)}
          >
            <option disabled selected>
              Sort
            </option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
          </select>
          <button
            className="btn join-item bg-gray-200 hover:bg-gray-300 text-black"
            onClick={() => {
              setFilter("");
              setSort("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1">
        {cars
          ? cars.car
              .filter((car) => car.CarBrand === filter || filter === "")
              .filter((car) =>
                car.CarName.toLowerCase().includes(query.toLowerCase())
              )
              .sort((a, b) => {
                if (sort === "asc") return a.CarPrice - b.CarPrice;
                else if (sort === "desc") return b.CarPrice - a.CarPrice;
                else return 0;
              })
              .map(
                ({
                  _id,
                  CarPic,
                  CarName,
                  CarDescription,
                  CarBrand,
                  CarPrice,
                }) => (
                  <>
                    <div
                      key={_id}
                      className="rounded-2xl overflow-hidden shadow-md m-5 p-3 relative"
                      style={{
                        backgroundColor: "#02a696",
                      }}
                    >
                      <Link href={"http://localhost:3000/Car/" + _id}>
                        <Image
                          src={"data:image/png;base64," + CarPic}
                          alt={CarName}
                          className="w-full h-64 object-cover rounded-lg cursor-pointer"
                          height={500}
                          width={500}
                        />
                      </Link>

                      <div className=" m-4">
                        <span className=" font-bold">{CarName} </span>
                        <span className=" block text-slate-700 text-sm">
                          {CarDescription}{" "}
                        </span>
                      </div>

                      <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
                        <span>{CarBrand}</span>
                      </div>
                      <div className="bg-primary text-sky text-xs uppercase font-bold rounded-full p-2 absolute bottom-24 right-5 mt-4 ml-1 shadow-md">
                        <span>${CarPrice}/Day</span>
                      </div>
                    </div>
                  </>
                )
              )
          : Array.from({ length: 5 }).map((_, idx) => <Skeleton key={idx} />)}
      </div>
      <div className="pb-24"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Car;
