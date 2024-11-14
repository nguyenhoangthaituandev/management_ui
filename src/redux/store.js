import { configureStore } from "@reduxjs/toolkit";
import userInfoSlide from "./reducers/UserInfoSlide";


export const store = configureStore({
  reducer: {
    userInfo: userInfoSlide.reducer,
  },
});
