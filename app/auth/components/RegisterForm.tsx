"use client";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const RegisterForm = () => {
  const methods = useForm<FormValues>({});
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("xxx submission data ", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lex flex-col max-w-sm items-center justify-center ">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4 hover:border-red-400 focus:border-red-400 focus:outline-none"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4 hover:border-red-400 focus:border-red-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full p-2 bg-accGreen text-white rounded mb-4">
          Register
        </button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
