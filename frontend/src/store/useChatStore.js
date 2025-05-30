import toast from "react-hot-toast";
import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async()=>{
        set({isUsersLoading: true});

        try{
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMessages: async(userId)=>{
        set({isMessageLoading: true})

        try{
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data})
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading: false})
        }
    },

    //adds the messages you sent 
    sendMessage: async (messageData)=>{
        const {selectedUser, messages} = get()
        try {

            const res  = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            console.log("res.data:",res.data)
            set({messages: [...messages, res.data.message]});
        } catch (error) {
            toast.error(error.response.data.message) 
        }
    },

    //adds the messages sent over the socket from your friend
    subscribeToMessages : ()=>{
        const {selectedUser} = get();
        if (!selectedUser) return ;



        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage)=>{
                const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
                if (!isMessageSentFromSelectedUser) return;

                console.log("newMessage:",newMessage)
            set({
                messages : [...get().messages, newMessage]
            });
        });
    },

    unsubscribeFromMessages : () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser)=>set({selectedUser})
}))