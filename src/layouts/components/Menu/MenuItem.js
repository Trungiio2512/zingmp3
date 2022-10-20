import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
function MenuItem({ icon, to, title }) {
    return (
        <li className={cx("menu-item")}>
            <NavLink end to={to} className={(nav) => cx("menu-item__link", { active: nav.isActive })}>
                <span className={cx("menu-item__icon")}>{icon}</span>
                <span className={cx("menu-item__title")}>{title}</span>
            </NavLink>
        </li>
    );
}

export default MenuItem;
