"use client";
import React from "react";
import SideBar from "@/containers/SideBar";
import MainContentArea from "@/containers/MainContentArea";
import { Provider } from "react-redux";
import store from "@/store";

const ClientLayout = () => {
  return (
    <Provider store={store}>
      <div className="w-full flex">
        <SideBar />
        <MainContentArea />
      </div>
    </Provider>
  );
};

export default ClientLayout;
