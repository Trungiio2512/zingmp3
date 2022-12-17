import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
function Box({ login, vip, title, className }) {
    const classes = cx("box", { login, vip, [className]: className });
    return (
        <div className={classes}>
            <h6 className={cx("title")}>Đăng nhập để khám phá playlist dành riêng cho bạn</h6>
            <Button className={cx("btn")}>
                {login && "Đăng nhập"}
                {vip && "Nâng cấp vip"}
            </Button>
        </div>
    );
}

export default Box;
