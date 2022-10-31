import classNames from "classnames/bind";
import Button from "~/components/Button";
import { Grid, GridItem } from "~/components/Grid";
import styles from "./Tab.module.scss";
import Song from "~/layouts/components/Song";
import { useState } from "react";
const cx = classNames.bind(styles);

function Tab1({ data }) {
    const [active, setActive] = useState(1);
    const [songs, setSongs] = useState(data.vPop);
    const [albums, setAlbum] = useState(data.album);
    console.log(data);
    // console.log(songs);
    const handleChangeTab = (index) => {
        setActive(index);
    };
    return (
        <div className={cx("tab1")}>
            <div className={cx("tab1-control")}>
                <Button
                    className={cx("tab1-control__btn", active === 1 ? "tab1-control__btn--active" : "")}
                    onClick={() => handleChangeTab(1)}
                >
                    Bài hát
                </Button>

                <Button
                    className={cx("tab1-control__btn", active === 2 ? "tab1-control__btn--active" : "")}
                    onClick={() => handleChangeTab(2)}
                >
                    Album
                </Button>
            </div>
            <div className={cx("tab1-body")}>
                <div className={cx("tab1-container", active === 1 ? "tab1-container--active" : "")}>
                    <Grid>
                        {songs.map(
                            (song, index) =>
                                index < 20 && (
                                    <GridItem c="12" m="6" l="4" key={index}>
                                        <Song small song right data={song} />
                                    </GridItem>
                                ),
                        )}
                    </Grid>
                </div>
                {/* <div className={cx("tab1-container", active === 2 ? "tab1-container--active" : "")}>
                    <Grid>
                        {albums.map((album, index) => (
                            <GridItem c="12" m="6" l="4" key={index}>
                                <Song small album right data={album} />
                            </GridItem>
                        ))}
                    </Grid>
                </div> */}
            </div>
        </div>
    );
}

export default Tab1;
