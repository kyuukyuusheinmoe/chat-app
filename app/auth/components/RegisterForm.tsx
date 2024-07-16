import { register } from "@/services/authService";
import React from "react";
import Input from "@/components/Input";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  return (
    <form
      action={register}
      className="flex flex-col max-w-sm items-center justify-center ">
      <Input placeholder="User Name" name="name" />
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Input type="hidden" value="Email" name="provider" />

      <button
        type="submit"
        className="w-full p-2 bg-accGreen text-white rounded mb-4">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
