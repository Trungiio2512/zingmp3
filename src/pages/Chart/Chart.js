import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShowRankSong from "~/pages/components/ShowRankSong";
import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import WeekRankSong from "../components/WeekRankSong";
import ChartLine from "~/pages/components/ChartLine";
import {
    setCurrentIndexSong,
    setIdPlaylistSong,
    setInfoCurrentSong,
    setPlaylistSong,
    setPlaySong,
    setSongId,
} from "~/redux/playerSlice";
import { getCurrentIndex, playlistCanPlay } from "~/funtion";
import { setDataChart } from "~/redux/appSlice";
function Chart() {
    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
    const idPlaylist = useSelector((state) => state.player.playlistIdSong);
    const playlistSong = useSelector((state) => state.player.playlistSong);
    const songId = useSelector((state) => state.player.songId);
    const isPlaySong = useSelector((state) => state.player.isPlaySong);

    const dispatch = useDispatch();
    const RTChart = useSelector((state) => state.app.chart.RTChart);
    const weekChart = useSelector((state) => state.app.chart.weekChart);
    const handleSong = async (song, playlist, idListRankSong) => {
        if (song?.isWorldWide) {
            if (idPlaylist !== idListRankSong) {
                const newPlaylist = await playlistCanPlay(playlist);
                const newCurrentIndexSong = await getCurrentIndex(song?.encodeId, newPlaylist);
                dispatch(setIdPlaylistSong(idListRankSong));
                dispatch(setPlaylistSong(newPlaylist));
                dispatch(setCurrentIndexSong(newCurrentIndexSong));
                dispatch(setInfoCurrentSong(newPlaylist[newCurrentIndexSong]));
                dispatch(setSongId(newPlaylist[newCurrentIndexSong]?.encodeId));
            } else {
                // const currentIndexSong =
                if (songId === song.encodeId) {
                    dispatch(setPlaySong(!isPlaySong));
                } else {
                    dispatch(setInfoCurrentSong(song));
                    dispatch(setSongId(song?.encodeId));
                    const songIndex = await getCurrentIndex(song?.encodeId, playlistSong);
                    dispatch(setCurrentIndexSong(songIndex));
                }
            }
        } else {
            alert("songVip");
        }
    };

    const handlePlaySong = async (playlist, idListRankSong) => {
        const newPlaylist = await playlistCanPlay(playlist);
        if (newPlaylist.length > 0) {
            if (idPlaylist === idListRankSong) {
                dispatch(setPlaySong(!isPlaySong));
            } else {
                const randomIndexSong = Math.floor(Math.random() * newPlaylist.length);
                dispatch(setIdPlaylistSong(idListRankSong));
                dispatch(setPlaylistSong(newPlaylist));
                dispatch(setCurrentIndexSong(randomIndexSong));
                dispatch(setInfoCurrentSong(newPlaylist[randomIndexSong]));
                dispatch(setSongId(newPlaylist[randomIndexSong]?.encodeId));
            }
        } else {
            alert("list vip song");
        }
    };
    useEffect(() => {
        const fecthApi = async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get("charthome");
                dispatch(setDataChart(res.data));
                setLoading(false);
                console.log(res.data);
            } catch (error) {
                console.log(error.response);
                setFailed(true);
            }
        };
        fecthApi();
    }, []);

    useEffect(() => {
        document.title = "Bảng xếp hạng";
    }, []);

    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>bi loi</div>;
    } else {
        return (
            <div>
                <ChartLine data={RTChart} />
                <ShowRankSong
                    onHanldeSong={handleSong}
                    onHandlePlaySong={handlePlaySong}
                    data={RTChart?.items}
                    rankNumber={10}
                />
                <WeekRankSong
                    onHanldeSong={handleSong}
                    onHandlePlaySong={handlePlaySong}
                    data={weekChart}
                    rankNumber={5}
                />
            </div>
        );
    }
}

export default Chart;
