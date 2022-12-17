import classNames from "classnames/bind";
import { forwardRef } from "react";
import styles from "./Input.module.scss";
const cx = classNames.bind(styles);
const Input = forwardRef(({ value, min, max, volume, onHandleChange, className }, ref) => {
    const classes = cx("control-range", volume ? "control-range--volume" : "", { [className]: className });
    return (
        <div className={classes}>
            <input ref={ref} type="range" min={min} max={max} value={value} onChange={onHandleChange} />
        </div>
    );
});

export default Input;
