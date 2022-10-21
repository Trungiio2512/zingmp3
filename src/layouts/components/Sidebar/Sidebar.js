import {
    faChartLine,
    faChartSimple,
    faCompactDisc,
    faIcons,
    faMusic,
    faRadio,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { images } from "~/assets";
import { Menu, MenuItem } from "../Menu";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar({ mobile = false }) {
    return (
        <div className={cx("wrapper", { mobile })}>
            <div className={cx("sidebar-logo")}>
                <Link to={"/"} className={cx("sidebar-logo__link")}>
                    <img src={images.logo} alt="logo" className={cx("sidebar-logo__img")} />
                    <img src={images.logoMobile} alt="logo" className={cx("sidebar-logo--mobile")} />
                </Link>
            </div>
            <div className={cx("sidebar-menu")}>
                <Menu>
                    <MenuItem icon={<FontAwesomeIcon icon={faCompactDisc} />} title="Khám Phá" to={"/"} />
                    <MenuItem icon={<FontAwesomeIcon icon={faChartSimple} />} title="Bảng Xếp Hạng" to={"/chart"} />
                    {/* <MenuItem icon={<FontAwesomeIcon icon={faRadio} />} title="Radio" to={"/radio"} /> */}
                    <MenuItem icon={<FontAwesomeIcon icon={faMusic} />} title="Nhạc Mới" to={"/new-music"} />
                    {/* <MenuItem icon={<FontAwesomeIcon icon={faIcons} />} title="Thể Loại" to={"/category"} /> */}
                    <MenuItem icon={<FontAwesomeIcon icon={faStar} />} title="Top 100" to={"/top100"} />
                </Menu>
            </div>
        </div>
    );
}

export default Sidebar;
