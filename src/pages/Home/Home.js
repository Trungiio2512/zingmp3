import { useEffect, useState } from "react";
import Section from "~/layouts/components/Section";
import httpRequest from "~/untils/httpRequest";
import styles from "./Home.module.scss";
import PlaylistItem from "~/layouts/components/Playlist";
import SliderShow from "~/pages/Home/components/Slider";
import { Grid, GridItem } from "~/components/Grid";
import Song from "~/layouts/components/Song";
import { Tab1 } from "~/layouts/components/Tab";
import { Playlist } from "~/layouts/components/Playlist";
import Loading from "~/layouts/components/Loading";

const section = {
    banner: "banner",
    recentPlaylist: "recentPlaylist",
    newRelease: "new-release",
    playlist: "playlist",
};
function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
    useEffect(() => {
        document.title = "Zing mp3 | Nghe nhạc chất lượng";
        const fetchApi = async () => {
            try {
                setLoading(true);
                const res = await httpRequest.get("home", {
                    params: {
                        page: 1,
                    },
                });
                setData(res.data?.items);
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
        return <div>loi</div>;
    } else {
        return (
            <div>
                {data &&
                    data.map((item, index) => {
                        switch (item?.sectionType) {
                            case section.banner:
                                return (
                                    <Section key={index}>
                                        <SliderShow data={item?.items} />
                                    </Section>
                                );
                            case section.playlist:
                                return (
                                    <Section title={item?.title} key={index}>
                                        <Playlist data={item?.items} m="4" />
                                    </Section>
                                );
                            case section.newRelease:
                                return (
                                    <Section link={item?.link} title={item?.title} key={index}>
                                        <Tab1 data={item?.items} />
                                    </Section>
                                );
                            case section.recentPlaylist:
                                return (
                                    <Section title={item?.title} key={index}>
                                        {/* <Tab1 data={item?.items} /> */}
                                    </Section>
                                );
                            default:
                                <div></div>;
                        }
                    })}
            </div>
        );
    }
}

export default Home;
