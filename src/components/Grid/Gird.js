function Grid({ children }) {
    return (
        <div className="grid">
            <div className="row">{children}</div>
        </div>
    );
}

export default Grid;
