function useOpenModal(container, onHandleClosing, onHandleRequestClose) {
    const requestClose = () => {
        onHandleClosing(true);
        container.addEventListener(
            "animationend",
            () => {
                onHandleClosing(false);
                onHandleRequestClose();
            },
            { once: true },
        );
    };
    return requestClose;
}
export default useOpenModal;
