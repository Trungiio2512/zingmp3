import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import styles from "./Thumb.module.scss";
function Thumb({ title, thumbNail, onClick, isPlay = false }) {
    return (
        <figure className={styles.thumb}>
            <img alt={title} src={thumbNail} />
            <div className={styles.control}>
                {isPlay ? (
                    <Button circle outline onClick={onClick}>
                        <FontAwesomeIcon icon={faPause} />
                    </Button>
                ) : (
                    <Button circle outline onClick={onClick}>
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                )}
            </div>
        </figure>
    );
}

export default Thumb;
