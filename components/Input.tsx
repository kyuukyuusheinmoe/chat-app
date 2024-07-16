import clsx from "clsx";
import React from "react";

type InputProps = {
  type?: "email" | "password" | "hidden";
  placeholder?: string;
  className?: string;
  name: string;
  value?: string;
};
const Input = ({ type, placeholder, className, ...rest }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={clsx(
        "w-full p-2 border border-gray-300 rounded mb-4 hover:border-accGreen focus:border-accGreen focus:outline-none",
        className
      )}
      {...rest}
    />
  );
};

export default Input;
