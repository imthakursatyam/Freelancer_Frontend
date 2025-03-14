import React, { act } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { BsEmojiSmile, BsPaperclip, BsSend } from "react-icons/bs";
import { IoMdChatbubbles } from "react-icons/io";
import { Avatar } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import useWebSocket from '../../services/webSocket.js';
import { addConversation, setActiveChat, addChat } from '@/store/slices/chatState';

const ChatList = ({ chatList, setActiveChatId, currUser}) => {

    return <>
    <div className="space-y-3">
      {chatList && chatList.map((item, index) => (
        <div
          key={index}
          className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-200"
          onClick={() => setActiveChatId(item.id)}
        >
          <IoMdChatbubbles onClick={console.log(item, "item logged")} className="text-2xl text-gray-500 mr-3" />
          <div>
            <h2 className="font-medium">{currUser == item.userOne ? item.userTwoName : item.userOneName}</h2>
            <p className="text-sm text-gray-500">Last message...</p>
          </div>
        </div>
      ))}
    </div>
  </>
 
}



const ChatPage = () => {
  const [isOnline, setOnline] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [currUser, setCurrUser] = React.useState("");
  const chatList = useSelector((state) => state.Chat.conversations);
  const activeChatData =  useSelector((state) => state.Chat.conversations.find((chat) => chat.id == state.Chat.activeChatId));

  const dispatch = useDispatch();

  const { sendChatMessage } = useWebSocket();

  const setActiveChatId = (id) => {
    dispatch(setActiveChat({ chatId: id}));
  } 

  const sendMessage = () => {
    if (message.length == 0) return;
    if (message.endsWith(" ")) setMessage(message.trim());
    const receiver = currUser == activeChatData.userOne ? activeChatData.userTwo : activeChatData.userOne;
    sendChatMessage({from: currUser, to:receiver, content: message, conversationId: activeChatData.id});
    setMessage("");
  }

  const fetchChatList = async () => {
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    let response = await fetch("http://localhost:8080/chat/getConversations", {
      method: "GET",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();
    if (data.success) {
      dispatch(addConversation({conversations: data.chatList}));
      setCurrUser(data.currUser);
    }
    console.log(data, data.chatList);
  }

  const checkIsOnline = async () => {
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    const userId = currRole == "FREELANCER" ? currChat.recruiterEmail : currChat.freelancerEmail;
    console.log(userId);
    let response = await fetch(`http://localhost:8080/chat/isOnline/${userId}`, {
      method: "GET",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();
    console.log(data);
    if (data.status) {
      setOnline(data.isOnline);
    }
     setOnline(false);
  }


  React.useEffect(() => {
    fetchChatList();
  }, [])

/*
  React.useEffect(() => {
    checkIsOnline();
  }, [currChat])
*/
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r">
        <div className="flex items-center justify-between mb-4">
          <h1  className="text-xl font-bold">Chats</h1>
          <FaEllipsisV className="cursor-pointer text-gray-500" />
        </div>
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-2 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        {/* Chat List */}
        <ChatList chatList={chatList} setActiveChatId={setActiveChatId} currUser={currUser}/>
      </div>



      {/* Chat Window */}
      <div className="flex-1 flex flex-col ">
        {(activeChatData && Object.keys(activeChatData).length > 0) && <div className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-3">
          <Avatar size="sm" name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
          <div className="flex flex-col gap-0">
          <h2 className="font-bold ">{currUser == activeChatData.userOne ? activeChatData.userTwoName : activeChatData.userOneName}</h2>
          <h3 className="font-light text-xs">{isOnline ? "online": "offline"}</h3>
          </div>
          
          </div>
          <FaEllipsisV className="text-gray-500 cursor-pointer" />
        </div>}
        <div className="flex-1 bg-gray-200 p-4 space-y-3 overflow-auto px-16 py-8">
          {activeChatData?.messages?.map((item, idx) => {
            return item.from == currUser ? <div className="justify-self-end px-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
              {item.content}
            </div> : <div className="justify-self-start px-4 bg-green-400 text-white p-3 rounded-lg shadow-md max-w-xs">
              {item.content}
            </div>
          })}


        </div>
        <div className="bg-white p-4 flex items-center border-t w-full bottom-10">
          <BsEmojiSmile className="text-xl text-gray-500 mr-3 cursor-pointer" />
          <BsPaperclip className="text-xl text-gray-500 mr-3 cursor-pointer" />
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
          />
          <BsSend onClick={() => sendMessage()} className="text-xl text-green-500 ml-3 cursor-pointer" />
        </div>
      </div>
    </div >
  );
};

export default ChatPage;
