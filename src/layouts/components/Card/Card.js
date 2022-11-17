import classNames from "classnames/bind";
import { Link, useNavigate, useNavigation } from "react-router-dom";

import styles from "./Card.module.scss";
import Thumb from "~/layouts/components/Thumb";
import { MediaArtist } from "~/layouts/components/Media";
import { useState } from "react";
import { getTimeSong } from "~/funtion";

const cx = classNames.bind(styles);

function Card({
    data,
    hasAvata,
    playlist = false,
    mv = false,
    isMvPlay = false,
    mvRecommend = false,
    title = false,
    subtitle = false,
    artists = false,
}) {
    const navigate = useNavigate();
    const handlePlay = (to, id) => {
        navigate(to, { state: { id: id, play: true } });
    };
    return (
        <div className={cx("card", { mvRecommend })}>
            <div className={cx("card-thumb")}>
                <Thumb
                    onHandlePlay={handlePlay}
                    isPlay={isMvPlay}
                    isVideo={mv}
                    to={data?.link}
                    id={data?.encodeId}
                    title={data?.title}
                    thumbNail={data?.thumbnailM}
                />
            </div>
            {playlist && (
                <div className={cx("card-body")}>
                    {title && (
                        <Link to={data?.link} state={{ id: data?.encodeId }} className={cx("card-title")}>
                            {data?.title}
                        </Link>
                    )}
                    {subtitle && <span className={cx("card-subtitle")}>{data?.sortDescription}</span>}
                    {artists && (
                        <p className={cx("card-artists")}>
                            {data.artists.map((artist) => (
                                <Link to={artist?.link} className={cx("card-artist__name")} key={artist.name}>
                                    {artist?.name}
                                </Link>
                            ))}
                        </p>
                    )}
                </div>
            )}

            {mv && (
                <>
                    <div className={cx("card-body")}>
                        <MediaArtist
                            avata={hasAvata}
                            title={data?.title}
                            to={data?.link}
                            dataArtist={data?.artist}
                            dataArtists={data?.artists}
                        />
                        <div className={cx("card-duration")}>
                            <span>{getTimeSong(data.duration)}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
