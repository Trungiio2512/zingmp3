import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Portal from "~/components/Portal";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Modal({
    fromRight = false,
    fromLeft = false,
    center = false,
    isOpen = false,
    shouldCloseOverlayClick = true,
    children,
    onRequestClose = defaultFn,
}) {
    const [closesing, setClosing] = useState(false);
    const containerRef = useRef();

    const handleRequestClose = useCallback(() => {
        setClosing(true);
        containerRef.current.addEventListener(
            "animationend",
            () => {
                setClosing(false);
                onRequestClose();
            },
            { once: true },
        );
    }, [onRequestClose]);

    // useEffect(() => {
    //     const handleClickOnKeyboard = (e) => {
    //         if (isOpen && e.code === "Escape") {
    //             handleRequestClose();
    //         }
    //     };
    //     document.addEventListener("keydown", handleClickOnKeyboard);

    //     return () => {
    //         document.removeEventListener("keydown", handleClickOnKeyboard);
    //     };
    // }, [isOpen, handleRequestClose]);

    if (!isOpen) return null;

    return (
        <Portal>
            <div className={cx("wrapper", { closesing, fromRight, center })}>
                {center && (
                    <div className={cx("overlay")} onClick={shouldCloseOverlayClick ? handleRequestClose : defaultFn} />
                )}
                <div className={cx("container")} ref={containerRef}>
                    {children}
                    {center && (
                        <Tippy delay={[100, 300]} offset={[0, 0]} content={"Đóng"}>
                            <button onClick={handleRequestClose} className={cx("close-btn")}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </Tippy>
                    )}
                </div>
            </div>
        </Portal>
    );
}

export default Modal;
