import classNames from "classnames/bind";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Media, MediaArtist } from "~/layouts/components/Media";
const cx = classNames.bind(styles);

function SearchResult({ data, value, onPlaySong }) {
    console.log(data, value);
    return (
        <>
            <div className={cx("search-key")}>
                <h5 className={cx("search-heading")}>Từ khoá</h5>
                <Link to className={cx("search-item")}>
                    <span className={cx("search-item__icon")}>
                        <FontAwesomeIcon icon={faChartLine} />
                    </span>
                    <span className={cx("search-item__title")}>{value}</span>
                </Link>
            </div>
            <div className={cx("search-top")}>
                <h5 className={cx("search-heading")}>Gợi ý gần nhất</h5>
                {data?.top?.objectType === "song" && (
                    <Media onClick={() => onPlaySong(data?.top)} song small data={data.top} />
                )}

                {data?.top?.objectType === "artist" && (
                    <MediaArtist
                        title={data?.top?.name}
                        dataArtist={data?.top}
                        avata
                        follower
                        to={data?.top?.link}
                        // className={cx("search-item")}
                    />
                )}
            </div>
            <div className={cx("search-more")}>
                <h5 className={cx("search-heading")}>Kết quả khác</h5>
                {data?.songs.map((song, index) => (
                    <Media onClick={() => onPlaySong(song)} song small data={song} key={index} />
                ))}
            </div>
            <div className={cx("search-artists")}>
                <h5 className={cx("search-heading")}>Nghệ sĩ</h5>
                {data?.artists.map((artist) => (
                    <MediaArtist
                        key={artist?.id}
                        title={artist?.name}
                        dataArtist={artist}
                        avata
                        follower
                        to={artist?.link}
                        className={cx("search-item")}
                    />
                ))}
            </div>
        </>
    );
}

export default SearchResult;
