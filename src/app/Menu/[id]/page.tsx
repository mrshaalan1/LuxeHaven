import Navbar from "../../components/NavBar";
import Image from "next/image";
export default function Page() {
  return (
    <div className="bg-sky">
      <Navbar />
      <div className="container mx-auto px-4 h-max mt-7 ">
        <p className="text-5xl text-center font-extrabold mb-4 text-primary-dark">
          {" "}
          Hamburger
        </p>
      </div>
      <div className="bg-sand mt-5 mx-96 relative flex">
        <div className="">
        <Image
            src={require("../images/menu/hamburgers.png")}
            alt="Omelet"
            className="w-full h-3/5 object-cover"
          />
          <div>
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-3 ml-3 shadow-md justify-normal flex">
            <span>BreakFast</span>
          </div>
        </div>
      </div>
    </div>
  );
}
