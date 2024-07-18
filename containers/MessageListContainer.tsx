import ChatMessage from "@/components/ChatMessage";
import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { messageListFetcher } from "@/services/messageService";

type MessageProp = {
  id: number;
  content: string;
  Sender: { name: string };
};
const MessageListContainer = () => {
  const { activeRoom } = useSelector((state: RootState) => state.chatRoom);
  const { data } = useSWR(
    activeRoom?.id ? `/message/${activeRoom?.id}` : null,
    messageListFetcher
  );
  const messages = data?.data || [];

  return (
    <div className="h-4/5 overflow-y-scroll">
      {messages?.map((m: MessageProp) => (
        <ChatMessage name={m.Sender.name} message={m.content} />
      ))}
    </div>
  );
};

export default MessageListContainer;
