import {
    faFilm,
    faListOl,
    faMicrophoneAlt,
    faPause,
    faPlay,
    faRandom,
    faStepBackward,
    faStepForward,
    faUndo,
    faVolumeMute,
    faVolumeUp,
    faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import httpRequest from "~/untils/httpRequest";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import {
    setCurrentIndexSong,
    setCurrentTimeSong,
    setInfoCurrentSong,
    setMutedSong,
    setPlaySong,
    setRandomSong,
    setRepeatSong,
    setSongId,
    setSongSrc,
    setVolumeSong,
} from "~/redux/PlayerSlice";
import styles from "./Player.module.scss";
import { getTimeSong } from "~/funtion";
import Input from "~/components/Input";

const cx = classNames.bind(styles);

function Player({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMvAndPlay, setShowMvAndPlay] = useState(false);
    const [showListMusicLove, setShowListMusicLove] = useState(false);
    // const [isLoadingSong, setLoadingSong] = useState(false);

    const isPlaySong = useSelector((state) => state.player.isPlaySong);
    const isMuted = useSelector((state) => state.player.isMuted);
    const isRepeat = useSelector((state) => state.player.isRepeat);
    const isRandom = useSelector((state) => state.player.isRandom);
    const songSrc = useSelector((state) => state.player.songSrc);
    const songId = useSelector((state) => state.player.songId);
    const volumeSong = useSelector((state) => state.player.volumeSong);
    const currentInfoSong = useSelector((state) => state.player.currentInfoSong);
    const currentTimeSong = useSelector((state) => state.player.currentTimeSong);
    const currentIndexSong = useSelector((state) => state.player.currentIndexSong);
    const playlistSong = useSelector((state) => state.player.playlistSong);

    const videoId = useSelector((state) => state.mv.videoId);
    const titleVideo = useSelector((state) => state.mv.title);
    const linkVideo = useSelector((state) => state.mv.link);
    // const playlistRandomSong = useSelector((state) => state.player.playlistRandomSong);

    // const [currentDurationSong, setCurrentDurationSong] = useState(() => getTimeSong(currentTimeSong));

    const audioRef = useRef();
    const durationAudioRef = useRef();
    // const volumeAudioRef = useRef();

    const handleShowListMusicLove = () => {
        setShowListMusicLove(!showListMusicLove);
        // console.log(currentTimeSong);
    };
    const handlePLaySong = () => {
        if (!songSrc) {
            alert("Please select a song");
        } else {
            dispatch(setPlaySong(!isPlaySong));
        }
    };

    const handleMutedSong = () => {
        console.log(isMuted);
        dispatch(setMutedSong());
        isMuted ? dispatch(setVolumeSong(0)) : dispatch(setVolumeSong(1));
        // console.log(audioRef.current.volume);
    };

    const handleVolumeSong = (e) => {
        const volume = e.target.value;
        dispatch(setVolumeSong(volume / 100));
        if (volume === 0) {
            dispatch(setMutedSong());
        }
    };

    const handleChangeDuration = (e) => {
        // console.log(e.target.value);
        if (!!audioRef.current) {
            dispatch(setCurrentTimeSong(parseInt(e.target.value)));
            audioRef.current.currentTime = e.target.value;
        }
    };

    const handleNextSong = () => {
        if (songSrc && playlistSong.length > 0) {
            // dispatch(setCurrentTimeSong(0));
            if (currentIndexSong >= playlistSong.length - 1) {
                dispatch(setCurrentIndexSong(0));
                dispatch(setInfoCurrentSong(playlistSong[0]));
                dispatch(setSongId(playlistSong[0].encodeId));
            } else {
                dispatch(setCurrentIndexSong(currentIndexSong + 1));
                dispatch(setInfoCurrentSong(playlistSong[currentIndexSong + 1]));
                dispatch(setSongId(playlistSong[currentIndexSong + 1].encodeId));
            }
        } else {
            alert("Please select a playlist");
        }
    };

    const handlePrevSong = () => {
        if (songSrc && playlistSong.length > 0) {
            // dispatch(setCurrentTimeSong(0));
            if (currentIndexSong <= 0) {
                dispatch(setCurrentIndexSong(playlistSong.length - 1));
                dispatch(setInfoCurrentSong(playlistSong[playlistSong.length - 1]));
                dispatch(setSongId(playlistSong[playlistSong.length - 1].encodeId));
            } else {
                dispatch(setCurrentIndexSong(currentIndexSong - 1));
                dispatch(setInfoCurrentSong(playlistSong[currentIndexSong - 1]));
                dispatch(setSongId(playlistSong[currentIndexSong - 1].encodeId));
            }
        } else {
            alert("Please select a playlist");
        }
    };

    const handleRandomSong = () => {
        dispatch(setRandomSong(!isRandom));
    };
    useEffect(() => {
        dispatch(setPlaySong(false));
        // dispatch(setLoadingSong(true));
        const fetchApi = async () => {
            dispatch(setCurrentTimeSong(0));
            try {
                const res = await httpRequest.get("song", {
                    params: {
                        id: songId,
                    },
                });
                console.log(res.data);
                dispatch(setSongSrc(res.data[128]));
                // if (res.err === 0) {
                // } else if (res.err === -1110) {
                //     const resMore = await axios.get(res.url);
                //     console.log(resMore);
                // }
                // dispatch(setLoadingSong(false));

                dispatch(setPlaySong(true));
            } catch (error) {
                return;
            }
        };
        fetchApi();
    }, [dispatch, songId]);

    useEffect(() => {
        if (songSrc) {
            isPlaySong ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [isPlaySong, songSrc]);

    useEffect(() => {
        if (!!audioRef.current) {
            audioRef.current.volume = volumeSong;
        }
    }, [volumeSong]);

    //event inputAudio
    useEffect(() => {
        const handleAudioSong = () => {
            dispatch(setPlaySong(false));
        };
        if (!!songSrc) {
            durationAudioRef.current.addEventListener("mousedown", handleAudioSong);
        }
    }, [dispatch, songSrc]);

    useEffect(() => {
        const handleAudioSong = () => {
            dispatch(setPlaySong(true));
            audioRef.current.play();
        };
        if (!!songSrc) {
            durationAudioRef.current.addEventListener("mouseup", handleAudioSong);
        }
    }, [dispatch, songSrc]);
    //event audio

    useEffect(() => {
        const handeValueInputAudio = () => {
            dispatch(setCurrentTimeSong(audioRef.current.currentTime));
        };
        if (!!songSrc && audioRef.current) {
            audioRef.current.addEventListener("timeupdate", handeValueInputAudio);
        }
    }, [dispatch, songSrc]);

    useEffect(() => {
        const handleSong = () => {
            if (isRandom) {
                const nextIndexSong = Math.floor(Math.random() * playlistSong.length);
                const nextSong = playlistSong[nextIndexSong];
                dispatch(setCurrentIndexSong(nextIndexSong));
                dispatch(setInfoCurrentSong(nextSong));
                dispatch(setSongId(nextSong.encodeId));
            }
            if (isRepeat) {
                dispatch(setPlaySong(true));
            }
            dispatch(setPlaySong(false));
        };
        if (audioRef.current && playlistSong.length > 0) {
            audioRef.current.addEventListener("ended", handleSong);
        }
    }, [dispatch, isRandom, isRepeat, playlistSong]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("song-info")}>
                <img src={currentInfoSong?.thumbnail} alt={currentInfoSong?.title} className={cx("song-info__img")} />
                <div className={cx("song-info__body")}>
                    <div className={cx("title-wrapper", { animationText: isPlaySong })}>
                        <Link to className={cx("title-link")}>
                            <span>{currentInfoSong?.title}</span>
                        </Link>
                        <Link to className={cx("title-link", "title-link--second")}>
                            <span>{currentInfoSong?.title}</span>
                        </Link>
                    </div>
                    <h3 className={cx("artists")}>
                        {currentInfoSong?.artists.map((artist, index) => (
                            <Link to={artist?.link} key={index} className={cx("artists-name")}>
                                {artist.name}
                            </Link>
                        ))}
                    </h3>
                </div>
            </div>
            <div className={cx("song-control")}>
                <div className={cx("song-control__top")}>
                    <Button className={cx({ isRandom })} onClick={handleRandomSong} circle hover>
                        <FontAwesomeIcon icon={faRandom} />
                    </Button>
                    <Button disabled={playlistSong.length <= 0} className={cx()} circle hover onClick={handlePrevSong}>
                        <FontAwesomeIcon icon={faStepBackward} />
                    </Button>

                    <Button disabled={!songSrc} className={cx()} onClick={handlePLaySong} circle outline>
                        {isPlaySong && songSrc ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </Button>

                    <Button disabled={playlistSong.length <= 0} className={cx()} circle hover onClick={handleNextSong}>
                        <FontAwesomeIcon icon={faStepForward} />
                    </Button>
                    <Button className={cx({ isRepeat })} onClick={() => dispatch(setRepeatSong())} circle hover>
                        <FontAwesomeIcon icon={faUndo} />
                    </Button>
                </div>
                <div className={cx("song-control__bottom")}>
                    <span>{getTimeSong(currentTimeSong)}</span>
                    {/* <input
                            min="0"
                            max={currentInfoSong.duration}
                            value={currentTimeSong}
                            // max="100"
                            type="range"
                            ref={durationAudioRef}
                            onChange={handleChangeDuration}
                        /> */}
                    <div className={cx("song-control__bottom-time")}>
                        <Input
                            min={0}
                            max={currentInfoSong.duration}
                            value={currentTimeSong}
                            // max="100"
                            type="range"
                            ref={durationAudioRef}
                            onHandleChange={handleChangeDuration}
                        />
                    </div>
                    <audio ref={audioRef} src={songSrc} loop={isRepeat && songSrc}></audio>
                    <span>{getTimeSong(currentInfoSong.duration)}</span>
                </div>
            </div>
            <div className={cx("song-actions")}>
                <Tippy content="Mv bài hát" placement="top" delay={[280, 150]}>
                    <Button
                        disabled={!videoId}
                        circle
                        hover
                        onClick={() => {
                            navigate(linkVideo, {
                                state: {
                                    title: titleVideo,
                                    id: videoId,
                                },
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faFilm} />
                    </Button>
                </Tippy>
                <Tippy content="Lời bài hát" placement="top" delay={[280, 150]}>
                    <Button circle hover>
                        <FontAwesomeIcon icon={faMicrophoneAlt} />
                    </Button>
                </Tippy>
                <Tippy content="Chế độ cửa sổ" placement="top" delay={[280, 150]}>
                    <Button circle hover>
                        <FontAwesomeIcon icon={faWindowRestore} />
                    </Button>
                </Tippy>
                <div className={cx("song-actions__volume")}>
                    <Button circle hover className={cx("song-actions__volume-btn")} onClick={handleMutedSong}>
                        {volumeSong === 0 ? (
                            <FontAwesomeIcon icon={faVolumeMute} />
                        ) : (
                            <FontAwesomeIcon icon={faVolumeUp} />
                        )}
                    </Button>
                    <div className={cx("song-actions__volume-box")}>
                        <Input min={0} max={100} value={volumeSong * 100} onHandleChange={handleVolumeSong} />
                    </div>
                </div>
                <Button
                    circle
                    // hover
                    onClick={handleShowListMusicLove}
                    className={cx(showListMusicLove ? "song-actions--active" : "")}
                >
                    <FontAwesomeIcon icon={faListOl} />
                </Button>
                <Modal modalMv isOpen={showMvAndPlay} onRequestClose={() => setShowMvAndPlay(!showMvAndPlay)} />
            </div>
        </div>
    );
}

export default Player;
