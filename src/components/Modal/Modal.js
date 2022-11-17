import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";

import Portal from "~/components/Portal";
import styles from "./Modal.module.scss";
import useOpenModal from "~/hooks/useOpenModal";

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Modal({ isOpen = false, onRequestClose = defaultFn, modalMv, modalLyric }) {
    const [closesing, setClosing] = useState(false);
    const containerRef = useRef();

    const handleRequestClose = useOpenModal(containerRef.current, setClosing, onRequestClose);

    if (!isOpen) return null;

    return (
        <Portal>
            <div className={cx("wrapper", { closesing })}>
                <div className={cx("container")} ref={containerRef}></div>
            </div>
        </Portal>
    );
}

export default Modal;
