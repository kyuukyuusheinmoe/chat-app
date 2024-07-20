"use client";
import React, { useState, useEffect } from "react";
import { userListFetcher } from "@/services/userService";
import { updateActiveRoom } from "@/store/ChatRoomReducer";
import { useDispatch } from "react-redux";
import { createChatRoom } from "@/services/chatRoomService";
import { IoMdCheckmark } from "react-icons/io";

type SideSearchContainerProps = {
  onSearchHandle: (status: boolean) => void;
  friendListMutate: any
};

const SideSearchContainer = ({ onSearchHandle, friendListMutate }: SideSearchContainerProps) => {
  const [inputValue, setInputValue] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
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

  const handleCreateRoom = async () => {
    const res = await createChatRoom({
      name: `Group with ${selectedFriends?.join(",")}`,
      members: selectedFriends,
    });
    if (res.success) {
      dispatch(updateActiveRoom(res.data));
      friendListMutate()
      onSearchHandle(false);

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
      {friendList?.length > 0 && (
        <>
          <div className="flex-grow overflow-y-auto">
            <ul id="chatHistory" className="p-2 space-y-2">
              {friendList.map(
                (user: { id: number; name?: string; email: string }) => (
                  <li
                    onClick={() => {
                      setSelectedFriends((friends) =>
                        friends.includes(user.id)
                          ? friends.filter((f) => f !== user.id)
                          : [...friends, user.id]
                      );
                    }}
                    className="flex justify-between p-2 bg-gray-600 rounded cursor-pointer"
                    key={user.id}>
                    <div className="w-4/5 truncate">
                      {user?.name || user.email}
                    </div>
                    {selectedFriends.includes(user.id) && <IoMdCheckmark />}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex justify-between px-4">
            <button
              type="button"
              className="p-2 border border-accGreen rounded"
              onClick={() => onSearchHandle(false)}>
              Cancel
            </button>
            <button
              className="p-2 bg-accGreen rounded"
              onClick={handleCreateRoom}
              disabled={selectedFriends.length <= 0}>
              Create
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SideSearchContainer;
