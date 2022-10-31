import { configureStore } from "@reduxjs/toolkit";
import PlayerReducer from "./PlayerSlice";
const store = configureStore({
    reducer: {
        player: PlayerReducer,
    },
});

export default store;
