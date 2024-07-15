import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <h1 className="text-2xl mb-4">Login to ChatGPT</h1>
        <input
          type="text"
          placeholder="Username"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          //   onClick={handleLogin}
          className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Page;
