import classNames from "classnames/bind";
import Button from "~/components/Button";
import { Grid, GridItem } from "~/components/Grid";
import styles from "./Tab.module.scss";
import { Media } from "~/layouts/components/Media";
import { useState } from "react";
import { currentIndexSongPlay, playlistCanPlay, playlistRamdom } from "~/funtion";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentIndexSong,
    setCurrentTimeSong,
    setIdPlaylistSong,
    setInfoCurrentSong,
    setPlaylistSong,
    setPlaySong,
    setSongId,
} from "~/redux/playerSlice";
const cx = classNames.bind(styles);

function Tab1({ data, id }) {
    const dispatch = useDispatch();

    const [active, setActive] = useState(1);
    const [songs, setSongs] = useState(data?.vPop);
    const [albums, setAlbum] = useState(data.album);

    const idPlaylist = useSelector((state) => state.player.playlistIdSong);
    const songId = useSelector((state) => state.player.songId);
    const isPlaySong = useSelector((state) => state.player.isPlaySong);
    const playlistSong = useSelector((state) => state.player.playlistSong);
    // console.log(songs);
    const handleChangeTab = (index) => {
        setActive(index);
    };
    const handlePlaySong = async (song, playlist) => {
        if (song?.isWorldWide) {
            if (idPlaylist !== id) {
                const newPlaylist = await playlistCanPlay(playlist);
                dispatch(setIdPlaylistSong(id));
                dispatch(setPlaylistSong(newPlaylist));
                dispatch(setInfoCurrentSong(song));
                dispatch(setSongId(song?.encodeId));
                dispatch(setCurrentTimeSong(0));
                const songIndex = await currentIndexSongPlay(song?.encodeId, newPlaylist);
                dispatch(setCurrentIndexSong(songIndex));
                // console.log(playlistRamdom(newPlaylist));
            } else {
                if (songId === song.encodeId) {
                    dispatch(setPlaySong(!isPlaySong));
                } else {
                    dispatch(setInfoCurrentSong(song));
                    dispatch(setSongId(song?.encodeId));
                    dispatch(setCurrentTimeSong(0));
                    const songIndex = await currentIndexSongPlay(song?.encodeId, playlistSong);
                    dispatch(setCurrentIndexSong(songIndex));
                }
            }
        } else {
            alert("song vip");
        }
    };
    return (
        <div className={cx("tab1")}>
            <div className={cx("tab1-control")}>
                <Button
                    className={cx("tab1-control__btn", active === 1 ? "tab1-control__btn--active" : "")}
                    onClick={() => handleChangeTab(1)}
                >
                    Bài hát
                </Button>

                <Button
                    className={cx("tab1-control__btn", active === 2 ? "tab1-control__btn--active" : "")}
                    onClick={() => handleChangeTab(2)}
                >
                    Album
                </Button>
            </div>
            <div className={cx("tab1-body")}>
                <div className={cx("tab1-container", active === 1 ? "tab1-container--active" : "")}>
                    <Grid>
                        {songs.map((song, index) => (
                            <GridItem c={12} m={6} l={4} key={index}>
                                <Media onClick={() => handlePlaySong(song, songs)} small song right data={song} />
                            </GridItem>
                        ))}
                    </Grid>
                </div>
                {/* <div className={cx("tab1-container", active === 2 ? "tab1-container--active" : "")}>
                    <Grid>
                        {albums.map((album, index) => (
                            <GridItem c={12} m={6} l={4} key={index}>
                                <Media small album right data={album} />
                            </GridItem>
                        ))}
                    </Grid>
                </div> */}
            </div>
        </div>
    );
}

export default Tab1;
