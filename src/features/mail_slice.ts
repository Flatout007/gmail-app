import { createSlice, Slice, CreateSliceOptions, PayloadAction, StateFromReducersMapObject, } from "@reduxjs/toolkit";
import { EmailObject } from "../app/store";


const slice: CreateSliceOptions = {
    name: "mail",

    initialState: {
        status: false,
        selectedMail: null
    },

    reducers: {
        openMail: function (state: StateFromReducersMapObject<EmailObject>, action: PayloadAction): void {
            state.selectedMail = action.payload;
        },

        openComposeMessage: function (state: StateFromReducersMapObject<EmailObject>): void { state.status = true },

        closeComposeMessage: function (state: StateFromReducersMapObject<EmailObject>): void { state.status = false }
    }
};

export const mailSlice: Slice = createSlice(slice);

export const { openComposeMessage, closeComposeMessage, openMail } = mailSlice.actions;

export default mailSlice.reducer;



