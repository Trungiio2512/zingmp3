import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./ShowRankSong.module.scss";
import { Grid, GridItem } from "~/components/Grid";
import Song from "~/layouts/components/Song";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function ShowRankSong({ data, rankNumber }) {
    // console.log(data);
    const [showAll, setShowAll] = useState(true);
    const [countSong, setCountSong] = useState(rankNumber);

    const handleShowAll = (count) => {
        setShowAll(!showAll);
        setCountSong(count);
    };
    return (
        <div className={cx("rankSong")}>
            <div className={cx("rankSong-chart")}>Biểu đồ ở đây</div>
            <div className={cx("rankSong-topsong")}>
                <Grid>
                    {data?.items.map(
                        (item, index) =>
                            index < countSong && (
                                <GridItem c="12" m="12" l="12" key={index}>
                                    <Song
                                        data={item}
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
                            Xem top {data?.items.length}
                        </Button>
                    ) : (
                        <Button square onClick={() => handleShowAll(rankNumber)}>
                            Xem top {rankNumber}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowRankSong;
