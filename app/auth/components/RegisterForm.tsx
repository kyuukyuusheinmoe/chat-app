"use client";
import Input from "@/app/components/Input";
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
        <Input {...register("email")} type="email" placeholder="Email" />
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
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
