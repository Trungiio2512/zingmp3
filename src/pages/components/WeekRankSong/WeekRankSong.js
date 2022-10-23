import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "~/components/Button";
import { Grid, GridItem } from "~/components/Grid";
import Song from "~/layouts/components/Song";
import styles from "./WeekRankSong.module.scss";
function WeekRankSong({ data, rankNumber = 5 }) {
    console.log(data);
    const [vnSongs, setVnSongs] = useState({ ...data?.vn });
    const [usSongs, setUsSongs] = useState({ ...data?.us });
    const [koreaSongs, setKoreaSongs] = useState({ ...data?.korea });
    console.log(usSongs);
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Bảng xếp hạng tuần</h1>
            <Grid>
                <GridItem c="12" m="6" l="4">
                    <div className={styles.country}>
                        <h3 className={styles.country__name}>
                            <span>Việt Nam</span>
                            <Button circle circleSmall primary>
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                        </h3>
                        {vnSongs?.items.map(
                            (song, index) =>
                                index < rankNumber && (
                                    <Song
                                        key={song?.encodeId}
                                        rank
                                        rankNumber={index + 1}
                                        time
                                        song
                                        small
                                        right
                                        smallSizeImg
                                        data={song}
                                    />
                                ),
                        )}
                        <Button to={vnSongs?.link} square className={styles.showall}>
                            Xem tat ca
                        </Button>
                    </div>
                </GridItem>
                <GridItem c="12" m="6" l="4">
                    <div className={styles.country}>
                        <h3 className={styles.country__name}>
                            <span>us-uk</span>
                            <Button circle circleSmall primary>
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                        </h3>
                        {usSongs?.items.map(
                            (song, index) =>
                                index < rankNumber && (
                                    <Song
                                        key={song?.encodeId}
                                        rank
                                        rankNumber={index + 1}
                                        time
                                        song
                                        small
                                        right
                                        smallSizeImg
                                        data={song}
                                    />
                                ),
                        )}
                        <Button to={usSongs?.link} square className={styles.showall}>
                            Xem tat ca
                        </Button>
                    </div>
                </GridItem>
                <GridItem c="12" m="6" l="4">
                    <div className={styles.country}>
                        <h3 className={styles.country__name}>
                            <span>k-pop</span>
                            <Button circle circleSmall primary>
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                        </h3>
                        {koreaSongs?.items.map(
                            (song, index) =>
                                index < rankNumber && (
                                    <Song
                                        key={song?.encodeId}
                                        rank
                                        rankNumber={index + 1}
                                        time
                                        song
                                        small
                                        right
                                        smallSizeImg
                                        data={song}
                                    />
                                ),
                        )}
                        <Button to={koreaSongs?.link} square className={styles.showall}>
                            Xem tat ca
                        </Button>
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default WeekRankSong;
