import ChatMessage from "@/components/ChatMessage";
import React from "react";
import moment from "moment";
import clsx from "clsx";
import { MessageProp } from "@/utils/types";

const MessageListContainer = ({ messages }: { messages: MessageProp[] }) => {
  console.log("xxx MessageListContainer ", messages);

  const formatMessage = () => {
    if (messages?.length > 0) {
      const messagesWithDate = messages.map((m: any) => ({
        ...m,
        createdAt: moment(m.createdAt).format("YYYY-MM-DD"),
      }));

      return messagesWithDate?.reduce(
        (acc: { [key: string]: MessageProp[] }, item: MessageProp) => {
          console.log("xxx acc ", item.createdAt);

          if (acc?.[item.createdAt]) {
            acc[item.createdAt] = [...acc[item.createdAt], item];
          } else {
            acc[item.createdAt] = [item];
          }
          return acc;
        },
        {}
      );
    }
    return {};
  };

  const messageGroups: { [key: string]: MessageProp[] } = formatMessage();

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
                  <ChatMessage
                    name={m.Sender?.name || m.name || "U"}
                    message={m.content}
                  />
                </div>
              ))}
            </>
          )
        )}
    </div>
  );
};

export default MessageListContainer;
