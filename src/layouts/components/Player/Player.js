import {
    faFilm,
    faListOl,
    faMicrophoneAlt,
    faPause,
    faPlay,
    faRandom,
    faStepBackward,
    faStepForward,
    faUndo,
    faVolumeDown,
    faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import styles from "./Player.module.scss";

const cx = classNames.bind(styles);

function Player({ data }) {
    const [animationText, setAnimationText] = useState(false);
    const [showListMusicLove, setShowListMusicLove] = useState(false);
    const handleShowListMusicLove = () => {
        setShowListMusicLove(!showListMusicLove);
    };
    // const
    return (
        <div className={cx("wrapper")}>
            <div className={cx("song-info")}>
                <img
                    src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp…over/5/5/8/c/558cf522789d57cdf87b5933235e2880.jpg"
                    alt="mota"
                    className={cx("song-info__img")}
                />
                <div className={cx("song-info__body")}>
                    <div className={cx("title-wrapper", { animationText })}>
                        <Link to className={cx("title-link")}>
                            <span>ten ne</span>
                        </Link>
                        <Link to className={cx("title-link", "title-link--second")}>
                            <span>ten ne</span>
                        </Link>
                    </div>
                    <h3 className={cx("artists")}>
                        <Link className={cx("artists-name")}>tenen</Link>
                    </h3>
                </div>
            </div>
            <div className={cx("song-control")}>
                <div className={cx("song-control__top")}>
                    <Button circle hover>
                        <FontAwesomeIcon icon={faRandom} />
                    </Button>
                    <Button circle hover>
                        <FontAwesomeIcon icon={faStepBackward} />
                    </Button>
                    <Button circle outline>
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                    {/* <Button circle outline>
                        <FontAwesomeIcon icon={faPause} />
                    </Button> */}
                    <Button circle hover>
                        <FontAwesomeIcon icon={faStepForward} />
                    </Button>
                    <Button circle hover>
                        <FontAwesomeIcon icon={faUndo} />
                    </Button>
                </div>
                <div className={cx("song-control__bottom")}>
                    <span>00:00</span>
                    <div className={cx("control-range")}>
                        <input min="0" max="100" type="range" />
                    </div>
                    <audio></audio>
                    <span>00:00</span>
                </div>
            </div>
            <div className={cx("song-actions")}>
                <Button circle hover>
                    <FontAwesomeIcon icon={faFilm} />
                </Button>
                <Button circle hover>
                    <FontAwesomeIcon icon={faMicrophoneAlt} />
                </Button>
                <Button circle hover>
                    <FontAwesomeIcon icon={faWindowRestore} />
                </Button>
                <div className={cx("song-actions__volume")}>
                    <Button circle hover className={cx("song-actions__volume-btn")}>
                        <FontAwesomeIcon icon={faVolumeDown} />
                    </Button>
                    <div className={cx("control-range", "control-range--volume")}>
                        <input min="0" max="100" type="range" />
                    </div>
                </div>
                <Button
                    circle
                    // hover
                    onClick={handleShowListMusicLove}
                    className={cx(showListMusicLove ? "song-actions--active" : "")}
                >
                    <FontAwesomeIcon icon={faListOl} />
                </Button>
                <Modal isOpen={showListMusicLove} onRequestClose={handleShowListMusicLove}>
                    <Button>close</Button>
                </Modal>
            </div>
        </div>
    );
}

export default Player;
