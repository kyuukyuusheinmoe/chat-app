import React from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-middle text-sm text-white font-medium">
      <Image src="/logo.png" width="40" height="40" alt="logo" />
      <h4 className=" my-4">Welcome to ChatGPT</h4>
      <h5 className=" mb-4"> Log in with your OpenAI account to continue</h5>
      <div className="flex gap-6">
        <Link href={"/auth/login"}>
          <button className="p-2 bg-accGreen  rounded">Log in</button>
        </Link>
        <Link href={"/auth/signup"}>
          <button className="p-2 bg-accGreen  rounded">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
