import { createSlice, Slice, CreateSliceOptions, PayloadAction, StateFromReducersMapObject, } from "@reduxjs/toolkit";
import { UserObject } from "../app/store";


const slice: CreateSliceOptions = {
    name: "user",

    initialState: {
       currentUser: null
    },

    reducers: {
        login: function(state: StateFromReducersMapObject<UserObject>, action: PayloadAction): void {
            state.currentUser = action.payload;
        },
        logout: function(state: StateFromReducersMapObject<UserObject>): void {
            state.currentUser = null;
        }
    }
};

export const userSlice: Slice = createSlice(slice);

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;



