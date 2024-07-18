"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  disconnectFromSocketServer,
  handleGroupJoinEvent,
  connectToSocketServer,
  handleIncomingMessage,
} from "@/services/socketService";
import { RootState } from "@/store";
import { handleSendMessage } from "@/services/socketService";

const MainContentArea = () => {
  const { activeRoom } = useSelector((state: RootState) => state.chatRoom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleGroupJoin = async (groupId: number) => {
    console.log("xxx handleSocket");
    handleGroupJoinEvent(groupId);
  };

  console.log("xxx activeRoom ", activeRoom);

  const handleMessage = () => {
    setMessage(message);
  };

  useEffect(() => {
    if (activeRoom) {
      // connectToSocketServer();
      // handleGroupJoinEvent(activeRoom.id);
      handleSendMessage({
        groupId: activeRoom.id,
        content: "No Message",
        receiverId: activeRoom?.members?.[0].id,
      });
    }
    // handleIncomingMessage();
  }, [activeRoom]);

  const onSendMessage = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (activeRoom?.members && activeRoom?.members.length > 0) {
      console.log("xxx onSendMessage ", activeRoom?.members[0]?.id);
    }
  };

  return (
    <div className="bg-middle flex-grow flex flex-col relative">
      <div className="flex-grow p-4 overflow-y-auto">
        <h1 className="text-white text-xl"> {message} </h1>
      </div>
      <div className="w-[80%] mx-auto mb-10">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            id="promptInput"
            className="w-full p-4 border border-[#303139] rounded bg-[#40414E] focus:outline-none text-white"
            placeholder="Type your message here..."
          />
          <button className="p-2 bg-accGreen  rounded" onClick={onSendMessage}>
            {" "}
            Send{" "}
          </button>
        </div>

        <p className="text-grayFP">
          ChatGPT Jan 9 Version. Free Research Preview. Our goal is to make AI
          systems more natural and safe to interact with. Your feedback will
          help us improve.
        </p>
      </div>
    </div>
  );
};

export default MainContentArea;
