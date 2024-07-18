"use client";
import React, { useState, useEffect } from "react";
import { userListFetcher } from "@/services/userService";
import { updateActiveRoom } from "@/store/ChatRoomReducer";
import { useDispatch } from "react-redux";
import { createChatRoom } from "@/services/chatRoomService";

const SideSearchContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [friendList, setFriendList] = useState([]);
  const dispatch = useDispatch();

  const handleFriendList = async () => {
    setTimeout(async () => {
      if (inputValue.length > 2) {
        const result = await userListFetcher(inputValue);
        if (result.success) {
          setFriendList(result.data);
        }
      }
    }, 2000);
  };

  useEffect(() => {
    handleFriendList();
  }, [inputValue]);

  const handleUserItemClick = async (user: {
    id: number;
    name?: string;
    email: string;
  }) => {
    const res = await createChatRoom({
      name: `Group with ${user?.name || user.email}`,
      members: [user.id],
    });
    if (res.success) {
      dispatch(updateActiveRoom(res.data));
    }
  };

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
        <ul id="chatHistory" className="p-2 space-y-2">
          {friendList.map(
            (user: { id: number; name?: string; email: string }) => (
              <li
                onClick={(id) => handleUserItemClick(user)}
                className="p-2 bg-grayIc rounded cursor-pointer hover:bg-gray-600 truncate"
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
