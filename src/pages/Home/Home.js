import { useEffect, useState } from "react";
import Section from "~/layouts/components/Section";
import httpRequest from "~/untils/httpRequest";
import Card from "~/layouts/components/Card";
import SliderShow from "~/pages/components/Slider";
import { Grid, GridItem } from "~/components/Grid";
import { Tab1 } from "~/layouts/components/Tab";

import Loading from "~/layouts/components/Loading";
import { getHome, setDataHome } from "~/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";

const section = {
    banner: "banner",
    recentPlaylist: "recentPlaylist",
    newRelease: "new-release",
    playlist: "playlist",
};
function Home() {
    // const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const data = useSelector((state) => state.app.home);
    const dispatch = useDispatch();

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
                // setData(res.data?.items);
                dispatch(setDataHome(res.data?.items));
                console.log(res.data);
                setLoading(false);
            } catch (error) {}
        };
        fetchApi();
    }, [dispatch]);

    console.log(data);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            // <div>
            //     {data &&
            //         data.map((item, index) => {
            //             // console.log(item);
            //             switch (item?.sectionType) {
            //                 case section.banner:
            //                     return (
            //                         <Section key={index}>
            //                             <SliderShow data={item?.items} />
            //                         </Section>
            //                     );
            //                 case section.playlist:
            //                     return (
            //                         <Section title={item?.title} key={index}>
            //                             <Grid>
            //                                 {item?.items.map((item, index) => (
            //                                     <GridItem l={"2-4"} key={index}>
            //                                         <Card playlist data={item} title subtitle />
            //                                     </GridItem>
            //                                 ))}
            //                             </Grid>
            //                         </Section>
            //                     );
            //                 case section.newRelease:
            //                     return (
            //                         <Section link={item?.link} title={item?.title} key={index}>
            //                             <Tab1 data={item?.items} id={item?.sectionType} />
            //                         </Section>
            //                     );
            //                 // case section.recentPlaylist:
            //                 //     return (
            //                 //         <Section title={item?.title} key={index}>
            //                 //             {/* <Tab1 data={item?.items} /> */}
            //                 //         </Section>
            //                 //     );
            //                 default:
            //                     <div></div>;
            //             }
            //         })}
            // </div>
            <>
                <Section>
                    <SliderShow data={data.banners} />
                </Section>
                <Section link={data.newRelease?.link} title={data.newRelease?.title}>
                    <Tab1 data={data.newRelease?.items} id={data.newRelease?.sectionType} />
                </Section>
                <Section title={data.playlist?.title}>
                    <Grid>
                        {data?.playlist?.items?.map((item, index) => (
                            <GridItem l={"2-4"} key={index}>
                                <Card playlist data={item} title subtitle />
                            </GridItem>
                        ))}
                    </Grid>
                </Section>
            </>
        );
    }
}

export default Home;
