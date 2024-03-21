import { saveState } from "./storage";
import userSlice, { JWT_PERSISTANT_STATE } from "./user.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState()?.user?.jwt }, JWT_PERSISTANT_STATE);
});

// export default store;


export default store

