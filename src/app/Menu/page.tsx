"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

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
  const [cart, setCart] = useState<Item[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [dishs, setDishs] = useState<DishObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  interface Item {
    RestaurantItemId: number;
    RestaurantItemName: string;
    RestaurantItemPrice: number;
  }

  const toggleCart = () => {
    setShowCart(!showCart);
    let cartContent = "";
    cart.forEach((item) => {
      cartContent += `<p>${item.RestaurantItemName}: $${item.RestaurantItemPrice}</p>`;
    });
    const total = cart.reduce(
      (accumulator, item) => accumulator + item.RestaurantItemPrice,
      0
    );
    Swal.fire({
      title: "Your Order",
      html: `${cartContent}<p>Total: $${total}</p>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Order!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Ordered!",
          text: "Items Ordered Successfully",
          icon: "success",
        });
      }
    });
  };

  const addToCart = (item: any) => {
    message.success(item.RestaurantItemName + " Was Added");
    setCart([...cart, item]);
  };

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
        <FontAwesomeIcon
          onClick={toggleCart}
          className="fixed bottom-10 right-12 z-50 bg-sand p-5 rounded-lg"
          icon={faShoppingCart}
          size="2xl"
        />
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
                RestaurantItemPrice,
              }) => (
                <>
                  <div
                    key={RestaurantItemId}
                    className=" rounded-2xl overflow-hidden shadow-xl m-5 p-3 relative"
                    style={{
                      backgroundColor: "#009688",
                    }}
                  >
                    <Image
                      src={RestaurantItempPicUrl}
                      alt={RestaurantItemName}
                      className="w-full h-52 object-cover rounded-lg cursor-pointer"
                      height={500}
                      width={500}
                      onClick={() =>
                        addToCart({
                          RestaurantItemId,
                          RestaurantItemName,
                          RestaurantItemPrice,
                        })
                      }
                    />
                    <div className=" m-4">
                      <span className=" font-bold">{RestaurantItemName}</span>
                      <span className=" block text-zinc-200 text-sm ">
                        {RestaurantItemIngredient}{" "}
                      </span>
                    </div>
                    <div className="bg-primary text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-4 ml-1 shadow-md">
                      <span>{RestaurantItemType}</span>
                    </div>
                    <div className="bg-primary text-sky text-s uppercase font-bold rounded-full p-2 absolute bottom-24 right-5 mt-4 ml-1 shadow-md">
                      <span>${RestaurantItemPrice}</span>
                    </div>
                  </div>
                </>
              )
            )}
      </div>
      {showCart && (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <h2>{item.RestaurantItemName}</h2>
              <p>${item.RestaurantItemPrice}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pb-24"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Menu;
