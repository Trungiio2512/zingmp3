import { faEllipsisH, faMinus, faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import styles from "./Song.module.scss";
import { images } from "~/assets";
const cx = classNames.bind(styles);
function Song({
    small = false,
    medium = false,
    center = false,
    time = false,
    className,
    rank = false,
    song = false,
    right = false,
    album,
    data,
}) {
    // console.log(data);

    const classes = cx("media", {
        [className]: className,
        medium,
        small,
        song,
        album,
        center,
        right,
        time,
    });

    return (
        <div className={classes}>
            <div className={cx("media-left")}>
                {rank && (
                    <div className={cx("rank")}>
                        <span className={cx("rank-number")}>1</span>
                        <span className={cx("rank-sort")}>
                            <FontAwesomeIcon className={cx("icon")} icon={faMinus} />
                        </span>
                    </div>
                )}
                <div className={cx("thumb")}>
                    {song && (
                        <>
                            <figure className={cx("thumb-song", "thumb-img")}>
                                <img src={data?.thumbnailM} alt="" />
                            </figure>
                            <Button className={cx("thumb-control")}>
                                <FontAwesomeIcon icon={faPlay} />
                                {/* <Button circle hover>
                                            {images.iconPlayingWhiteUrl()}
                                        </Button> */}
                            </Button>
                        </>
                    )}
                    {album && (
                        <>
                            <figure className={cx("thumb-album", "thumb-img")}>
                                <img src={images.albumDick} alt="" />
                            </figure>
                            <div className={cx("thumb-actions")}>
                                <figure className={cx("thumb-img--full", "thumb-img")}>
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
                    <h4 className={cx("info-name")}>{data?.title}</h4>
                    <p className={cx("info-artists")}>
                        {data?.artists.map((artist, index) => (
                            <Link to={artist.link} className={cx("info-artists__name")} key={index}>
                                {artist?.name}
                                <FontAwesomeIcon icon={faStar} className={cx("info-artists__icon")} />
                            </Link>
                        ))}
                    </p>
                </div>
            </div>
            {center && (
                <div className={cx("media-center")}>
                    <Link to className={cx("song-name")}>
                        {data?.title}
                        {"(Single)"}
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
                    {time && <span className={cx("media-right__time")}>02:35</span>}
                </div>
            )}
        </div>
    );
}

export default Song;
