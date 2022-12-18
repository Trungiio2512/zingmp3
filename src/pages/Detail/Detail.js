import { faCircle, faEllipsisH, faHeart, faPause, faPlay, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import Button from "~/components/Button";
import { Grid, GridItem } from "~/components/Grid";
import Section from "~/layouts/components/Section";
import { Media } from "~/layouts/components/Media";
import Thumb from "~/layouts/components/Thumb";
import styles from "./Detail.module.scss";
import Artist from "~/layouts/components/Artist";
import { checkHasInList, getCurrentIndex, getTotalTimePlaylist, playlistCanPlay, setFollower } from "~/funtion";
import httpRequest from "~/untils/httpRequest";
import Loading from "~/layouts/components/Loading";
import {
    setCurrentIndexSong,
    setCurrentTimeSong,
    setIdPlaylistSong,
    setInfoCurrentSong,
    setPlaylistSong,
    setPlaySong,
    setRandomSong,
    setSongId,
} from "~/redux/PlayerSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Detail() {
    const location = useLocation();
    const { id, play, title } = location.state;

    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [data, setData] = useState(null);
    const [allSongs, setAllSongs] = useState([]);

    const idPlaylist = useSelector((state) => state.player.playlistIdSong);
    const songId = useSelector((state) => state.player.songId);
    const isPlaySong = useSelector((state) => state.player.isPlaySong);
    const playlistSong = useSelector((state) => state.player.playlistSong);
    const currentIndexSong = useSelector((state) => state.player.currentIndexSong);

    const handleSong = async (song, playlist) => {
        if (song?.isWorldWide) {
            if (idPlaylist !== id) {
                const newPlaylist = await playlistCanPlay(playlist);
                dispatch(setIdPlaylistSong(id));
                dispatch(setPlaylistSong(newPlaylist));
                dispatch(setInfoCurrentSong(song));
                dispatch(setSongId(song?.encodeId));
                const songIndex = await getCurrentIndex(song?.encodeId, newPlaylist);
                dispatch(setCurrentIndexSong(songIndex));
                // console.log(playlistRamdom(newPlaylist));
            } else {
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
            alert("song vip");
        }
    };

    const handleRandomSong = async (playlist) => {
        const newPlaylist = await playlistCanPlay(playlist);
        if (newPlaylist.length > 0) {
            const indexRandom = Math.floor(Math.random() * newPlaylist.length);
            dispatch(setRandomSong(true));
            dispatch(setIdPlaylistSong(id));
            dispatch(setPlaylistSong(newPlaylist));
            dispatch(setInfoCurrentSong(newPlaylist[indexRandom]));
            dispatch(setCurrentIndexSong(indexRandom));
            dispatch(setSongId(newPlaylist[indexRandom].encodeId));
        } else {
            alert("day la playlist vip");
        }
    };

    const handlePlaySong = async () => {
        if (idPlaylist === data?.encodeId) {
            if (checkHasInList(songId, playlistSong)) {
                dispatch(setPlaySong(!isPlaySong));
            } else {
                dispatch(setInfoCurrentSong(playlistSong[currentIndexSong]));
                dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
            }
        } else {
            handleRandomSong(allSongs);
        }
    };

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("detailplaylist", {
                    params: { id },
                });
                // console.log(res);
                setData(res?.data);
                setAllSongs((prev) => {
                    let sectionListSong = [];
                    if (res?.data?.sections) {
                        for (let section of res?.data?.sections) {
                            // eslint-disable-next-line no-unused-expressions
                            sectionListSong = [...sectionListSong, ...section?.items];
                        }
                    }
                    return [...sectionListSong, ...res?.data?.song?.items];
                });
                setLoading(false);
            } catch (error) {
                setFailed(true);
            }
        };
        fetchApi();
    }, [id]);

    useEffect(() => {
        if (play) {
            if (allSongs.length > 0) {
                handleRandomSong(allSongs);
            }
        } else return;
        console.log(play);
    }, [allSongs, play]);
    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>bi loi</div>;
    } else {
        return (
            <div className={cx("wrapper")}>
                <main className={cx("detail")}>
                    <div className={cx("detail-left")}>
                        <div
                            className={cx("detail-left__thumb", {
                                isPlay:
                                    isPlaySong && idPlaylist === data?.encodeId && checkHasInList(songId, playlistSong),
                            })}
                        >
                            <Thumb
                                isPlay={
                                    isPlaySong && idPlaylist === data?.encodeId && checkHasInList(songId, playlistSong)
                                }
                                title={data?.title}
                                thumbNail={data?.thumbnailM}
                                onClick={() => handlePlaySong()}
                            />
                        </div>
                        <div className={cx("detail-left__content")}>
                            <div className={cx("content-top")}>
                                <h4 className={cx("title")}>{data?.title}</h4>
                                <p className={cx("release")}>Cập nhật: {}</p>
                                <div className={cx("artists")}>
                                    <span>{data?.artistsNames}</span>
                                </div>
                                <span className={cx("like")}>{setFollower(data?.like)} người yêu thích</span>
                            </div>
                            <div className={cx("actions")}>
                                {data?.encodeId !== idPlaylist ? (
                                    <Button
                                        primary
                                        className={cx("actions-btn")}
                                        leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                        onClick={() => handleRandomSong(allSongs)}
                                    >
                                        phát ngẫu nhiên
                                    </Button>
                                ) : isPlaySong && checkHasInList(songId, playlistSong) ? (
                                    <Button
                                        primary
                                        className={cx("actions-btn")}
                                        leftIcon={<FontAwesomeIcon icon={faPause} />}
                                        onClick={() => handlePlaySong()}
                                    >
                                        tạm dừng
                                    </Button>
                                ) : (
                                    <Button
                                        primary
                                        className={cx("actions-btn")}
                                        leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                        onClick={() => handlePlaySong()}
                                    >
                                        tiếp tục phát
                                    </Button>
                                )}

                                <div className={cx("actions-level")}>
                                    <Button circle className={cx("actions-level__btn")}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </Button>
                                    <Button circle className={cx("actions-level__btn")}>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("detail-right")}>
                        {data?.song?.items &&
                            data?.song?.items.map((item, index) => (
                                <Media
                                    onClick={() => handleSong(item, allSongs)}
                                    key={index}
                                    hasBorderBot
                                    center
                                    song
                                    smallSizeImg
                                    small
                                    time
                                    right
                                    data={item}
                                />
                            ))}
                        <div className={cx("detail-right__info")}>
                            <span>{`${data?.song?.total} bài hát`}</span>
                            <span>
                                <FontAwesomeIcon icon={faCircle} />
                            </span>
                            <span>{getTotalTimePlaylist(data?.song?.totalDuration)}</span>
                        </div>
                        {data?.sections && (
                            <Section title={data?.sections?.title}>
                                {data?.sections.map((seciton, index) => {
                                    return (
                                        <Section key={index} title={seciton?.title}>
                                            {seciton?.items.map((item, index) => (
                                                <Media
                                                    onClick={() => handleSong(item, allSongs)}
                                                    key={index}
                                                    hasBorderBot
                                                    center
                                                    song
                                                    smallSizeImg
                                                    small
                                                    time
                                                    right
                                                    data={item}
                                                />
                                            ))}
                                        </Section>
                                    );
                                })}
                            </Section>
                        )}
                    </div>
                </main>
                <Section title="Nghệ sĩ tham gia">
                    <Grid>
                        {data?.artists.map((artist, index) => (
                            <GridItem key={index} m="4" l="2-4">
                                <Artist data={artist} />
                            </GridItem>
                        ))}
                    </Grid>
                </Section>
            </div>
        );
    }
}

export default Detail;
