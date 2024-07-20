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

  const socket = useSocket("http://localhost:5000");

  const messages = activeRoom?.messages || [];

  const { data } = useSWR(
    activeRoom?.id ? `/message/${activeRoom?.id}` : null,
    messageListFetcher
  );

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("my_message", (message: MessageProp) => {
      console.log("xxx dispatching message ", message);
      const room = rooms.find((r: any) => r.id === message.groupId);
      dispatch(
        updateMessages({
          roomId: message.groupId,
          messages: [room?.messages || message],
        })
      );
    });

    return () => {
      disconnectFromSocketServer();
    };
  }, []);

  useEffect(() => {
    if (activeRoom?.id) {
      dispatch(
        updateMessages({ roomId: activeRoom.id, message: data?.data || [] })
      );
    }
  }, [data]);

  const handleSendMessage = (data: any) => {
    console.log("xxx sending data ", data);
    socket.current.emit("message", data);
  };
  console.log("xxx global rooms  ", rooms, activeRoom);

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
