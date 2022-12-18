import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import Button from "~/components/Button";
import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import ShowRankSong from "~/pages/components/ShowRankSong";
import styles from "./NewMusic.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentIndex, playlistCanPlay } from "~/funtion";
import {
    setCurrentIndexSong,
    setIdPlaylistSong,
    setInfoCurrentSong,
    setPlaylistSong,
    setPlaySong,
    setSongId,
} from "~/redux/PlayerSlice";

function NewMusic() {
    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [data, setData] = useState(null);

    const idPlaylist = useSelector((state) => state.player.playlistIdSong);
    const playlistSong = useSelector((state) => state.player.playlistSong);
    const songId = useSelector((state) => state.player.songId);
    const isPlaySong = useSelector((state) => state.player.isPlaySong);

    const dispatch = useDispatch();
    console.log(data);
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
        console.log(newPlaylist);
        if (newPlaylist.length > 0) {
            if (idPlaylist === idListRankSong) {
                // console.log(idPlaylist === idListRankSong);
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
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("newreleasechart");
                setData(res?.data);
                setLoading(false);
            } catch (error) {
                setFailed(true);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        document.title = "Nhạc mới";
    }, []);

    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>Bi loi</div>;
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <img src={data?.banner} alt={data?.title} />
                </div>

                {data && (
                    <ShowRankSong
                        // isPlaySong={isPlaySong}
                        data={data}
                        onHanldeSong={handleSong}
                        onHandlePlaySong={handlePlaySong}
                    />
                )}
            </div>
        );
    }
}

export default NewMusic;
