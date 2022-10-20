import classNames from "classnames/bind";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Song from "~/layouts/components/Song";
const cx = classNames.bind(styles);

function SearchResult({ data, value }) {
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
                <Song song small data={data.top} />
            </div>
            <div className={cx("search-more")}>
                <h5 className={cx("search-heading")}>Kết quả khác</h5>
                {data?.songs.map((song, index) => (
                    <Song song small data={song} key={index} />
                ))}
            </div>
        </>
    );
}

export default SearchResult;
