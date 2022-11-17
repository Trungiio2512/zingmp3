import { configureStore } from "@reduxjs/toolkit";
import PlayerReducer from "./playerSlice";
import MvReducer from "./mvSlice";
const store = configureStore({
    reducer: {
        player: PlayerReducer,
        mv: MvReducer,
    },
});

export default store;
