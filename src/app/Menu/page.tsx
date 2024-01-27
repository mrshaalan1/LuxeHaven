"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import Skeleton from "@/app/components/Skeleton";
import axios from "axios";

interface DishObject {
  dish: {
    _id: number;
    RestaurantItempPic: string;
    RestaurantItemName: string;
    RestaurantItemIngredient: string;
    RestaurantItemType: string;
    RestaurantItemPrice: number;
  }[];
}
declare global {
  interface Window {
    clearCart: () => void;
  }
}

interface Item {
  _id: number;
  RestaurantItemName: string;
  RestaurantItemPrice: number;
  quantity?: number;
}

let swalInstance: any;

function Menu() {
  const [cart, setCart] = useState<Item[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [dishs, setDishs] = useState<DishObject | null>(null);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");

  const addToCart = (item:any) => {
    message.success(item.RestaurantItemName + " Was Added");
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem._id === item._id);
      if (itemExists) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 0) + 1,
                menuItemId: item._id,
              }
            : cartItem
        );
      } else {
        return [
          ...prevCart,
          {
            ...item,
            quantity: 1,
            menuItemId: item._id,
          },
        ];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
    if (swalInstance) {
      swalInstance.close();
      toggleCart();
    }
  };

  window.clearCart = clearCart;

  const toggleCart = () => {
    setShowCart(!showCart);

    swalInstance = Swal.fire({
      title: "Your Order",
      html: generateCartContent(),
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Order!",
      preConfirm: async () => {
        try {
          const orderData: any = {
            items: cart,
            totalPrice: cart.reduce(
              (acc, item) =>
                acc + item.RestaurantItemPrice * (item.quantity || 1),
              0
            ),
          };
          //TODO: check out no-chache for axios posts :https://stackoverflow.com/questions/49263559/using-javascript-axios-fetch-can-you-disable-browser-cache
          await axios.post("/api/menu/dish/order", orderData);

          window.clearCart();
          return true;
        } catch (error: any) {
          console.error("Error saving order:", error);
          Swal.showValidationMessage(`Error: ${error.message}`);
        }
      },

      footer: '<button id="clearCartButton">Clear Cart</button>',
      didOpen: () => {
        const clearCartButton = document.getElementById("clearCartButton");
        if (clearCartButton) {
          clearCartButton.addEventListener("click", () => {
            window.clearCart();
            Swal.close();
            message.success("Cart Cleared");
          });
        }
      },
    });

    swalInstance.then((result: any) => {
      if (result.isConfirmed) {
        let cartContent = "";
        cart.forEach((item) => {
          cartContent += `<p>${item.RestaurantItemName} X${
            item.quantity ?? 1
          }: $${(item.RestaurantItemPrice * (item.quantity ?? 1)).toFixed(
            2
          )}</p>`;
        });
        const total = cart.reduce(
          (accumulator, item) =>
            accumulator + item.RestaurantItemPrice * (item.quantity ?? 1),
          0
        );

        Swal.fire({
          title: "Ordered!",
          html: `${cartContent}<p>Total: $${total.toFixed(2)}</p>`,
          icon: "success",
        });
      }
    });
  };

  const generateCartContent = () => {
    let cartContent = "";
    cart.forEach((item) => {
      cartContent += `<p>${item.RestaurantItemName} X${item.quantity ?? 1}: $${(
        item.RestaurantItemPrice * (item.quantity ?? 1)
      ).toFixed(2)}</p>`;
    });
    const total = cart.reduce(
      (accumulator, item) =>
        accumulator + item.RestaurantItemPrice * (item.quantity ?? 1),
      0
    );
    return `${cartContent}<p>Total: $${total.toFixed(2)}</p>`;
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/menu/dish")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDishs(data);
        const uniqueBrands = Array.from(
          new Set(
            data.dish.map(
              (dish: { RestaurantItemType: string }) => dish.RestaurantItemType
            )
          )
        ) as string[];
        setTypes(uniqueBrands);
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
      <div></div>
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
            {types.map((type, index) => (
              <option key={index}>{type}</option>
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
        <FontAwesomeIcon
          onClick={toggleCart}
          className="fixed bottom-10 right-12 z-40 bg-sand p-5 rounded-lg"
          icon={faShoppingCart}
          size="2xl"
        />
        <div className="fixed badge badge-primary bottom-24 right-9 text-lg font-bold text-gray-200 z-50">
          {cart.reduce((sum, item) => sum + (item.quantity || 0), 0)}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1">
        {dishs
          ? dishs.dish
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
                  _id,
                  RestaurantItempPic,
                  RestaurantItemName,
                  RestaurantItemIngredient,
                  RestaurantItemType,
                  RestaurantItemPrice,
                }) => (
                  <>
                    <div
                      key={_id}
                      className=" rounded-2xl overflow-hidden shadow-xl m-5 p-3 relative"
                      style={{
                        backgroundColor: "#02a696",
                      }}
                    >
                      <Image
                        src={"data:image/png;base64," + RestaurantItempPic}
                        alt={RestaurantItemName}
                        className="w-full h-52 object-cover rounded-lg cursor-pointer"
                        height={500}
                        width={500}
                        onClick={() =>
                          addToCart({
                            _id,
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
              )
          : Array.from({ length: 6 }).map((_, idx) => <Skeleton key={idx} />)}
      </div>

      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Menu;
