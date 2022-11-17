import { createSlice } from "@reduxjs/toolkit";

const MvSlice = createSlice({
    name: "mv",
    initialState: {
        videoId: null,
        videoSrc: null,
        videoCurrentInfo: null,
        videoCurrentTime: 0,
        listVideo: [],
    },
    reducers: {
        setVideoId: (state, action) => (state.videoId = action.payload),
        setVideoCurrentInfo: (state, action) => (state.videoCurrentInfo = action.payload),
        setVideoCurrentTime: (state, action) => (state.videoCurrentTime = action.payload),
        setListVideo: (state, action) => (state.listVideo = action.payload),
        setVideoSrc: (state, action) => (state.videoSrc = action.payload),
    },
});
export const { setVideoId } = MvSlice.actions;
export default MvSlice.reducer;
