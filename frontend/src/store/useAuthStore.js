import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckingAuth: true,

    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:false,

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
    }
    
})
);