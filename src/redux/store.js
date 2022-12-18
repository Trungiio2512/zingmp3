import { configureStore } from "@reduxjs/toolkit";
import PlayerSlice from "./playerSlice";
import MvSlice from "./mvSlice";
import AppSlice from "./appSlice";
const store = configureStore({
    reducer: {
        player: PlayerSlice.reducer,
        mv: MvSlice.reducer,
        app: AppSlice.reducer,
    },
});

export default store;
