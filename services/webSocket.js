// useWebSocket.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, removeNotification} from '../store/slices/notificationState';
import { authState } from '@/store/slices/authState';
import { useSelector } from 'react-redux';
import React from 'react';

const useWebSocket = (url) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.Auth.isLogin);
  const [socket, setSocket] = React.useState(null)

  useEffect(() => {
    const socketInstance = new WebSocket(url);

    
    socketInstance.onopen = () => {
    };

    socketInstance.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message received:', message);
      dispatch(addNotification(message));
    };

    socketInstance.onerror = (error) => {
      
    };

    socketInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(socketInstance);

    // Cleanup on component unmount
    return () => {
      socketInstance.close();
    };
  }, [url]);
  

  /*const removeNotification = React.useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message)); // Send the message to the WebSocket server
        console.log('Message sent:', message);
      } else {
        console.log('WebSocket is not open. Cannot send message.');
      }
    },
    [socket] // This function depends on the socket instance
  );*/

  const removeNt = (message) => {
    dispatch(removeNotification({id: message.id}));
  }

  return {removeNt};
};

export default useWebSocket;
