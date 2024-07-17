import React, { useState } from "react";
import Input from "../components/Input";

const SideSearchContainer = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Input
        name="searchInput"
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        className="w-full p-4 border border-[#303139] rounded bg-[#40414E] focus:outline-none text-white"
        placeholder="Type something..."
      />
      <div className="flex-grow overflow-y-auto">
        <ul id="chatHistory" className="p-4 space-y-2">
          {/**<!-- Chat history items will go here --> **/}
          <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
            Chat 1
          </li>
          <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
            Chat 2
          </li>
          {/**<!-- Add more chat items as needed -->**/}
        </ul>
      </div>
    </div>
  );
};

export default SideSearchContainer;
