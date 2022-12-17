import { createRef, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import styles from "./Mv.module.scss";
import { MediaArtist } from "~/layouts/components/Media";
import Button from "~/components/Button";
import {
    faBackwardStep,
    faEllipsisH,
    faExpand,
    faForwardStep,
    faGear,
    faMusic,
    faPause,
    faPlay,
    faRepeat,
    faTimes,
    faVolumeUp,
    faVolumeXmark,
    faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { Grid, GridItem } from "~/components/Grid";
import Card from "~/layouts/components/Card";
import Input from "~/components/Input";
import { getTimeSong } from "~/funtion";
import { useDispatch, useSelector } from "react-redux";
import { setLinkVideo, setTitleVideo, setVideoId } from "~/redux/mvSlice";
import { getCurrentIndex } from "~/funtion";
const cx = classNames.bind(styles);

function Mv() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, play, title } = location.state;

    const [data, setData] = useState(null);
    const [quality, setQuality] = useState("480p");
    const [videoRecommends, setVideoRecommends] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isFailed, setFailed] = useState(false);
    const [isPlay, setPlay] = useState(false);
    const [isMuted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentIndexVideo, setCurrentIndexVideo] = useState(null);

    const videoId = useSelector((state) => state.mv.videoId);

    const dispatch = useDispatch();

    const videoRef = createRef();

    const handlePlayVideo = (video) => {
        if (videoRef.current) {
            setPlay(!isPlay);
        }
    };

    const handleSeekVideo = (e) => {
        if (videoRef.current) {
            videoRef.current.currentTime = e.target.value;
        }
    };

    const handleChangeVolume = (e) => {
        const volume = e.target.value;
        setVolume(volume / 100);
        if (volume === 0) {
            setMuted(true);
        }
    };

    const handleMutedVideo = () => {
        if (isMuted) {
            setMuted(false);
            setVolume(1);
        } else {
            setMuted(true);
            setVolume(0);
        }
    };

    console.log(videoRecommends);
    const handleNextMv = () => {
        alert("Khong the next do api");
    };
    // console.log(currentIndexVideo);
    const handlePrevMv = () => {
        alert("Khong the prev do api");
    };
    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [videoRef, volume]);

    useEffect(() => {
        if (videoRef.current) {
            isPlay ? videoRef.current.play() : videoRef.current.pause();
        }
    }, [isPlay, videoRef]);

    useEffect(() => {
        if (videoRef.current) {
            const handleValueInputVideo = (e) => {
                setCurrentTime(e.target.currentTime);
            };
            videoRef.current.addEventListener("timeupdate", handleValueInputVideo);
        }
    }, [videoRef]);

    // console.log(window.location);

    useEffect(() => {
        setLoading(true);

        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("video", {
                    params: {
                        id,
                    },
                });
                setLoading(false);
                setData(res?.data);
                console.log(res.data);
                setVideoRecommends(res?.data?.recommends);
                const idMv = await getCurrentIndex(id, res?.data?.recommends);
                setCurrentIndexVideo(idMv);
            } catch (error) {
                setFailed(true);
                setLoading(false);
                console.error(error);
            }
        };
        fetchApi();
    }, [dispatch, id]);

    useEffect(() => {
        // console.log(window.location);
        if (id !== videoId) {
            dispatch(setVideoId(id));

            dispatch(setTitleVideo(title));
            dispatch(setLinkVideo(window.location.pathname));
        }
    }, [dispatch, id, title, videoId]);

    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>Loi</div>;
    } else {
        return (
            data && (
                <div className={cx("wrapper")}>
                    <div className={cx("video")}>
                        <div className={cx("video-bg")}>
                            <div
                                className={cx("video-bg__img")}
                                style={{ backgroundImage: `url(${data?.thumbnailM})` }}
                            ></div>
                            <div className={cx("video-bg__blur")}> </div>
                            {/* <div className={cx("video-bg__primary")}></div> */}
                        </div>
                        <div className={cx("video-container")}>
                            <div className={cx("video-header")}>
                                <div className={cx("video-header__left")}>
                                    <MediaArtist
                                        avata
                                        title={data?.title}
                                        dataArtist={data?.artist}
                                        dataArtists={data?.artists}
                                        className={cx("video-artist")}
                                    />
                                    <Tippy delay={[280, 150]} placement="bottom" content="Thêm vào thử viện">
                                        <Button circle onClick={() => console.log(videoRef.current)}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </Button>
                                    </Tippy>
                                    <Tippy delay={[280, 150]} placement="bottom" content="Phát nhạc">
                                        <Button circle>
                                            <FontAwesomeIcon icon={faMusic} />
                                        </Button>
                                    </Tippy>
                                    <Tippy delay={[280, 150]} placement="bottom" content="Khác">
                                        <Button circle>
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </Button>
                                    </Tippy>
                                </div>
                                <div className={cx("video-header__right")}>
                                    <Tippy delay={[280, 150]} placement="bottom" content="Thu nhỏ">
                                        <Button circle>
                                            <FontAwesomeIcon icon={faWindowRestore} />
                                        </Button>
                                    </Tippy>
                                    <Tippy delay={[280, 150]} placement="bottom" content="Đóng">
                                        <Button circle onClick={() => navigate("/")}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </Tippy>
                                </div>
                            </div>
                            <div className={cx("video-main")}>
                                <Grid>
                                    <GridItem c={12} m={12} l={9}>
                                        ``{" "}
                                        <div className={cx("video-player")}>
                                            {data?.streaming?.mp4 ? (
                                                <>
                                                    <video ref={videoRef} src={data?.streaming?.mp4[quality]}>
                                                        {/* <source  type="video/mp4" /> */}
                                                    </video>
                                                    <div className={cx("video-controls")}>
                                                        <div className={cx("video-controls__time")}>
                                                            <Input
                                                                min={0}
                                                                max={data?.duration}
                                                                value={currentTime}
                                                                onHandleChange={handleSeekVideo}
                                                            />
                                                        </div>
                                                        <div className={cx("video-controls__left")}>
                                                            <Button
                                                                className={cx("video-controls__btn")}
                                                                disabled={videoRecommends.length <= 0}
                                                                onClick={handlePrevMv}
                                                            >
                                                                <FontAwesomeIcon icon={faBackwardStep} />
                                                            </Button>
                                                            <Button
                                                                className={cx(
                                                                    "video-controls__btn",
                                                                    "video-controls__btn--play",
                                                                )}
                                                                onClick={handlePlayVideo}
                                                            >
                                                                {isPlay ? (
                                                                    <FontAwesomeIcon icon={faPause} />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faPlay} />
                                                                )}
                                                            </Button>
                                                            <Button
                                                                disabled={videoRecommends.length <= 0}
                                                                className={cx("video-controls__btn")}
                                                                onClick={handleNextMv}
                                                            >
                                                                <FontAwesomeIcon icon={faForwardStep} />
                                                            </Button>
                                                            <div className={cx("video-controls__left-volume-box")}>
                                                                <Button
                                                                    className={cx("video-controls__btn")}
                                                                    onClick={handleMutedVideo}
                                                                >
                                                                    {volume <= 0 ? (
                                                                        <FontAwesomeIcon icon={faVolumeXmark} />
                                                                    ) : (
                                                                        <FontAwesomeIcon icon={faVolumeUp} />
                                                                    )}
                                                                </Button>
                                                                <div className={cx("video-controls__left-volume")}>
                                                                    <Input
                                                                        min={0}
                                                                        max={100}
                                                                        value={volume * 100}
                                                                        onHandleChange={handleChangeVolume}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={cx("video-controls__left-showTime")}>
                                                                <span>{getTimeSong(currentTime)}</span>
                                                                <span>|</span>
                                                                <span>{getTimeSong(data?.duration)}</span>
                                                            </div>
                                                        </div>
                                                        <div className={cx("video-controls__right")}>
                                                            <Button className={cx("video-controls__btn")}>
                                                                <FontAwesomeIcon icon={faRepeat} />
                                                            </Button>
                                                            <Button className={cx("video-controls__btn")}>
                                                                <FontAwesomeIcon icon={faGear} />
                                                            </Button>
                                                            <Button className={cx("video-controls__btn")}>
                                                                <FontAwesomeIcon icon={faRectangleXmark} />
                                                            </Button>
                                                            <Button
                                                                className={cx(
                                                                    "video-controls__btn",
                                                                    "video-controls__btn--fullscreen",
                                                                )}
                                                            >
                                                                <FontAwesomeIcon icon={faExpand} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div> loi vdieo</div>
                                            )}
                                        </div>
                                    </GridItem>
                                    <GridItem c={12} m={12} l={3}>
                                        <div className={cx("video-recomends")}>
                                            <div className={cx("video-recomends__header")}>
                                                <h4 className={cx("video-recomends__title")}>Danh sách phát</h4>
                                                <Button>Tu dong phats</Button>
                                            </div>
                                            <div className={cx("video-recomends__list")}>
                                                <Grid>
                                                    {videoRecommends.length > 0 &&
                                                        videoRecommends.map((recommend) => (
                                                            <GridItem key={recommend?.encodeId} l={12} m={3} c={6}>
                                                                <div className={cx("video-recomends__item")}>
                                                                    <Card mv mvRecommend data={recommend} />
                                                                </div>
                                                            </GridItem>
                                                        ))}
                                                </Grid>
                                            </div>
                                        </div>
                                    </GridItem>
                                </Grid>
                            </div>
                            {/* <div className={cx("video-list")}></div> */}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Mv;
