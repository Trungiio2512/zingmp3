import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./ButtonSlider.module.scss";
const cx = classNames.bind(styles);
function ButtonSlider({ prev, next, onClick, middle, standardMiddle }) {
    return (
        <Button className={cx("btn-slider-playlist", { next, prev, middle, standardMiddle })} onClick={onClick}>
            {prev && <FontAwesomeIcon icon={faChevronLeft} />}
            {next && <FontAwesomeIcon icon={faChevronRight} />}
        </Button>
    );
}

export default ButtonSlider;
