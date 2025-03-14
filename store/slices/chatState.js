import { createSlice } from '@reduxjs/toolkit'



export const chatState = createSlice({
  name: "chatState",
  initialState: {
    activeChatId: "",
    conversations: []
  },
  reducers: {
    addConversation(state, action) {
      return {...state , conversations: [...state.conversations, ...action.payload.conversations]};
    },
    addChat(state, action) {
      const conversationId = action.payload.chat.conversationId;
      const chat = action.payload.chat;

      return {
        ...state, // Preserve the rest of the state
        conversations: state.conversations.map((conversation) =>
          conversation.id === conversationId
            ? { 
                ...conversation, 
                messages: [...conversation.messages, chat] // Append new message correctly
              }
            : conversation
        )
      };
    },
    setActiveChat(state, action) {
      return {...state, activeChatId: action.payload.chatId};
    }
  }
});

export const { addConversation, addChat, setActiveChat } = chatState.actions;