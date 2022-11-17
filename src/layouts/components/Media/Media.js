import { faEllipsisH, faMinus, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import Button from "~/components/Button";
import styles from "./Media.module.scss";
import { images } from "~/assets";
import { getTimeSong } from "~/funtion";
// import { setCurrentTimeSong, setDurationSong, setInfoCurrentSong, setPlaySong, setSongId } from "~/redux/playerSlice";
import VipIcon from "~/components/Icons";
import { useState } from "react";

const cx = classNames.bind(styles);
function Media({
    small = false,
    medium = false,
    center = false,
    time = false,
    circle_small = false,
    rank = false,
    song = false,
    right = false,
    album = false,
    smallSizeImg = false,
    className,
    data,
    onClick,
    rankNumber,
    check = false,
}) {
    // console.log(data);
    // con sole.log(Math.floor(data?.duration / 60));
    const [timeSong, setTimeSong] = useState(() => getTimeSong(data?.duration));

    const isPlaySong = useSelector((state) => state.player.isPlaySong);
    const songId = useSelector((state) => state.player.songId);
    // const playlistSong = useSelector((state) => state.player.playlistSong);

    // const dispatch = useDispatch();
    const classes = cx("media", {
        [className]: className,
        medium,
        center,
        album,
        small,
        // song,
        circle_small,
        // right,
        time,
        // addPlaylist,
        active: songId === data?.encodeId,
        isWorldWide: !data?.isWorldWide,
    });

    // const handleSong = () => {
    //     if (!data?.isWorldWide) {
    //         alert("đây là bài vip: ");
    //         return;
    //     }
    //     if (songId === data?.encodeId) {
    //         dispatch(setPlaySong(true));
    //     } else {
    //         dispatch(setInfoCurrentSong(data));
    //         dispatch(setCurrentTimeSong(0));
    //         dispatch(setSongId(data?.encodeId));
    //         dispatch(setPlaySong(false));
    //     }
    // };

    return (
        data && (
            <div className={classes}>
                <div className={cx("media-left")}>
                    {check && (
                        <div className={cx("checkbox")}>
                            <input type="checkbox" />
                        </div>
                    )}
                    {rank && !!rankNumber && (
                        <div className={cx("rank")}>
                            <span className={cx("rank-number", `rank-number--${rankNumber}`)}>{rankNumber}</span>
                            <span className={cx("rank-sort")}>
                                <FontAwesomeIcon className={cx("icon")} icon={faMinus} />
                            </span>
                        </div>
                    )}
                    <div className={cx("thumb", { circle_small, smallSizeImg })}>
                        {song && (
                            <>
                                <figure className={cx("thumb-song", "thumb-img")}>
                                    <img src={data?.thumbnailM} alt="" />
                                </figure>
                                <Button className={cx("thumb-control")} onClick={onClick}>
                                    {isPlaySong && songId === data?.encodeId ? (
                                        <FontAwesomeIcon icon={faPause} />
                                    ) : (
                                        /* <Button circle hover>
                                            {images.iconPlayingWhiteUrl()}
                                        </Button> */
                                        <FontAwesomeIcon icon={faPlay} />
                                    )}
                                </Button>
                            </>
                        )}
                        {album && (
                            <>
                                <figure className={cx("thumb-album", "thumb-img")}>
                                    <img src={images.albumDick} alt="" />
                                </figure>
                                <div className={cx("thumb-actions")}>
                                    <figure className={cx("thumb-img")}>
                                        <img src={data?.thumbnailM} alt={data?.title} />
                                    </figure>
                                    <Button className={cx("thumb-control")}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={cx("info")}>
                        <h4 className={cx("info-name")}>
                            {data?.title}
                            {data?.isWorldWide ? "" : <VipIcon />}
                        </h4>
                        <p className={cx("info-artists")}>
                            {data?.artists &&
                                data?.artists.map((artist, index) => (
                                    <Link to={artist?.link} className={cx("info-artists__name")} key={index}>
                                        {artist?.name}
                                    </Link>
                                ))}
                        </p>
                    </div>
                </div>
                {center && (
                    <div className={cx("media-center")}>
                        <Link to={data?.album?.link} className={cx("song-name")}>
                            {data?.album?.title}
                        </Link>
                    </div>
                )}
                {right && (
                    <div className={cx("media-right")}>
                        <div className={cx("media-right__action")}>
                            <Button circle hover>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </Button>
                        </div>
                        {time && (
                            <span className={cx("media-right__time")}>
                                {/* {Math.floor(data?.duration / 60) < 10
                                ? `0${Math.floor(data?.duration / 60)}`
                                : Math.floor(data?.duration / 60)}
                            : {data?.duration % 60 < 10 ? `0${data?.duration % 60}` : data?.duration % 60} */}
                                {timeSong}
                            </span>
                        )}
                    </div>
                )}
            </div>
        )
    );
}

export default Media;
