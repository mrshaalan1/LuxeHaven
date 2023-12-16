import Navbar from "../../components/NavBar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";

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
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-sand mt-5 xl:mx-10 relative">
          <div className="overflow-hidden">
            <Image
              src={require("../images/menu/hamburgers.png")}
              alt="hamburger"
              className=""
            />
          </div>
          <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute top-0 mt-3 ml-3 shadow-md">
            <span>Lunch</span>
          </div>
          <div>
            <div className="bg-primary-dark text-sky text-xs uppercase font-bold rounded-full p-2 absolute mb-3 mr-3 shadow-md bottom-0 right-0 flex">
              <span>Price: 12.99$</span>
            </div>
          </div>
        </div>
        <div className="md:pt-28 text-xl text-gray-700">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            explicabo voluptates, illum eos architecto accusantium quasi.
            Impedit amet odio fuga deserunt Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Provident explicabo voluptates, illum
            eos architecto accusantium quasi. Impedit amet odio fuga deserunt
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            explicabo voluptates, illum eos architecto accusantium quasi.
            Impedit amet odio fuga deserunt
          </p>
        </div>
      </div>
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
