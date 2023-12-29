"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center pt-20 min-h-screen py-2 bg-sky">
        <h1 className="text-4xl text-black uppercase font-medium ">Verify Email</h1>
        <h2 className="bg-primary p-2 m-10 text-sky">
          {token ? `${token}` : "no token"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-2xl m-10 p-2 bg-green-500 text-sky uppercase">Email Verified</h2>
            <Link className="m-16 p-2 text-black uppercase" href="/">Go To Home</Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl p-2 bg-red-600 text-black">Error</h2>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
