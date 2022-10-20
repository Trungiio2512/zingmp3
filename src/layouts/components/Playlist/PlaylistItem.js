import styles from "./Playlist.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);
function PlaylistItem({ data, title = false, subtitle = false, artists = false }) {
    // console.log(data);
    return (
        <div className={cx("card")}>
            <Link to={data?.link} className={cx("card-link")}>
                <figure className={cx("card-img")}>
                    <img alt={data?.title} src={data?.thumbnailM} />
                    <div className={cx("card-control")}>
                        <Button circle outline>
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    </div>
                    {artists && (
                        <div className={cx("card-artists")}>
                            <span className={cx("card-artists__name")}>mrs siro</span>
                        </div>
                    )}
                </figure>
            </Link>
            <div className={cx("card-body")}>
                {title && (
                    <Link to={data?.link} className={cx("card-title")}>
                        {data?.title}
                    </Link>
                )}
                {subtitle && <span className={cx("card-subtitle")}>{data?.sortDescription}</span>}
            </div>
        </div>
    );
}

export default PlaylistItem;
