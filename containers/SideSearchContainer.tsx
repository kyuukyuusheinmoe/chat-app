"use client";
import React, { useState, useEffect } from "react";
import { friendListFetcher } from "@/services/userService";
import { updateActiveRoom } from "@/store/ChatRoomReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SideSearchContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [friendList, setFriendList] = useState([]);
  const activeRoom = useSelector((state: RootState) => state.chatRoom);

  const handleFriendList = async () => {
    setTimeout(async () => {
      if (inputValue.length > 2) {
        const result = await friendListFetcher(inputValue);
        if (result.success) {
          setFriendList(result.data);
        }
      }
    }, 2000);
  };

  useEffect(() => {
    handleFriendList();
  }, [inputValue]);

  return (
    <div>
      <input
        value={inputValue}
        name="searchInput"
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-4 border border-[#303139] rounded bg-[#40414E] focus:outline-none text-white"
        placeholder="Type something..."
      />
      <div className="flex-grow overflow-y-auto">
        <ul id="chatHistory" className="p-4 space-y-2">
          {friendList.map(
            (user: { id: number; name?: string; email: string }) => (
              <li
                className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 truncate"
                key={user.id}>
                {user?.name || user.email}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideSearchContainer;
