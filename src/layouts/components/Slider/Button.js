import styles from "./Slider.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Button({ className, onClick, prev, next, content }) {
    const classes = cx("slider-btn", {
        [className]: className,
        prev,
        next,
    });
    return (
        <button className={classes} onClick={onClick}>
            {content}
        </button>
    );
}

export default Button;
