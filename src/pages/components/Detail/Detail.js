import { faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle, faEllipsisH, faHeart, faPause, faPlay, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import { Grid, GridItem } from "~/components/Grid";
import Section from "~/layouts/components/Section";
import Song from "~/layouts/components/Song";
import Thumb from "~/layouts/components/Thumb";
import styles from "./Detail.module.scss";

const cx = classNames.bind(styles);

function Detail({ data, playlist, album }) {
    const [isStartPlaylist, setStartPlaylist] = useState(true);
    const isPlay = false;
    const isPaused = false;
    // const []
    console.log(data);
    const getTime = (time) => {
        // const time = data?.song?.totalDuration;
        console.log(time);
        const timeMinute = time / 60;
        let hour;
        let minute;
        if (time / 60 > 60) {
            hour = Math.floor(timeMinute / 60);
            minute = Math.floor(timeMinute % 60);
            return hour + " giờ " + minute + " phút";
        } else {
            minute = Math.floor(timeMinute);
            return minute + "phút";
        }
    };
    useEffect(() => {
        document.title = data?.title;
    }, []);
    return (
        <div className={cx("detail")}>
            <main className={cx("media")}>
                <div className={cx("media-left")}>
                    <div className={cx("media-left__thumb", { isPlay, isPaused })}>
                        <Thumb isPlay={isPlay} title={data?.title} thumbNail={data?.thumbnailM} />
                    </div>
                    <div className={cx("media-left__content")}>
                        <div className={cx("content-top")}>
                            <h4 className={cx("title")}>Nhac cho thu bay</h4>
                            <p className={cx("release")}>Cập nhật: 22/10/2022</p>
                            <div className={cx("artists")}>
                                <span>{data?.artistsNames}</span>
                            </div>
                            <span className={cx("like")}>{data?.like} nguoi yeu thich</span>
                        </div>
                        <div className={cx("actions")}>
                            <Button primary className={cx("actions-btn")} leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                                phát ngẫu nhiên
                            </Button>
                            {/* <Button primary className={cx("actions-btn")} leftIcon={<FontAwesomeIcon icon={faPause} />}>
                                tạm dừng
                            </Button>
                            <Button primary className={cx("actions-btn")} leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                                tiếp tục phát
                            </Button> */}
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
                <div className={cx("media-right")}>
                    {data &&
                        data?.song?.items.map((item, index) => (
                            <Song key={index} hasBorderBot center song smallSizeImg small time right data={item} />
                        ))}
                    <div className={cx("media-right__info")}>
                        <span>{`${data?.song?.total} bài hát`}</span>
                        <span>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                        <span>{getTime(data?.song?.totalDuration)}</span>
                    </div>
                </div>
            </main>
            <Section title="Nghệ sĩ tham gia">
                <Grid>
                    {data?.artists.map((artist) => (
                        <GridItem l="2-4" c="6" m="3" key={artist.id}>
                            <div className={cx("artist")}>
                                <Link to={artist?.link} className={cx("artist-link")}>
                                    <figure className={cx("artist-img")}>
                                        <img src={artist?.thumbnailM} alt={artist?.alias} />
                                    </figure>
                                </Link>
                                <div className={cx("artist-name")}>
                                    <Link to={artist?.link} className={cx("artist-name__link")}>
                                        {artist.name}
                                    </Link>
                                </div>
                                <div className={cx("artist-follow")}>
                                    <span>{artist?.totalFollow} quan tâm</span>
                                </div>
                                <div className={cx("artist-action")}>
                                    <Button
                                        className={cx("artist-btn")}
                                        leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                    >
                                        Quan tâm
                                    </Button>
                                </div>
                            </div>
                        </GridItem>
                    ))}
                </Grid>
            </Section>
        </div>
    );
}

export default Detail;
