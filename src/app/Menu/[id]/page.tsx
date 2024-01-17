"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/NavBar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function Page() {
  interface Dish {
    RestaurantItemId: number;
    RestaurantItempPicUrl: string;
    RestaurantItemName: string;
    RestaurantItemIngredient: string;
    RestaurantItemType: string;
    RestaurantItemPrice: number;
    RestaurantItemDescription: string;
  }

  const { id } = useParams();
  const [dishs, setDishs] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/menu/dish/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setDishs(data.dish);
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
  }, [id]);

  if (loading) return "Loading...";
  if (error) return "An error occurred.";

  return (
    <div className="bg-sky">
      <Navbar />
      {dishs && (
        <div>
          <div className="container mx-auto px-4 h-max mt-7 ">
            <p className="text-5xl text-center font-extrabold mb-4 text-primary-dark">
              {" "}
              {dishs.RestaurantItemName}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-sand mt-5 xl:mx-10 relative">
            <div className="overflow-hidden info-details">
                <Image
                  src={dishs.RestaurantItempPicUrl}
                  alt={dishs.RestaurantItemName}
                  className="w-full object-cover rounded-lg"
                  height={1000}
                  width={1000}
                />
              </div>
              <div className="bg-primary-dark text-sky text-s uppercase font-bold rounded-full p-2 absolute top-0 mt-3 ml-3 shadow-md">
                <span>{dishs.RestaurantItemType}</span>
              </div>
              <div>
                <div className="bg-primary-dark text-sky text-s uppercase font-bold rounded-full p-2 absolute mb-3 mr-3 shadow-md bottom-0 right-0 flex">
                  <span>Price: {dishs.RestaurantItemPrice}$</span>
                </div>
              </div>
            </div>
            <div className="md:pt-28 text-xl text-gray-700">
              <p>{dishs.RestaurantItemDescription}</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-11 w-full flex justify-between">
        <Link
          className="bg-red-700 text-sky text-s uppercase font-bold rounded-full p-2"
          href="/Menu"
        >
          Go Back
        </Link>
        <Link
          className="bg-green-600 text-sky text-s uppercase font-bold rounded-full p-2 shadow-md"
          href="/Menu"
        >
          Order
        </Link>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
