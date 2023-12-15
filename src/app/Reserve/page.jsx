import React from "react";
import Navbar from "../components/NavBar";

function Reserve() {

  return (
    <div className="Reserve bg-sky">
      <Navbar/>
      <div className="container mx-auto px-4 h-max mt-7 ">
        <p className="text-5xl text-center font-extrabold mb-4 text-primary-dark">
          {" "}
          RESERVATION
        </p>
        <form>
          <label className=" block font-bold mb-2 text-primary">
            CHECK-IN DATE
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-400"
            type="date"
            id="check-in-date"
          />

          <label className="block font-bold mb-2 text-primary">
            CHECK-OUT DATE
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-400"
            type="date"
            id="check-out-date"
          />

          <label className="block font-bold mb-2 text-primary">ROOM TYPE</label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-400"
            id="room-type"
          >
            <option value="PoolRoom">Pool Room</option>
            <option value="SuperiorRoom">Superior Room</option>
            <option value="DeluxeSeaViewSuit">Deluxe Sea view Suit</option>
            <option value="DeluxeResortSuite">Deluxe Resort Suite</option>
          </select>

          <label className="block font-bold mb-2 text-primary">
            NUMBER OF GUESTS
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 bg-gray-400"
            type="number"
            id="number-of-guests"
            max={6}
          />

          <button
            
            className="bg-sand hover:bg-primary text-white font-bold text-xl py-2 px-4 rounded h-12 w-32 mt-10 mb-96 mr-8"
          >
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reserve;
