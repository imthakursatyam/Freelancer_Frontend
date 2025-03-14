// useWebSocket.js
import { useEffect } from 'react';
import { addNotification, removeNotification} from '../store/slices/notificationState';
import { authState } from '@/store/slices/authState';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { addChat } from '@/store/slices/chatState';

const useWebSocket = () => {
  const webSocketUrl = 'ws://localhost:8080/ws';
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.Auth.isLogin);
  const [socket, setSocket] = React.useState(null);
  const [reconnectAttempts, setReconnectAttempts] = React.useState(0);
  const maxReconnectCount = 5;

  useEffect(() => {
    const socketInstance = new WebSocket(webSocketUrl);

    
    socketInstance.onopen = () => {
      setReconnectAttempts(0);
    };

    socketInstance.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message received:', message);
      if (message.type == "NOTIFICATION_LIST")  dispatch(addNotification(message));
      if (message.type == "CHAT") dispatch(addChat(message));
    };

    socketInstance.onerror = (error) => {

    };

    socketInstance.onclose = (event) => {
      console.log('WebSocket connection closed');
      if (event.code !== 1000 && maxReconnectCount < reconnectAttempts){
        setReconnectAttempts((prevAttempt) => prevAttempt + 1);
        setTimeout(() => {
          createSocket();
        }, 3000); // Reconnecting
      }
    };

    setSocket(socketInstance);

    // Cleanup on component unmount
    return () => {
      socketInstance.close();
    };
  }, [webSocketUrl]);
  

  const removeNt = React.useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message)); // Send the message to the WebSocket server
        console.log('Message sent:', message);
      } else {
        console.log('WebSocket is not open. Cannot send message.');
      }
      dispatch(removeNotification({id: message.id}));
    },
    [socket] // This function depends on the socket instance
  );

  const sendChatMessage = React.useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({type: "CHAT", chat : message})); // Send the message to the WebSocket server
        console.log('Message sent:', message);
      } else {
        console.log('WebSocket is not open. Cannot send message.');
      }
      dispatch(addChat({chat: message}));
    },
    [socket] // This function depends on the socket instance
  );

  return {removeNt, sendChatMessage};
};

export default useWebSocket;
