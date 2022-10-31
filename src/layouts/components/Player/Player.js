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
    faVolumeDown,
    faVolumeMute,
    faVolumeUp,
    faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import httpRequest from "~/untils/httpRequest";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import {
    setCurrentTimeSong,
    setMutedSong,
    setPlaySong,
    setRandomSong,
    setRepeatSong,
    setSongSrc,
    setVolumeSong,
} from "~/redux/PlayerSlice";
import styles from "./Player.module.scss";
import axios from "axios";
import { getTimeSong } from "~/funtion";

const cx = classNames.bind(styles);

function Player({ data }) {
    const dispatch = useDispatch();

    const isPlay = useSelector((state) => state.player.isPlay);
    const songSrc = useSelector((state) => state.player.songSrc);
    const infoCurrentSong = useSelector((state) => state.player.infoCurrentSong);
    const isRandom = useSelector((state) => state.player.isRandom);
    const isRepeat = useSelector((state) => state.player.isRepeat);
    const songId = useSelector((state) => state.player.songId);
    const isMuted = useSelector((state) => state.player.isMuted);
    const durationSong = useSelector((state) => state.player.durationSong);
    const currentTimeSong = useSelector((state) => state.player.currentTimeSong);
    const volumeSong = useSelector((state) => state.player.volumeSong);

    const [showListMusicLove, setShowListMusicLove] = useState(false);
    // const [currentDurationSong, setCurrentDurationSong] = useState(() => getTimeSong(currentTimeSong));

    const audioRef = useRef();
    const durationAudioRef = useRef();
    const volumeAudioRef = useRef();

    const handleShowListMusicLove = () => {
        setShowListMusicLove(!showListMusicLove);
        // console.log(currentTimeSong);
    };
    const handlePLaySong = () => {
        if (!songSrc) {
            alert("Please select a song");
        } else {
            dispatch(setPlaySong(!isPlay));
        }
    };

    const handleMutedSong = () => {
        dispatch(setMutedSong());
        isMuted ? dispatch(setVolumeSong(0)) : dispatch(setVolumeSong(1));
        // console.log(audioRef.current.volume);
    };

    const handleVolumeSong = (e) => {
        const volume = e.target.value;
        dispatch(setVolumeSong(volume / 100));
    };

    const handleChangeDuration = (e) => {
        // console.log(e.target.value);
        if (!!audioRef.current) {
            dispatch(setCurrentTimeSong(parseInt(e.target.value)));
            audioRef.current.currentTime = currentTimeSong;
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("song", {
                    params: {
                        id: songId,
                    },
                });
                dispatch(setSongSrc(res.data[128]));
                // if (res.err === 0) {
                // } else if (res.err === -1110) {
                //     const resMore = await axios.get(res.url);
                //     console.log(resMore);
                // }
                dispatch(setPlaySong(true));
            } catch (error) {
                return;
            }
        };
        fetchApi();
    }, [dispatch, songId]);

    useEffect(() => {
        if (songSrc) {
            isPlay ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [isPlay, songSrc]);

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
        if (!!songSrc && durationSong) {
            durationAudioRef.current.addEventListener("mousedown", handleAudioSong);
        }
    }, [dispatch, durationSong, songSrc]);

    useEffect(() => {
        const handleAudioSong = () => {
            dispatch(setPlaySong(true));
            audioRef.current.play();
        };
        if (!!songSrc && durationSong) {
            durationAudioRef.current.addEventListener("mouseup", handleAudioSong);
        }
    }, [dispatch, durationSong, songSrc]);
    //event audio

    useEffect(() => {
        const handeValueInputAudio = () => {
            dispatch(setCurrentTimeSong(audioRef.current.currentTime));
        };
        if (!!songSrc) {
            audioRef.current.addEventListener("timeupdate", handeValueInputAudio);
        }
    }, [dispatch, songSrc]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("song-info")}>
                <img src={infoCurrentSong.thumbnail} alt={infoCurrentSong.title} className={cx("song-info__img")} />
                <div className={cx("song-info__body")}>
                    <div className={cx("title-wrapper", { animationText: isPlay })}>
                        <Link to className={cx("title-link")}>
                            <span>{infoCurrentSong.title}</span>
                        </Link>
                        <Link to className={cx("title-link", "title-link--second")}>
                            <span>{infoCurrentSong.title}</span>
                        </Link>
                    </div>
                    <h3 className={cx("artists")}>
                        {infoCurrentSong.artists.map((artist, index) => (
                            <Link to={artist?.link} key={index} className={cx("artists-name")}>
                                {artist.name}
                            </Link>
                        ))}
                    </h3>
                </div>
            </div>
            <div className={cx("song-control")}>
                <div className={cx("song-control__top")}>
                    <Button
                        className={cx("song-control__btn", { isRandom })}
                        onClick={() => dispatch(setRandomSong())}
                        circle
                        hover
                    >
                        <FontAwesomeIcon icon={faRandom} />
                    </Button>
                    <Button className={cx("song-control__btn")} circle hover>
                        <FontAwesomeIcon icon={faStepBackward} />
                    </Button>
                    {isPlay && songSrc ? (
                        <Button className={cx("song-control__btn")} onClick={handlePLaySong} circle outline>
                            <FontAwesomeIcon icon={faPause} />
                        </Button>
                    ) : (
                        <Button className={cx("song-control__btn")} onClick={handlePLaySong} circle outline>
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    )}
                    <Button className={cx("song-control__btn")} circle hover>
                        <FontAwesomeIcon icon={faStepForward} />
                    </Button>
                    <Button
                        className={cx("song-control__btn", { isRepeat })}
                        onClick={() => dispatch(setRepeatSong())}
                        circle
                        hover
                    >
                        <FontAwesomeIcon icon={faUndo} />
                    </Button>
                </div>
                <div className={cx("song-control__bottom")}>
                    <span>{getTimeSong(currentTimeSong)}</span>
                    <div className={cx("control-range")}>
                        <input
                            min="0"
                            max={durationSong}
                            value={currentTimeSong}
                            // max="100"
                            type="range"
                            ref={durationAudioRef}
                            onChange={handleChangeDuration}
                        />
                    </div>
                    <audio ref={audioRef} src={songSrc} loop={isRepeat && songSrc}></audio>
                    <span>{infoCurrentSong.timeSong}</span>
                </div>
            </div>
            <div className={cx("song-actions")}>
                <Button circle hover>
                    <FontAwesomeIcon icon={faFilm} />
                </Button>
                <Button circle hover>
                    <FontAwesomeIcon icon={faMicrophoneAlt} />
                </Button>
                <Button circle hover>
                    <FontAwesomeIcon icon={faWindowRestore} />
                </Button>
                <div className={cx("song-actions__volume")}>
                    <Button circle hover className={cx("song-actions__volume-btn")} onClick={handleMutedSong}>
                        {volumeSong === 0 ? (
                            <FontAwesomeIcon icon={faVolumeMute} />
                        ) : (
                            <FontAwesomeIcon icon={faVolumeUp} />
                        )}
                    </Button>
                    <div className={cx("control-range", "control-range--volume")}>
                        <input min="0" max="100" value={volumeSong * 100} onChange={handleVolumeSong} type="range" />
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
                <Modal isOpen={showListMusicLove} fromRight>
                    <Button>close</Button>
                </Modal>
            </div>
        </div>
    );
}

export default Player;
