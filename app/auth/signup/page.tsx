import React from "react";
import Image from "next/image";
import RegisterForm from "../components/RegisterForm";

const Page = () => {
  return (
    <div className="flex flex-col max-w-sm items-center justify-center min-h-screen mx-auto bg-white">
      <Image src="/chat-gpt-black.png" width="40" height="40" alt="logo" />
      <h1 className="text-2xl my-4 text-center font-bold">
        Register an account
      </h1>
      <RegisterForm />
    </div>
  );
};

export default Page;
