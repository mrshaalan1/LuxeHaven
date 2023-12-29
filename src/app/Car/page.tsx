"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Footer from "@/app/components/Footer";

function Car() {
 interface CarObject {
   car: {
     CarId: number;
     CarPicUrl: string;
     CarName: string;
     CarDescription: string;
     CarBrand: string;
     CarPrice: number;
   }[];
 }

 const [cars, setCars] = useState<CarObject | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [filter, setFilter] = useState('');
 const [sort, setSort] = useState('');
 const [query, setQuery] = useState('');

 useEffect(() => {
   fetch("http://localhost:3000/api/cars/car")
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       setCars(data);
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
         Our Car Collection
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
           <option disabled selected>Filter</option>
           <option>BMW</option>
           <option>whatsapp</option>
           <option>test</option>
           <option>batata</option>

         </select>
         <select 
           className="select select-bordered join-item text-gray-700 hover:bg-gray-300 bg-gray-200"
           onChange={(e) => setSort(e.target.value)}
         >
           <option disabled selected>Sort</option>
           <option value="asc">Price Ascending</option>
           <option value="desc">Price Descending</option>
         </select>
         <button className="btn join-item bg-gray-200 hover:bg-gray-300 text-black" onClick={() => {setFilter(''); setSort('')}}>Clear Filters</button>
       </div>
     </div>
     <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1">
       {cars &&
         cars.car
         .filter((car) => car.CarBrand === filter || filter === '')
         .filter((car) => car.CarName.toLowerCase().includes(query.toLowerCase()))
         .sort((a, b) => {
             if(sort === 'asc') return a.CarPrice - b.CarPrice;
             else if(sort === 'desc') return b.CarPrice - a.CarPrice;
             else return 0;
           })
           .map(({
             CarId,
             CarPicUrl,
             CarName,
             CarDescription,
             CarBrand,
           }) => (
             <>
               <div
                key={CarId}
                className="bg-sand rounded overflow-hidden shadow-md m-5 p-8 relative"
               >
                <Image
                  src={CarPicUrl}
                  alt={CarName}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg"
                  height={500}
                  width={500}
                />

                <div className=" m-4">
                  <span className=" font-bold">{CarName} </span>
                  <span className=" block text-slate-700 text-sm">
                    {CarDescription}{" "}
                  </span>
                </div>
                <div>
                    <Link
                      className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-primary-dark hover:bg-sky rounded-full bg-primary absolute  bottom-4 right-4"
                      href="/Car/1"
                    >
                      View
                    </Link>
                  </div>
                  <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-9 ml-1 shadow-md">
                    <span>{CarBrand}</span>
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

export default Car;
