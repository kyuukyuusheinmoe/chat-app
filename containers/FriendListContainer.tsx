import React, { useEffect } from "react";
import { updateRooms, updateActiveRoom } from "@/store/ChatRoomReducer";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { RootState } from "@/store";
import useSWR from "swr";
import { messageListFetcher } from "@/services/messageService";

const FriendListContainer = ({
  data,
}: {
  data: { id: number; name?: string | undefined; email: string }[];
}) => {
  const dispatch = useDispatch();
  const { rooms, activeRoom } = useSelector(
    (state: RootState) => state.chatRoom
  );
  const { data: messages } = useSWR(
    activeRoom?.id ? `/message/${activeRoom?.id}` : null,
    messageListFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      dispatch(
        updateActiveRoom({ ...data[0], messages: messages?.data || [] })
      );
    }
  }, []);

  const handleUserItemClick = async (group: {
    id: number;
    name?: string;
    email: string;
  }) => {
    const data = await messageListFetcher(`/message/${group.id}`);
    if (data.success) {
      dispatch(updateActiveRoom({ ...group, messages: data?.data || [] }));
    }
  };

  return (
    <ul id="chatHistory" className="p-2 space-y-2 text-sm">
      {data?.map((group: { id: number; name?: string; email: string }) => (
        <li
          onClick={() => handleUserItemClick(group)}
          className={clsx(
            "p-3 bg-[#343540] rounded cursor-pointer hover:bg-gray-600 truncate",
            activeRoom?.id === group.id && "bg-gray-600"
          )}
          key={group.id}>
          {group?.name || group.email}
        </li>
      ))}
    </ul>
  );
};

export default FriendListContainer;
