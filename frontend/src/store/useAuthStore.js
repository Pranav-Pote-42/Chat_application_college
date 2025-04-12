import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckingAuth: true,

    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:false,
    onlineUsers: [],

    checkAuth:async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set((state)=>({...state, authUser:res.data}))
        } catch (error) {
            console.log("Error in checkAuth in useAuthStore \n",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    
    signUp: async(data)=>{
        console.log(data)
        set((state)=>({...state, isSigningUp:true}))
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("user has been created successfully");
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in the signUp function in useAuthStore:",error.message)
        }finally{
            set({isSigningUp: false })
        }
    },
    login: async(data)=>{
        set({isLogginIn: true});

        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("logged in  successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLogginIn: false});
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUse: null});
            toast.success("Logged out successfully")

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile : async(data)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser: res.data});
            toast.success("successfully update profile pic")
            
        } catch (error) {
            console.log("error in the updateProfile in useAuthStore", error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false})
        }
    }


})
);