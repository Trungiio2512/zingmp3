import { faBars, faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Search from "~/layouts/components/Search";
import Button from "~/components/Button";
import styles from "./Header.module.scss";
import Sidebar from "~/layouts/components/Sidebar";
const cx = classNames.bind(styles);

function Header() {
    const [showMenu, setShowMEnu] = useState(false);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header-menu")}>
                <FontAwesomeIcon icon={faBars} />
                <div className={cx("header-menu-sidebar")}>
                    <Sidebar mobile />
                </div>
            </div>
            <Search />
            <div className={cx("header-actions")}>
                <Tippy delay={[0, 200]} content="Chủ đề" placement="bottom">
                    <Button circle secondary className={cx("header-actions__btn")}>
                        <FontAwesomeIcon icon={faGem} />
                    </Button>
                </Tippy>
                <Tippy delay={[0, 200]} content="Nâng cấp vip" placement="bottom">
                    <Button circle secondary className={cx("header-actions__btn")}>
                        <FontAwesomeIcon icon={faGem} />
                    </Button>
                </Tippy>
                <Tippy delay={[0, 100]} content="Tải lên" placement="bottom">
                    <Button circle secondary className={cx("header-actions__btn")}>
                        <FontAwesomeIcon icon={faGem} />
                    </Button>
                </Tippy>
                <Tippy delay={[0, 200]} content="Cài đặt" placement="bottom">
                    <Button circle secondary className={cx("header-actions__btn")}>
                        <FontAwesomeIcon icon={faGem} />
                    </Button>
                </Tippy>
            </div>
        </div>
    );
}

export default Header;
