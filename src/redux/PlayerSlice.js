import { createSlice } from "@reduxjs/toolkit";
import { images } from "~/assets";

const PlayerSlice = createSlice({
    name: "player",
    initialState: {
        isPlaySong: false,
        isMuted: false,
        isRandom: false,
        isRepeat: false,
        autoplay: false,
        currentSong: null,
        currentTimeSong: 0,
        currentIndexSong: null,
        currentInfoSong: {
            thumbnail: images.srcThumbDefault,
            title: "Hãy chọn 1 bài hát",
            duration: 0,
            artists: [],
        },
        volumeSong: 0,
        playlistIdSong: "",
        playlistSong: [],
        // playlistRandomSong: [],
        songId: null,
        songSrc: "",
    },
    reducers: {
        setPlaySong: (state, action) => {
            state.isPlaySong = action.payload;
        },
        setSongId: (state, action) => {
            state.songId = action.payload;
        },
        setSongSrc: (state, action) => {
            state.songSrc = action.payload;
        },
        setInfoCurrentSong: (state, action) => {
            state.currentInfoSong = action.payload;
        },
        setRandomSong: (state, action) => {
            state.isRandom = action.payload;
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
        setPlaylistSong: (state, action) => {
            state.playlistSong = [...action.payload];
        },
        setIdPlaylistSong: (state, action) => {
            state.playlistIdSong = action.payload;
        },
        setCurrentIndexSong: (state, action) => {
            state.currentIndexSong = action.payload;
        },
        // setPlaylistRandomSong: (state, action) => {
        //     state.playlistRandomSong = action.payload;
        // },
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
    setPlaylistSong,
    setCurrentIndexSong,
    setIdPlaylistSong,
    setPlaylistRandomSong,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
