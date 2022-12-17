import { createSlice } from "@reduxjs/toolkit";

const MvSlice = createSlice({
    name: "mv",
    initialState: {
        videoId: null,
        title: null,
        link: null,
    },
    reducers: {
        setVideoId: (state, action) => {
            state.videoId = action.payload;
        },
        setLinkVideo: (state, action) => {
            state.link = action.payload;
        },
        setTitleVideo: (state, action) => {
            state.title = action.payload;
        },
    },
});
export const { setVideoId, setTitleVideo, setLinkVideo } = MvSlice.actions;
export default MvSlice.reducer;
