function GridItem({ children, c = 12, m = 6, l = 4 }) {
    return <div className={`col l-${l} m-${m} c-${c}`}>{children}</div>;
}

export default GridItem;
