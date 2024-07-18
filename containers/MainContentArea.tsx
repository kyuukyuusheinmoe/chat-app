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
import ChatMessage from "@/components/ChatMessage";
import MessageListContainer from "./MessageListContainer";

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
    }
    // handleIncomingMessage();
  }, [activeRoom]);

  const onSendMessage = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      activeRoom?.members &&
      activeRoom?.members.length > 0 &&
      inputRef?.current?.value
    ) {
      console.log("xxx onSendMessage ", inputRef?.current?.value);
      handleSendMessage({
        groupId: activeRoom.id,
        content: inputRef?.current?.value || "No Message",
        receiverId: activeRoom?.members?.[0].id,
      });
      inputRef.current.value = "";
    }
  };

  return (
    <div className="h-screen bg-middle flex flex-col relative">
      {/** Chat Message List */}
      <MessageListContainer />
      <div className="w-[80%] mx-auto my-10">
        <div className="flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            id="promptInput"
            className="w-full p-4 border border-[#303139] rounded bg-[#40414E] focus:outline-none text-white"
            placeholder="Type your message here..."
          />
          <button
            className="absolute right-4 p-2 bg-accGreen  rounded"
            onClick={onSendMessage}>
            Send
          </button>
        </div>

        <p className="text-grayFP text-sm">
          ChatGPT Jan 9 Version. Free Research Preview. Our goal is to make AI
          systems more natural and safe to interact with. Your feedback will
          help us improve.
        </p>
      </div>
    </div>
  );
};

export default MainContentArea;
