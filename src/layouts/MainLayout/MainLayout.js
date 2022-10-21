import Sidebar from "~/layouts/components/Sidebar";
import Header from "~/layouts/components/Header";
import styles from "./MainLayout.module.scss";
import Player from "~/layouts/components/Player";
function MainLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.content}>
                    <Header />
                    {children}
                </div>
            </div>
            {/* <Player /> */}
        </div>
    );
}

export default MainLayout;
