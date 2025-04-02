import { createSlice } from '@reduxjs/toolkit'



export const chatState = createSlice({
  name: "chatState",
  initialState: {
    isOnline: false,
    isTyping: false,
    activeChatId: "",
    conversations: []
  },
  reducers: {

    addConversation(state, action) {
      return {...state , conversations: Array.from(
        new Map(
          [...state.conversations, ...action.payload.conversations].map((conversation) => [conversation.id, conversation])
        ).values()
      )
    };
    },

    addChat(state, action) {
      const conversationId = action.payload.chat.conversationId;
      const chat = action.payload.chat;

      return {
        ...state, // Preserve the rest of the state
        conversations: state.conversations.map((conversation) =>
          conversation.id == conversationId
            ? { 
                ...conversation, 
                messages: [...(conversation.messages || []).filter(msg => msg.id != chat.id), chat].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Append new message correctly
              }
            : conversation
        )
      };
    },

    addChats(state, action) {
      const conversationId = action.payload.conversationId;
      const messages = action.payload.messages;

      return {
        ...state, // Preserve the rest of the state
        conversations: state.conversations.map((conversation) =>
          conversation.id == conversationId
            ? { 
                ...conversation, // copy conversation
                messages: Array.from(
                  new Map(  // Remove duplicates
                    [...(conversation.messages || []), ...messages].map(msg => [msg.id, msg])).values() // extract values
                  ).sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)) // sor
              }
            : conversation
        )
      };
    },

    setActiveChat(state, action) {
      return {...state, activeChatId: action.payload.chatId};
    },

    addTyping(state, action) {
      if (action.payload.conversationId != state.activeChatId) return state;
      return {...state, isTyping: true};
    },

    stopTyping(state, action) {
      if (action.payload.conversationId != state.activeChatId) return state;
      return {...state, isTyping: false};
    },

    isOnline(state, action) {
      if (state.activeChatId == "") return state; 
      const conversation = state.conversations.find((chat) => chat.id == state.activeChatId);
      if (conversation.userOne == action.payload.sender || conversation.userTwo == action.payload.sender) {
        return {...state, isOnline: action.payload.onlineStatus};
      }
      return state;
    },

    clearChatState(state, action) {
      return {
        isOnline: false,
        isTyping: false,
        activeChatId: "",
        conversations: []
      };
    }
  }
});

export const { addConversation, addChat, setActiveChat, addTyping, stopTyping, isOnline, addChats, clearChatState } = chatState.actions;