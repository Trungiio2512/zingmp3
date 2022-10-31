import { Link } from "react-router-dom";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Artist.module.scss";

import { setFollower } from "~/funtion";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Artist({ data }) {
    return (
        <div className={cx("artist")}>
            <Link to={data?.link} className={cx("artist-link")}>
                <figure className={cx("artist-img")}>
                    <img src={data?.thumbnailM} alt={data?.alias} />
                </figure>
            </Link>
            <div className={cx("artist-name")}>
                <Link to={data?.link} className={cx("artist-name__link")}>
                    {data?.name}
                </Link>
            </div>
            <div className={cx("artist-follow")}>
                <span>{setFollower(data?.totalFollow)} quan tâm</span>
            </div>
            <div className={cx("artist-action")}>
                <Button className={cx("artist-btn")} leftIcon={<FontAwesomeIcon icon={faUserPlus} />}>
                    Quan tâm
                </Button>
            </div>
        </div>
    );
}
export default Artist;
