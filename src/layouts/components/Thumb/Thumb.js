import classNames from "classnames/bind";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import styles from "./Thumb.module.scss";

const cx = classNames.bind(styles);

function Thumb({ title, isVideo, thumbNail, onClick, onHandlePlay, to, id, isPlay = false, ...passProps }) {
    let Comp;
    const props = {
        ...passProps,
    };
    if (to) {
        Comp = Link;
        props.to = to;
        props.state = { id: id };
    } else {
        Comp = "div";
    }

    return (
        <div className={cx("thumb", { isVideo })}>
            <Comp {...props}>
                <figure className={styles.thumb_img}>
                    <img alt={title} src={thumbNail} />
                </figure>
            </Comp>
            <Button className={styles.control} circle outline onClick={to ? () => onHandlePlay(to, id) : onClick}>
                {isPlay ? (
                    isVideo ? (
                        "Đang phát"
                    ) : (
                        <FontAwesomeIcon icon={faPause} />
                    )
                ) : (
                    <FontAwesomeIcon icon={faPlay} />
                )}
            </Button>
        </div>
    );
}

export default Thumb;
