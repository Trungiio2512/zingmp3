import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import Button from "~/components/Button";
import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import ShowRankSong from "~/pages/components/ShowRankSong";
import styles from "./NewMusic.module.scss";

function NewMusic() {
    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [datas, setDatas] = useState();
    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("newreleasechart");
                setDatas(res?.data);
                setLoading(false);
            } catch (error) {
                setFailed(true);
            }
        };
        fetchApi();
    }, []);
    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>Bi loi</div>;
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <img src={datas?.banner} alt={datas?.title} />
                </div>
                <div className={styles.heading}>
                    <p className={styles.title}>{datas?.title}</p>
                    <Button circle primary>
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </div>
                <div className={styles.songs}>
                    {/* {console.log(datas)} */}
                    {datas && <ShowRankSong data={datas} />}
                </div>
            </div>
        );
    }
}

export default NewMusic;
