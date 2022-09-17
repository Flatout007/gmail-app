
import mailSlice from "../features/mail_slice";
import userSlice from "../features/user_slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
   reducer: {
      mail: mailSlice,
      user: userSlice
   }
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type EmailObject = { [key: string]: any };
export type UserObject = { [key: string]: any };
