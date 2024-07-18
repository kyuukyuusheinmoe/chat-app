import ChatMessage from "@/components/ChatMessage";
import React from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { messageListFetcher } from "@/services/messageService";
import moment from "moment";
import clsx from 'clsx'

type MessageProp = {
  id: number;
  content: string;
  createdAt: string;
  Sender: { name: string };
};
const MessageListContainer = () => {
  const { activeRoom } = useSelector((state: RootState) => state.chatRoom);
  const { data } = useSWR(
    activeRoom?.id ? `/message/${activeRoom?.id}` : null,
    messageListFetcher
  );

  const formatMessage = () => {
    const messagesWithDate = data?.data?.map((m: any) => ({
      ...m,
      createdAt: moment(m.createdAt).format("YYYY-MM-DD"),
    }));

    return messagesWithDate?.reduce(
      (acc: { [key: string]: MessageProp[] }, item: MessageProp) => {
        if (acc?.[item.createdAt]) {
          acc[item.createdAt] = [...acc[item.createdAt], item];
        } else {
          acc = { [item.createdAt]: [item] };
          console.log("xxx acc for first time ", acc);
        }
        return acc;
      }
    );
  };

  const messageGroups: { [key: string]: MessageProp[] } = formatMessage();

  console.log("xxx messageGroups ", messageGroups);

  return (
    <div className="h-4/5 overflow-y-scroll">
      {messageGroups &&
        Object.entries(messageGroups)?.map(
          ([key, value]: [key: string, value: MessageProp[]]) => (
            <>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow w-28 border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500">{key}</span>
                <div className="flex-grow w-28 border-t border-gray-300"></div>
              </div>
              {value?.map((m: MessageProp) => (
                <div
                  className={clsx("flex items-center space-x-4 p-4", {
                    "flex-row-reverse": m.self,
                  })}>
                  <ChatMessage name={m.Sender.name} message={m.content} />
                </div>
              ))}
            </>
          )
        )}
    </div>
  );
};

export default MessageListContainer;
