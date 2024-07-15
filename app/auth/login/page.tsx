import React from "react";
import Image from "next/image";
import ReCaptcha from "@/app/components/Capcha";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col max-w-sm items-center justify-center min-h-screen mx-auto bg-white">
      <Image src="/chat-gpt-black.png" width="40" height="40" alt="logo" />
      <h1 className="text-2xl my-4 text-center font-bold">Welcome Back</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded mb-4 hover:border-red-400 focus:border-red-400 focus:outline-none"
      />

      <div className="flex justify-center mb-4">
        <ReCaptcha />
      </div>

      <button
        // onClick={handleLogin}
        className="w-full p-2 bg-accGreen text-white rounded mb-4">
        Continue
      </button>

      <div className="text-center">
        <p>
          Don't have an account?
          <Link href="/auth/signup" className="ml-2 text-accGreen">
            Sign Up
          </Link>
        </p>
      </div>
      {/** Horizontal line */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow w-28 border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500">OR</span>
        <div className="flex-grow w-28 border-t border-gray-300"></div>
      </div>
      <button className="my-2 flex gap-4 items-center w-full h-full p-2 border border-[#C3C8CF] text-[#2E3339] rounded">
        <Image src="/google.png" width="20" height="20" alt="logo" />
        Login with Google
      </button>
      <button className="my-2 flex gap-4 w-full items-center h-full p-2 border border-[#C3C8CF] text-[#2E3339] rounded">
        <Image src="/microsoft.png" width="20" height="20" alt="logo" />
        Login with Microsoft
      </button>
    </div>
  );
};

export default Page;
