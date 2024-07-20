import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useSocket = (url: string) => {
  const socket = useRef<any>(null);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const connectSocket = () => {
      socket.current = io(url, {
        transports: ["websocket"],
        query: {
          user: token,
        },
      });

      socket.current.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.current.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
        setTimeout(connectSocket, 1000); // Reconnect after 1 second
      });

      socket.current.on("reconnect_error", (error) => {
        console.error("Reconnect error:", error);
      });
    };

    connectSocket();
    return () => {
      socket.current.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
