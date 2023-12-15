import React from 'react'
import Image from 'next/image'
import Navbar from "../components/NavBar";

// import Video from 'next-video'
// import home from '../../../videos/home.mp4'


export default function Home() {
  return (
    <main>
        <div className="Home bg-sky">
        <Navbar/>
      <div className="flex">
        {/*------------------------------------------------------------------------------------------------------------------*/}
        
          {/* video to be addedd */}
        {/* <video className=" min-w-full min-h-screen object-cover rounded-lg" autoPlay="{true}" muted loop="{true}">
          <Video src={require("./images/home/home.mp4")} type="video/mp4" className=" aspect-auto" alt="promo"/> 
        </video> */}

        {/*------------------------------------------------------------------------------------------------------------------*/}

      </div>
      <ul className="p-12 grid grid-cols-4 md:gap-14">
        <li className="lg:col-span-3 xs:col-span-4">
        <p className="font-sans font-extrabold text-3xl text-primary-dark ">Find Your Relaxation</p> 
        <br />
        <p className="p-2 font-sans font-normal text-lg text-gray-800"> &nbsp; Your phone and laptop aren’t the only things that need 
        recharging. When’s the last time you escaped for a long weekend tripor better yet, for a week-long vacation 
        in Beirut? Take full advantage of your surroundings by enjoying the health benefits that come with an alluring 
        atmosphere. Here are a few of the many health benefits of being outdoors and enjoying a relaxing week or weekend.</p>
        </li>
        <li className=" lg:col-span-1 col-span-4 md:col-start-2 xs:col-start-1">
        <Image  className="h-56 lg:w-96 xs:w-full object-cover" src={require("./images/home/relaxing.png")} alt="relaxing"/>
        </li>

        <li className="lg:col-span-3 xs:col-span-4">
        <p className="font-sans font-extrabold text-3xl text-primary-dark ">IT STRENGTHENS YOUR IMMUNE SYSTEM</p> 
        <br />
        <p className="p-2 font-sans font-normal text-lg text-gray-800"> &nbsp; Breathing the fresh air–away from the city, out in nature 
        and the open air–can be one of the healthiest things you can do. Those deep breaths of fresh air you can take can 
        help your immune system reset and increase so you can fight off colds and bugs.</p>
        </li>
        <li className=" lg:col-span-1 col-span-4 md:col-start-2 xs:col-start-1">
        <Image className="h-56 lg:w-96 xs:w-full object-cover" src={require("./images/home/breathing.png")} alt="breathing"/>
        </li>

        <li className="lg:col-span-3 xs:col-span-4">
        <p className="font-sans font-extrabold text-3xl text-primary-dark ">IT CAN LOWER YOUR BLOOD PRESSURE</p> 
        <br />
        <p className="p-2 font-sans font-normal text-lg text-gray-800"> &nbsp;Doctors say fresh air helps with many health challenges 
        people face, like high blood pressure and heart rates. By spending times outdoors, you may see your blood pressure 
        and heart rate decrease.</p>
        </li>
        <li className=" lg:col-span-1 col-span-4 md:col-start-2 xs:col-start-1">
        <Image  className="h-56 lg:w-96 xs:w-full object-cover" src={require("./images/home/blood.png")} alt="blood"/>
        </li>

        <li className="lg:col-span-3 xs:col-span-4">
        <p className="font-sans font-extrabold text-3xl text-primary-dark ">ALLOWS YOUR BODY TO HEAL AND RECOVER</p> 
        <br />
        <p className="p-2 font-sans font-normal text-lg text-gray-800"> &nbsp;  When you rest, your body can recover and heal. Your 
        muscles can repair themselves from daily wear and tear or more severe injuries from sports or other activities. 
        Stepping outside of your daily routine and participating in activities that may not be your daily norm may be just 
        what you need.</p>
        </li>
        <li className=" lg:col-span-1 col-span-4 md:col-start-2 xs:col-start-1">
        <Image  className="h-56 lg:w-96 xs:w-full object-cover" src={require("./images/home/heal.png")} alt="heal"/>
        </li>

        <li className="lg:col-span-3 xs:col-span-4">
        <p className="font-sans font-extrabold text-3xl text-primary-dark ">RECHARGES YOUR BRAIN</p> 
        <br />
        <p className="p-2 font-sans font-normal text-lg text-gray-800"> &nbsp; It’s easy for the everyday hustle-and-bustle to stack up 
        to-do lists and never-ending thoughts. Utilize your resting time to meditate and allow your thoughts to pass by. 
        Meditation is one of the leading methods used to relieve stress. Your brain can recharge as you take time to rest 
        and relax–and this helps improve your memory and ability to learn.</p>
        </li>
        <li className=" lg:col-span-1 col-span-4 md:col-start-2 xs:col-start-1">
        <Image  className="h-56 lg:w-96 xs:w-full object-cover" src={require("./images/home/brain.png")} alt="brain"/>
        </li>
      </ul>


    </div>
    </main>
  )
}
