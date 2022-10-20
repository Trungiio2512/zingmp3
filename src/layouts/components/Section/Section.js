import classNames from "classnames/bind";
import styles from "./Section.module.scss";

import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Section({ children, link, title }) {
    return (
        <section className={cx("section-wrapper")}>
            <div className={cx("section-heading")}>
                {title && <h4 className={cx("section-title")}>{title}</h4>}
                {link && (
                    <Button
                        className={cx("section-btn")}
                        to={link}
                        rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
                    >
                        Tât cả
                    </Button>
                )}
            </div>
            <div className={cx("section-body")}>{children}</div>
        </section>
    );
}

export default Section;
