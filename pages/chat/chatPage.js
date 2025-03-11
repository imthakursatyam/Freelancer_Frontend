import React from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { BsEmojiSmile, BsPaperclip, BsSend } from "react-icons/bs";
import { IoMdChatbubbles } from "react-icons/io";
import { Avatar } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';

const ChatList = ({ chatList, setCurrChat, currRole }) => {
  if (currRole == "RECRUITER"){
    return <>
    <div className="space-y-3">
      {chatList.map((item, index) => (
        <div
          key={index}
          className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-200"
          onClick={() => setCurrChat(item)}
        >
          <IoMdChatbubbles className="text-2xl text-gray-500 mr-3" />
          <div>
            <h2 className="font-medium">{item.freelancerName}</h2>
            <p className="text-sm text-gray-500">Last message...</p>
          </div>
        </div>
      ))}
    </div>
  </>
  } else {
    return <>
    <div className="space-y-3">
      {chatList.map((item, index) => (
        <div
          key={index}
          className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-200"
          onClick={() => setCurrChat(item)}
        >
          <IoMdChatbubbles className="text-2xl text-gray-500 mr-3" />
          <div>
            <h2 className="font-medium">{currRole == "FREELANCER" ? item.recruiterName: item.freelancerName}</h2>
            <p className="text-sm text-gray-500">Last message...</p>
          </div>
        </div>
      ))}
    </div>
  </>
  }
 
}


const chat3 = [
  { from: "user1", to: "user2", message: "Nice! Need any help?", date: "2025-03-08 10:04:00" },
  { from: "user2", to: "user1", message: "Maybe later! Thanks for asking.", date: "2025-03-08 10:05:20" },
  { from: "user1", to: "user2", message: "Hello!", date: "2025-03-08 10:00:00" },
  { from: "user2", to: "user1", message: "Hey! How are you?", date: "2025-03-08 10:01:00" },
];

const chat1 = [
  { from: "user1", to: "user2", message: "Hello!", date: "2025-03-08 10:00:00" },
  { from: "user2", to: "user1", message: "Hey! How are you?", date: "2025-03-08 10:01:00" },
  { from: "user1", to: "user2", message: "I'm good, thanks! What about you?", date: "2025-03-08 10:02:30" },
  { from: "user2", to: "user1", message: "Doing great! Just working on some projects.", date: "2025-03-08 10:03:15" }
]

const chat2 = [
  { from: "user1", to: "user2", message: "I'm good, thanks! What about you?", date: "2025-03-08 10:02:30" },
  { from: "user2", to: "user1", message: "Doing great! Just working on some projects.", date: "2025-03-08 10:03:15" },
  { from: "user1", to: "user2", message: "Nice! Need any help?", date: "2025-03-08 10:04:00" },
  { from: "user2", to: "user1", message: "Maybe later! Thanks for asking.", date: "2025-03-08 10:05:20" }
]


const ChatPage = () => {
  const [isOnline, setOnline] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [chatList, setChatList] = React.useState([]);
  const [currChat, setCurrChat] = React.useState([]);
  const currRole = useSelector((state) => state.Auth.currRole);


  const fetchMessages = () => {
    if (currChat.name == "alice") setMessages(chat1);
    if (currChat.name == "meera") setMessages(chat2);
    if (currChat.name == "john") setMessages(chat3);
  }

  const sendMessage = () => {
    setMessages([...messages, {from: "user1", to: "user2", message:"added this message", date: "2025-03-08 10:04:00"}])
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
    console.log(data);
    if (data.success) {
      setChatList(data.chatList);
    } else {
      /*toast({
        title: 'Chat',
        description: data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })*/
    }
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
    } else {
      /*toast({
        title: 'Chat',
        description: data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })*/
     setOnline(false);
    }
  }



  React.useEffect(fetchChatList, [])


  React.useEffect(() => {
    checkIsOnline();
  }, [currChat])

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
        <ChatList chatList={chatList} setCurrChat={setCurrChat}/>
      </div>



      {/* Chat Window */}
      <div className="flex-1 flex flex-col ">
        {Object.keys(currChat).length > 0 && <div className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-3">
          <Avatar size="sm" name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
          <div className="flex flex-col gap-0">
          <h2 className="font-bold ">{currRole=="FREELANCER" ? currChat.recruiterName: currChat.freelancerName}</h2>
          <h3 className="font-light text-xs">{isOnline ? "online": "offline"}</h3>
          </div>
          
          </div>
          <FaEllipsisV className="text-gray-500 cursor-pointer" />
        </div>}
        <div className="flex-1 bg-gray-200 p-4 space-y-3 overflow-auto px-16 py-8">
          {messages.map((item, idx) => {
            return item.from == "user1" ? <div className="justify-self-end px-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
              {item.message}
            </div> : <div className="justify-self-start px-4 bg-green-400 text-white p-3 rounded-lg shadow-md max-w-xs">
              {item.message}
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
