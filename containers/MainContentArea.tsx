"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  disconnectFromSocketServer,
  handleGroupJoinEvent,
} from "@/services/socketService";
import { RootState } from "@/store";
import MessageListContainer from "./MessageListContainer";
import io from "socket.io-client";
import useSocket from "@/hooks/useSocket";
import { MessageProp } from "@/utils/types";

const MainContentArea = () => {
  const { activeRoom } = useSelector((state: RootState) => state.chatRoom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageProp[]>([]);
  
  const socket = useSocket("http://localhost:5000");

  console.log("xxx socket ", socket);

  useEffect(() => {
    if (!socket.current) return;
    let mounted = true;
    // handleMessage();

    socket.current.on("my_message", (message: MessageProp) => {
      console.log("xxx message received --- ", message);
      setMessages((msgs) => {
        const newMessages = [...msgs, message];
        console.log("Updated messages array:", newMessages); // Log updated messages array
        return newMessages;
      });
    });

    return () => {
      mounted = false;
      disconnectFromSocketServer();
    };
  }, []);


  const handleSendMessage = (data: any) => {
    console.log("xxx sending data ", data);
    socket.current.emit("message", data);
  };

  const onSendMessage = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      activeRoom?.members &&
      activeRoom?.members.length > 0 &&
      inputRef?.current?.value
    ) {
      handleSendMessage({
        groupId: activeRoom.id,
        content: inputRef?.current?.value || "No Message",
        receiverIds: activeRoom?.members?.map((m) => m.id),
      });
      inputRef.current.value = "";
    }
  };

  return (
    <div className="h-screen bg-middle flex flex-col relative">
      {/** Chat Message List */}

      <MessageListContainer messages={messages} />
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
