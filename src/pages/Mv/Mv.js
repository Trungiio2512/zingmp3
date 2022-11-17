import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import styles from "./Mv.module.scss";
import { MediaArtist } from "~/layouts/components/Media";
import Button from "~/components/Button";
import { faEllipsisH, faMusic, faTimes, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Grid, GridItem } from "~/components/Grid";
import Card from "~/layouts/components/Card";

const cx = classNames.bind(styles);

function Mv() {
    const location = useLocation();
    const { id, play } = location.state;

    const [data, setData] = useState(null);
    const [quality, setQuality] = useState("360p");
    const [videoRecommends, setVideoRecommends] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isFailed, setFailed] = useState(false);

    const videoRef = useRef();

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
                setVideoRecommends(res?.data?.recommends);
                // console.log(data);
            } catch (error) {
                setFailed(true);
                setLoading(false);
                console.error(error.response);
            }
        };
        fetchApi();
    }, [id]);

    // console.log(videoRef.current);
    // useEffect(() => {
    //     // videoRef.current.volume = 0;
    //     if (play) {
    //         videoRef.current.play();
    //     }
    // }, [play]);

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
                                        <Button circle onClick={() => window.history.back()}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </Tippy>
                                </div>
                            </div>
                            <div className={cx("video-main")}>
                                <Grid>
                                    <GridItem c={12} m={12} l={9}>
                                        <div
                                            className={cx("video-player")}
                                            onClick={() => console.log(videoRef.current)}
                                        >
                                            <video ref={videoRef} src={data?.streaming?.mp4[quality]}>
                                                {/* <source  type="video/mp4" /> */}
                                            </video>
                                            <div className={cx("video-controls")}>
                                                <div className={cx("video-controls__left")}></div>
                                                <div className={cx("video-controls__right")}></div>
                                            </div>
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
