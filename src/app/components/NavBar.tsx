import React from "react";

const Navbar = () => {
  return (
    <div className="bg-sky">
      <div className="navbar mx-auto max-w-screen-xxl py-10 bg-secendary px-4 lg:px-8 lg:py-7 shadow-lg">
        <div className="flex-1">
          <a className=" btn btn-ghost mr-4 cursor-pointer py-1.5 font-sans font-extrabold hover:text-sand text-4xl navbar-brand" href="/">
            LuxeHaven
          </a>
        </div>
        <ul className="menu menu-horizontal flex-auto">
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Home"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Menu"
            >
              Menu
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Car"
            >
              Car
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Reserve"
            >
              Reserve
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/RoomService"
            >
              RoomService
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
              href="/Admin"
            >
              Admin
            </a>
          </li>
        </ul>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full w-96">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary-dark rounded-box w-52"
            >
              <li>
                <a className="justify-between text-xl">Profile</a>
              </li>
              <li>
                <a className="justify-between text-xl">Settings</a>
              </li>
              <li>
                <a className="justify-between text-xl">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
