"use client";
import React, { useState } from "react";
import SideSearchContainer from "./SideSearchContainer";

const SideBar = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <div
      id="sidebar"
      className="bg-[#202123] text-white h-screen w-64 min-w-64 flex flex-col transition-transform duration-300 transform sidebar-hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Chats</h1>
        <button id="toggleSidebar" className="text-gray-300 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {!isSearching ? (
        <>
          <button
            id="newChat"
            onClick={() => setIsSearching(true)}
            className="border-[1px] border-bright text-white p-2 m-4 rounded">
            <svg
              className="w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"></path>
            </svg>
            New Chat
          </button>
          <div className="flex-grow overflow-y-auto">
            <ul id="chatHistory" className="p-4 space-y-2">
              {/**<!-- Chat history items will go here --> **/}
              <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                Chat 1
              </li>
              <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                Chat 2
              </li>
              {/**<!-- Add more chat items as needed -->**/}
            </ul>
          </div>
        </>
      ) : (
        <SideSearchContainer />
      )}
    </div>
  );
};

export default SideBar;
