import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./ShowRankSong.module.scss";
import { Grid, GridItem } from "~/components/Grid";
import Song from "~/layouts/components/Song";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function ShowRankSong({ data, rankNumber = 10, chart }) {
    console.log(data);
    const [showAll, setShowAll] = useState(true);
    const [countSong, setCountSong] = useState(rankNumber);

    const handleShowAll = (count) => {
        setShowAll(!showAll);
        setCountSong(count);
    };
    return (
        <div className={cx("rankSong")}>
            {chart && <div className={cx("rankSong-chart")}>Biểu đồ ở đây</div>}
            <div className={cx("rankSong-topsong")}>
                <Grid>
                    {data &&
                        data?.items.map(
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
