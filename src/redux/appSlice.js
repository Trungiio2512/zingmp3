import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/untils/httpRequest";

const getHome = createAsyncThunk("app/getHome", async () => {
    const res = await httpRequest.get("home", {
        params: {
            page: 1,
        },
    });
    return res.data?.items;
});

const appSlice = createSlice({
    name: "app",
    initialState: {
        home: {
            banners: [],
            newRelease: {},
            playlist: {},
        },
        chart: {
            weekChart: {},
            RTChart: {},
        },
    },
    reducers: {
        setDataHome: (state, action) => {
            state.home.banners = action.payload.find((item) => item?.sectionId === "hSlider")?.items || [];
            state.home.newRelease = action.payload.find((item) => item?.sectionType === "new-release") || {};
            state.home.playlist = action.payload.find((item) => item.sectionId === "hAutoTheme1") || {};
            // return {
            //     ...state,
            //     banners: action.payload.find((item) => item?.sectionId === "hSlider")?.items || [],
            //     newRelease: action.payload.find((item) => item?.sectionType === "new-release") || {},
            //     playlist: action.payload.find((item) => item.sectionId === "hAutoTheme1") || {},
            // };
        },
        setDataChart: (state, action) => {
            state.chart.weekChart = action.payload?.weekChart || {};
            state.chart.RTChart = action.payload?.RTChart || {};
        },
    },
});
export { getHome };
export const { setDataHome, setDataChart } = appSlice.actions;
export default appSlice.reducer;
