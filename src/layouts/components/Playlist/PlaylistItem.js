import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Playlist.module.scss";
import Thumb from "~/layouts/components/Thumb";

const cx = classNames.bind(styles);

function PlaylistItem({ data, title = false, subtitle = false, artists = false }) {
    // console.log(data);
    return (
        <div className={cx("card")}>
            <Link to={data?.link} className={cx("card-link")}>
                <Thumb title={data?.title} thumbNail={data?.thumbnailM} />
            </Link>
            <div className={cx("card-body")}>
                {title && (
                    <Link to={data?.link} className={cx("card-title")}>
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
        </div>
    );
}

export default PlaylistItem;
