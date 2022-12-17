import { configureStore } from "@reduxjs/toolkit";
import PlayerReducer from "./playerSlice";
import MvReducer from "./mvSlice";
import AppReducer from "./appSlice";
const store = configureStore({
    reducer: {
        player: PlayerReducer,
        mv: MvReducer,
        app: AppReducer,
    },
});

export default store;
