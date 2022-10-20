import styles from "./Loading.module.scss";
function Loading() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.rings}>
                <div style={{ "--i": "1" }} className={styles.ring}></div>
                <div style={{ "--i": "2" }} className={styles.ring}></div>
                <div style={{ "--i": "3" }} className={styles.ring}></div>
                <div style={{ "--i": "4" }} className={styles.ring}></div>
                <div style={{ "--i": "5" }} className={styles.ring}></div>
                <div style={{ "--i": "6" }} className={styles.ring}></div>
                <div style={{ "--i": "7" }} className={styles.ring}></div>
                <div style={{ "--i": "8" }} className={styles.ring}></div>
                <div style={{ "--i": "9" }} className={styles.ring}></div>
                <div style={{ "--i": "10" }} className={styles.ring}></div>
                <div style={{ "--i": "11" }} className={styles.ring}></div>
                <div style={{ "--i": "12" }} className={styles.ring}></div>
                <div style={{ "--i": "13" }} className={styles.ring}></div>
                <div style={{ "--i": "14" }} className={styles.ring}></div>
                <div style={{ "--i": "15" }} className={styles.ring}></div>
                <div style={{ "--i": "16" }} className={styles.ring}></div>
                <div style={{ "--i": "17" }} className={styles.ring}></div>
                <div style={{ "--i": "18" }} className={styles.ring}></div>
                <div style={{ "--i": "19" }} className={styles.ring}></div>
                <div style={{ "--i": "20" }} className={styles.ring}></div>
            </div>
        </div>
    );
}

export default Loading;
