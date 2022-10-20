import styles from "./Menu.module.scss";

function Menu({ children }) {
    return <ul className={styles.menu}>{children}</ul>;
}

export default Menu;
