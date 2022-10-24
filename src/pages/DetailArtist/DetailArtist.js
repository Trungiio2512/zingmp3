import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Modal from "~/components/Modal";
import Loading from "~/layouts/components/Loading";
import classNames from "classnames/bind";

import { Playlist } from "~/layouts/components/Playlist";
import styles from "./DetailArtist.module.scss";
import httpRequest from "~/untils/httpRequest";
import Section from "~/layouts/components/Section";
import SliderPlaylist from "~/layouts/components/SliderPlaylist";
import Button from "~/components/Button";
import Song from "~/layouts/components/Song";
import Wrapper from "~/components/Wrapper";

const cx = classNames.bind(styles);

function DetailArtist() {
    const { nameArtist } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [showDetalDecription, setShowDetialDescription] = useState(false);
    const biographyRef = useRef();

    const handleShowDetialDescription = () => {
        setShowDetialDescription(!showDetalDecription);
    };

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get("artist", {
                    params: { name: nameArtist },
                });
                setData(res?.data);
                setLoading(false);
            } catch (error) {
                setFailed(true);
            }
        };
        fetchApi();
    }, []);
    console.log(data);
    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>bi loi</div>;
    } else {
        return (
            <div className={cx("wrapper")}>
                <div className={cx("artist")}>
                    <div className={cx("artist-info")}>
                        <h2 className={cx("artist-name")}>{data?.name}</h2>
                        {data?.sortBiography && (
                            <div className={cx("artist-biography")}>
                                {data?.sortBiography}
                                <Button className={cx("info-btn")} onClick={handleShowDetialDescription}>
                                    ... xem thêm
                                </Button>
                            </div>
                        )}
                        <div className={cx("artist-actions")}>
                            <Button primary className={cx("actions-btn")} leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                                Phát nhạc
                            </Button>
                            <Button primary className={cx("actions-btn")}>
                                quan tâm
                            </Button>
                        </div>
                        <div className={cx("artist-topAlbum")}>
                            <h4 className={cx("artist-topAlbum__heading")}>Mới nhất</h4>
                            <span className={cx("artist-topAlbum__newDate")}>10/22/2022</span>
                            <Song center song medium data={data?.topAlbum} />
                        </div>
                    </div>
                    <div className={cx("artist-thumb")}>
                        <figure className={cx("artist-img")}>
                            <img src={data?.thumbnailM} alt={data?.name} />
                        </figure>
                    </div>
                </div>
                {data &&
                    data?.sections.map((section, index) => {
                        if (section?.sectionType === "playlist") {
                            // console.log(section?.items);
                            return (
                                <Section key={index} title={section?.title}>
                                    <Playlist data={section?.items} />
                                </Section>
                            );
                        }
                        if (section?.sectionType === "song") {
                            return (
                                <Section key={index} title={section?.title}>
                                    <div className={cx("list-song")}>
                                        {section?.items.map((item, index) => (
                                            <Song key={index} song center right time small smallSizeImg data={item} />
                                        ))}
                                    </div>
                                </Section>
                            );
                        }
                    })}
                {/* <button onClick={handleShowDetialDescription}>mo ne</button> */}
                <Modal center isOpen={showDetalDecription} onRequestClose={handleShowDetialDescription}>
                    <main className={cx("card")}>
                        <div className={cx("card-info")}>
                            <div className={cx("card-thumb")}>
                                <figure className={cx("card-img")}>
                                    <img src={data?.thumbnailM} alt={data?.name} />
                                </figure>
                            </div>
                            <div className={cx("card-name")}>
                                <h2>{data?.name}</h2>
                            </div>
                        </div>
                        {data?.biography && <div className={cx("card-biogaphy")} ref={biographyRef}></div>}
                    </main>
                </Modal>
            </div>
        );
    }
}

export default DetailArtist;
