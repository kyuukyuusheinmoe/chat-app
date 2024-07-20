"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const OAuthButton = ({
  link,
  label,
  image,
}: {
  link: string;
  label: string;
  image: string;
}) => {
  return (
    <Link href={link} className="my-2 w-full h-full">
      <button className="w-full flex gap-4 items-center p-2 border border-[#C3C8CF] text-[#2E3339] rounded">
        <Image src={image} width="20" height="20" alt="logo" />
        {label}
      </button>
    </Link>
  );
};

export default OAuthButton;
