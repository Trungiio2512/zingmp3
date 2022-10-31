import { createSlice } from "@reduxjs/toolkit";
import { images } from "~/assets";

const PlayerSlice = createSlice({
    name: "player",
    initialState: {
        isPlay: false,
        isMuted: false,
        isRandom: false,
        isRepeat: false,
        autoplay: false,
        currentSong: null,
        durationSong: 0,
        currentTimeSong: 0,
        volumeSong: 0,
        infoCurrentSong: {
            thumbnail: images.srcThumbDefault,
            title: "Hãy chọn 1 bài hát",
            timeSong: "00:00",
            artists: [],
        },
        playlistSong: null,
        playlistRandomSong: null,
        songId: null,
        songSrc: "",
    },
    reducers: {
        setPlaySong: (state, action) => {
            state.isPlay = action.payload;
        },
        setSongId: (state, action) => {
            state.songId = action.payload;
        },
        setSongSrc: (state, action) => {
            state.songSrc = action.payload;
        },
        setInfoCurrentSong: (state, action) => {
            state.infoCurrentSong = action.payload;
        },
        setRandomSong: (state, action) => {
            state.isRandom = !state.isRandom;
        },
        setRepeatSong: (state, action) => {
            state.isRepeat = !state.isRepeat;
        },
        setMutedSong: (state, action) => {
            state.isMuted = !state.isMuted;
        },
        setDurationSong: (state, action) => {
            state.durationSong = action.payload;
        },
        setCurrentTimeSong: (state, action) => {
            state.currentTimeSong = action.payload;
        },
        setVolumeSong: (state, action) => {
            state.volumeSong = action.payload;
        },
        setCurrentSong: (state, action) => {},
        setPlaylistSong: (state, action) => {},
    },
});
export const {
    setPlaySong,
    setSongId,
    setDurationSong,
    setSongSrc,
    setInfoCurrentSong,
    setRandomSong,
    setMutedSong,
    setRepeatSong,
    setCurrentTimeSong,
    setVolumeSong,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
