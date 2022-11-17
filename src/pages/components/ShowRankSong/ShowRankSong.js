import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./ShowRankSong.module.scss";
import { Grid, GridItem } from "~/components/Grid";
import { Media } from "~/layouts/components/Media";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ShowRankSong({ data, rankNumber = 10, chart, onHanldeSong, onHandlePlaySong }) {
    // console.log(data);
    const [showAll, setShowAll] = useState(true);
    const [countSong, setCountSong] = useState(rankNumber);

    const handleShowAll = (count) => {
        setShowAll(!showAll);
        setCountSong(count);
    };
    return (
        <div className={cx("rankSong")}>
            <div className={styles.heading}>
                <p className={styles.title}>{data?.title || "Bảng xếp hạng"}</p>
                <Button circle primary onClick={() => onHandlePlaySong(data?.items, data?.sectionId)}>
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
            </div>
            {chart && <div className={cx("rankSong-chart")}>Biểu đồ ở đây</div>}
            <div className={cx("rankSong-topsong")}>
                <Grid>
                    {data &&
                        data?.items.map(
                            (song, index) =>
                                index < countSong && (
                                    <GridItem c={12} m={12} l={12} key={index}>
                                        <Media
                                            onClick={() => onHanldeSong(song, data?.items, data?.sectionId)}
                                            data={song}
                                            rankNumber={index + 1}
                                            small
                                            time
                                            song
                                            hasBorderBot
                                            rank
                                            right
                                            center
                                            smallSizeImg
                                        />
                                    </GridItem>
                                ),
                        )}
                </Grid>
                <div className={cx("rankSong-topsong__show")}>
                    {showAll ? (
                        <Button square onClick={() => handleShowAll(data?.items.length)}>
                            Xem tất cả
                        </Button>
                    ) : (
                        <Button square onClick={() => handleShowAll(rankNumber)}>
                            Thu gọn
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowRankSong;
