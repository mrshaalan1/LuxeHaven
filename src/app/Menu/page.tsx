"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";

function Menu() {
  interface DishObject {
    dish: {
      RestaurantItemId: number;
      RestaurantItempPicUrl: string;
      RestaurantItemName: string;
      RestaurantItemIngredient: string;
      RestaurantItemType: string;
      RestaurantItemPrice: number;
    }[];
  }

  const [dishs, setDishs] = useState<DishObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/menu/dish")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDishs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "An error occurred.";

  return (
    <div className="Menu bg-sky">
      <Navbar />

      <div>
        <h1 className=" text-6xl text-primary flex justify-center font-sans font-semibold py-5">
          {" "}
          Our Menu
        </h1>
      </div>
      <div className="flex justify-center">
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
            <option>BREAKFAST</option>
            <option>LUNCH</option>
            <option>DINNER</option>
            <option>DRINK</option>
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
        {dishs &&
          dishs.dish
            .filter(
              (dish) => dish.RestaurantItemType === filter || filter === ""
            )
            .filter((dish) =>
              dish.RestaurantItemName.toLowerCase().includes(
                query.toLowerCase()
              )
            )
            .sort((a, b) => {
              if (sort === "asc")
                return a.RestaurantItemPrice - b.RestaurantItemPrice;
              else if (sort === "desc")
                return b.RestaurantItemPrice - a.RestaurantItemPrice;
              else return 0;
            })
            .map(
              ({
                RestaurantItemId,
                RestaurantItempPicUrl,
                RestaurantItemName,
                RestaurantItemIngredient,
                RestaurantItemType,
              }) => (
                <>
                  <div
                    key={RestaurantItemId}
                    className="rounded overflow-hidden shadow-md m-5 p-8 relative"
                    style={{
                      backgroundColor:
                        RestaurantItemId % 2 === 0 ? "#F7B771" : "#0A8790",
                    }}
                  >
                    <Image
                      src={RestaurantItempPicUrl}
                      alt={RestaurantItemName}
                      className="w-full h-32 sm:h-48 object-cover rounded-lg"
                      height={500}
                      width={500}
                    />
                    <div className=" m-4">
                      <span className=" font-bold">{RestaurantItemName} </span>
                      <span className=" block text-slate-700 text-sm">
                        {RestaurantItemIngredient}{" "}
                      </span>
                    </div>
                    <div>
                      <Link
                        className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute bottom-4 right-4"
                        href={`/Menu/${RestaurantItemId}`}
                      >
                        View
                      </Link>
                    </div>
                    <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
                      <span>{RestaurantItemType}</span>
                    </div>
                  </div>
                </>
              )
            )}
      </div>
      <div className="pb-24"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Menu;
