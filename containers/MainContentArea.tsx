import React from "react";

const MainContentArea = () => {
  return (
    <div className="bg-middle flex-grow flex flex-col relative">
      <div className="flex-grow p-4 overflow-y-auto">
        {/**Chat content will go here   */}
      </div>
      <div className="w-[80%] mx-auto mb-10">
        <input
          type="text"
          id="promptInput"
          className="w-full p-4 border border-[#303139] rounded bg-[#40414E] focus:outline-none text-white"
          placeholder="Type your message here..."
        />
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
