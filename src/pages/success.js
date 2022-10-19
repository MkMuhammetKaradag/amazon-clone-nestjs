import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
const success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen ">
      <Header></Header>
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white ">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10"></CheckCircleIcon>
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default success;
