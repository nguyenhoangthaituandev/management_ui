import { createSlice } from "@reduxjs/toolkit";
import storage from "../../utils/storage";


const userInfoSlide = createSlice({
    name: 'userInfo',
    initialState: storage.getUserInfo(),
    reducers: {
        refreshUserInfo: state => {
            return storage.getUserInfo();
        }
    }
});

export const { reducer } = userInfoSlide;
export const { refreshUserInfo } = userInfoSlide.actions;

export default userInfoSlide;