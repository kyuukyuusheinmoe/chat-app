"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { disconnectFromSocketServer } from "@/services/socketService";
import { RootState } from "@/store";
import MessageListContainer from "./MessageListContainer";
import { updateActiveRoom, updateMessages } from "@/store/ChatRoomReducer";
import useSocket from "@/hooks/useSocket";
import { MessageProp } from "@/utils/types";
import useSWR from "swr";
import { messageListFetcher } from "@/services/messageService";

const MainContentArea = () => {
  const { rooms, activeRoom } = useSelector(
    (state: RootState) => state.chatRoom
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [localmessages, setLocalMessages] = useState<MessageProp[]>(
    activeRoom?.messages || []
  );

  const socket = useSocket("http://localhost:5000");

  console.log("xxx localmessages ", localmessages);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("my_message", (message: MessageProp) => {
      console.log("xxx dispatching message ", message);

      setLocalMessages((messages) => [...messages, message]);
    });

    return () => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [localmessages]);

  return (
    <div className="h-screen bg-middle flex flex-col relative">
      {/** Chat Message List */}

      <MessageListContainer
        messages={[
          // ...(activeRoom?.messages || []),
          // ...localmessages,
          ...localmessages.filter((m) => m.groupId === activeRoom?.id),
        ]}
      />
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
