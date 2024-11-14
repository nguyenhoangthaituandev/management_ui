import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const selectIsLoginSelector = createSelector(
    (state) => state.userInfo,
    state => state.isLogin);

const selectRoleSelector = createSelector(
    (state) => state.userInfo,
    state => state.role);

const selectFullnameSelector = createSelector(
    (state) => state.userInfo,
    state => state.fullname);

/** function */
export const selectIsLogin = (state) => {
    return selectIsLoginSelector(state);
}

export const selectRole = (state) => {
    return selectRoleSelector(state);
}

export const selectFullname = (state) => {
    return selectFullnameSelector(state);
}