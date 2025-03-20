import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, removeNotification } from "../store/slices/notificationState";
import { addChat, addTyping, stopTyping, isOnline } from "@/store/slices/chatState";

const generateTempId = () => `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const useWebSocket = () => {
  const webSocketUrl = "ws://localhost:8080/ws";
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.Auth.isLogin);
  const socketRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectCount = 5;
  const pingIntervalRef = useRef(null);

  const connectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socketInstance = new WebSocket(webSocketUrl);
    socketRef.current = socketInstance;

    socketInstance.onopen = () => {
      console.log("✅ WebSocket Connected");
      reconnectAttempts.current = 0;

      // Send periodic pings to keep connection alive
      pingIntervalRef.current = setInterval(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: "PING" }));
        }
      }, 30000);
    };

    socketInstance.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("📩 Message received:", message);

      switch (message.type) {
        case "NOTIFICATION_LIST":
          dispatch(addNotification(message.notificationList));
          break;
        case "CHAT":
          dispatch(addChat(message));
          break;
        case "TYPING":
          dispatch(addTyping(message));
          break;
        case "STOP_TYPING":
          dispatch(stopTyping(message));
          break;
        case "IS_ONLINE":
          dispatch(isOnline(message));
          break;
        default:
          console.warn("Unknown WebSocket message type:", message.type);
      }
    };

    socketInstance.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socketInstance.onclose = (event) => {
      console.warn(`⚠️ WebSocket closed (Code: ${event.code})`);

      clearInterval(pingIntervalRef.current);

      if (event.code !== 1000 && reconnectAttempts.current < maxReconnectCount) {
        reconnectAttempts.current += 1;
        setTimeout(connectWebSocket, 3000);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearInterval(pingIntervalRef.current);
    };
  }, [webSocketUrl]);

  const sendMessage = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "CHAT", chat: message }));
    } else {
      console.warn("⚠️ WebSocket is not connected");
    }
    dispatch(addChat({ chat: { ...message, id: generateTempId(), createdAt: new Date().toISOString() } }));
  }, []);

  const sendIsTyping = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: message.type, sender: message.sender, receiver: message.receiver, conversationId: message.conversationId }));
    } else {
      console.warn("⚠️ WebSocket is not connected");
    }
  }, []);

  const checkIsOnline = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "IS_ONLINE", sender: message.sender, receiver: message.receiver }));
    } else {
      console.warn("⚠️ WebSocket is not connected");
    }
  }, []);

  const removeNt = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      dispatch(removeNotification(message)); // Now it actually updates Redux
    } else {
      console.warn("⚠️ WebSocket is not connected");
    }
  }, []);

  return { removeNt, sendMessage, sendIsTyping, checkIsOnline };
};

export default useWebSocket;
