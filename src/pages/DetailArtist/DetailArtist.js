import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Modal from "~/components/Modal";
import Loading from "~/layouts/components/Loading";
import classNames from "classnames/bind";

import Card from "~/layouts/components/Card";
import styles from "./DetailArtist.module.scss";
import httpRequest from "~/untils/httpRequest";
import Section from "~/layouts/components/Section";
import SliderPlaylist from "~/layouts/components/SliderPlaylist";
import Button from "~/components/Button";
import { Media } from "~/layouts/components/Media";
import Wrapper from "~/components/Wrapper";
import Artist from "~/layouts/components/Artist";
import {
    setCurrentIndexSong,
    setCurrentTimeSong,
    setIdPlaylistSong,
    setInfoCurrentSong,
    setPlaylistSong,
    setPlaySong,
    setRandomSong,
    setSongId,
} from "~/redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid, GridItem } from "~/components/Grid";
import { currentIndexSongPlay, playlistCanPlay } from "~/funtion";

const cx = classNames.bind(styles);

const typeSection = {};

function DetailArtist() {
    const { nameArtist } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [showDetalDecription, setShowDetialDescription] = useState(false);

    const biographyRef = useRef();

    const dispatch = useDispatch();

    const idPlaylist = useSelector((state) => state.player.playlistIdSong);
    const songId = useSelector((state) => state.player.songId);
    const isPlaySong = useSelector((state) => state.player.isPlaySong);
    const playlistSong = useSelector((state) => state.player.playlistSong);

    const handleShowDetialDescription = () => {
        setShowDetialDescription(!showDetalDecription);
    };
    const handleSong = async (song, playlist) => {
        if (song?.isWorldWide) {
            if (idPlaylist !== data?.playlistId) {
                const newPlaylist = await playlistCanPlay(playlist);
                dispatch(setIdPlaylistSong(data?.playlistId));
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
    const handlePlaySong = async (playlist) => {
        if (idPlaylist === data?.playlistId) {
            dispatch(setPlaySong(!isPlaySong));
        } else {
            const newPlaylist = await playlistCanPlay(playlist);
            dispatch(setIdPlaylistSong(data?.playlistId));
            dispatch(setPlaylistSong(newPlaylist));
            dispatch(setInfoCurrentSong(newPlaylist[0]));
            dispatch(setCurrentIndexSong(0));
            dispatch(setSongId(newPlaylist[0].encodeId));
        }
    };
    useEffect(() => {
        document.title = data?.name;
    }, [data]);
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get("artist", {
                    params: { name: nameArtist },
                });
                setData(res?.data);
                setLoading(false);
            } catch (error) {
                setFailed(true);
            }
        };
        fetchApi();
    }, [nameArtist]);

    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>bi loi</div>;
    } else {
        return (
            <div className={cx("wrapper")}>
                <div className={cx("artist")}>
                    <div className={cx("artist-info")}>
                        <h2 className={cx("artist-name")}>{data?.name}</h2>
                        {data?.sortBiography && (
                            <div className={cx("artist-biography")}>
                                {data?.sortBiography}
                                <Button className={cx("info-btn")} onClick={handleShowDetialDescription}>
                                    ... xem thêm
                                </Button>
                            </div>
                        )}
                        <div className={cx("artist-actions")}>
                            {isPlaySong && idPlaylist === data?.encodeId ? (
                                <Button
                                    primary
                                    className={cx("actions-btn")}
                                    leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                    // onClick={() => handlePlaySong()}
                                >
                                    tạm dừng
                                </Button>
                            ) : (
                                <Button
                                    primary
                                    className={cx("actions-btn")}
                                    leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                >
                                    phát nhạc
                                </Button>
                            )}

                            <Button primary className={cx("actions-btn")}>
                                quan tâm
                            </Button>
                        </div>
                        <div className={cx("artist-topAlbum")}>
                            <h4 className={cx("artist-topAlbum__heading")}>Mới nhất</h4>
                            <span className={cx("artist-topAlbum__newDate")}>10/22/2022</span>
                            <Media center song medium data={data?.topAlbum} />
                        </div>
                    </div>
                    <div className={cx("artist-thumb")}>
                        <figure className={cx("artist-img")}>
                            <img src={data?.thumbnailM} alt={data?.name} />
                        </figure>
                    </div>
                </div>
                {data &&
                    data?.sections.map((section, index) => {
                        if (section?.sectionType === "playlist") {
                            // console.log(section?.items);
                            return (
                                <Section key={index} title={section?.title}>
                                    <Grid>
                                        {section?.items.map((item, index) => (
                                            <GridItem l={"2-4"} m={4} key={index}>
                                                <Card playlist data={item} title subtitle />
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </Section>
                            );
                        }
                        if (section?.sectionType === "song") {
                            return (
                                <Section key={index} title={section?.title}>
                                    <div className={cx("list-song")}>
                                        {section?.items.map((item, index) => (
                                            <Media
                                                onClick={() => handleSong(item, section?.items)}
                                                key={index}
                                                song
                                                center
                                                right
                                                time
                                                small
                                                smallSizeImg
                                                data={item}
                                            />
                                        ))}
                                    </div>
                                </Section>
                            );
                        }
                        if (section?.sectionType === "artist") {
                            return (
                                <Section key={index} title={section?.title}>
                                    <Grid>
                                        {section?.items.map((item, index) => (
                                            <GridItem key={index} m="4" l="2-4" c={12}>
                                                <Artist data={item} />
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </Section>
                            );
                        }
                        if (section?.sectionType === "video") {
                            return (
                                <Section key={index} title={section?.title}>
                                    <Grid>
                                        {section?.items.map((item, index) => (
                                            <GridItem key={index} m={6} l={4} c={12}>
                                                <Card hasAvata mv data={item} />
                                            </GridItem>
                                        ))}
                                    </Grid>
                                </Section>
                            );
                        }
                    })}
                {/* <button onClick={handleShowDetialDescription}>mo ne</button> */}
                <Modal center isOpen={showDetalDecription} onRequestClose={handleShowDetialDescription}>
                    <main className={cx("card")}>
                        <div className={cx("card-info")}>
                            <div className={cx("card-thumb")}>
                                <figure className={cx("card-img")}>
                                    <img src={data?.thumbnailM} alt={data?.name} />
                                </figure>
                            </div>
                            <div className={cx("card-name")}>
                                <h2>{data?.name}</h2>
                            </div>
                        </div>
                        {data?.biography && <div className={cx("card-biogaphy")} ref={biographyRef}></div>}
                    </main>
                </Modal>
            </div>
        );
    }
}

export default DetailArtist;
