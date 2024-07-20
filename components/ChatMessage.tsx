import React from "react";

const ChatMessage = ({
  name,
  message,
}: {
  name: string;
  message: string;
}) => {
  const initial =  name.charAt(0).toUpperCase()
    

  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
          {initial}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <div className="text-sm font-semibold">{name}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
