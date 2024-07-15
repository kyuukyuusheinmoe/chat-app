"use client";
import Input from "@/app/components/Input";
import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const RegisterForm = () => {
  const methods = useForm<FormValues>({});
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("xxx submission data ", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-sm items-center justify-center ">
        <Controller
          name="email"
          render={({ field }) => (
            <Input type="email" placeholder="Email" {...field} />
          )}
        />

        <Controller
          name="password"
          render={({ field }) => (
            <Input type="password" placeholder="Password" {...field} />
          )}
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
