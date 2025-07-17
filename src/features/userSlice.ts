import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/app/_apis_/user_index.api";
import { UserTypes } from "@/components/type";

const initialState:UserTypes|null = null

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:()=>null
    },
    extraReducers : (builder)=>{
        builder
        .addMatcher(userApi.endpoints.register.matchFulfilled,(_,{payload})=>{return payload})
        .addMatcher(userApi.endpoints.login.matchFulfilled,(_,{payload})=>{return payload})
    },
})
export const {logout}= userSlice.actions
export default userSlice.reducer