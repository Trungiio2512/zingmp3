import {
    faChartSimple,
    faChevronLeft,
    faChevronRight,
    faClipboardList,
    faClosedCaptioning,
    faCompactDisc,
    faIcons,
    faIdCardAlt,
    faMusic,
    faPlus,
    faRadio,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";

import { images } from "~/assets";
import Button from "~/components/Button";
import { Menu, MenuItem } from "../Menu";
import Box from "./Box";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar({ mobile = false }) {
    const [showFull, setShowFull] = useState(false);
    return (
        <div className={cx("wrapper", { mobile, showFull })}>
            <div className={cx("sidebar-logo")}>
                <Link to={"/"} className={cx("sidebar-logo__link")}>
                    <img src={images.logo} alt="logo" className={cx("sidebar-logo__img")} />
                    <img src={images.logoMobile} alt="logo" className={cx("sidebar-logo--mobile")} />
                </Link>
            </div>
            <div className={cx("sidebar-menu")}>
                <Menu>
                    <MenuItem
                        showFull={showFull}
                        icon={<FontAwesomeIcon icon={faIdCardAlt} />}
                        title="Cá Nhân"
                        to={"/my"}
                    />
                    <MenuItem
                        showFull={showFull}
                        icon={<FontAwesomeIcon icon={faCompactDisc} />}
                        title="Khám Phá"
                        to={"/"}
                    />
                    <MenuItem
                        showFull={showFull}
                        icon={<FontAwesomeIcon icon={faChartSimple} />}
                        title="Bảng Xếp Hạng"
                        to={"/chart"}
                    />
                    <MenuItem
                        showFull={showFull}
                        icon={<FontAwesomeIcon icon={faRadio} />}
                        title="Radio"
                        to={"/radio"}
                    />
                    <MenuItem
                        showFull={showFull}
                        icon={<FontAwesomeIcon icon={faClipboardList} />}
                        title="Theo dõi"
                        to={"/follow"}
                    />
                </Menu>
            </div>
            <div className={cx("sidebar-divided")}></div>
            <div className={cx("sidebar-submenu")}>
                <div className={cx("sidebar-submenu__scroll")}>
                    <Menu>
                        <MenuItem
                            showFull={showFull}
                            icon={<FontAwesomeIcon icon={faMusic} />}
                            title="Nhạc Mới"
                            to={"/new-music"}
                        />
                        <MenuItem
                            showFull={showFull}
                            icon={<FontAwesomeIcon icon={faIcons} />}
                            title="Thể Loại"
                            to={"/category"}
                        />
                        <MenuItem
                            showFull={showFull}
                            icon={<FontAwesomeIcon icon={faStar} />}
                            title="Top 100"
                            to={"/top100"}
                        />
                        <MenuItem
                            showFull={showFull}
                            icon={<FontAwesomeIcon icon={faClosedCaptioning} />}
                            title="MV"
                            to={"/mv"}
                        />
                    </Menu>
                    <Box className={cx("box", { showFull })} login />
                    <Box className={cx("box", { showFull })} vip />
                </div>
            </div>
            <Button className={cx("sidebar-btn--add-playlist")} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Thêm playlist mới
            </Button>
            <Button circle className={cx("sidebar-btn--showfull")} onClick={() => setShowFull(!showFull)}>
                {showFull ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
            </Button>
        </div>
    );
}

export default Sidebar;
