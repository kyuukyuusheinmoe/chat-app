import React from "react";
import ReCaptcha from "@/components/Capcha";
import { login } from "@/services/authService";
import Input from "@/components/Input";

const LoginForm = () => {
  return (
    <form action={login} className="w-full">
      <Input type="email" name="email" placeholder="Email" />

      <div className="flex justify-center mb-4">
        <ReCaptcha />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-accGreen text-white rounded mb-4">
        Continue
      </button>
    </form>
  );
};

export default LoginForm;
