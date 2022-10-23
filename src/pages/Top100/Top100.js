import { useEffect, useState } from "react";
import Loading from "~/layouts/components/Loading";
import { Playlist } from "~/layouts/components/Playlist";
import Section from "~/layouts/components/Section";
import SliderPlaylist from "~/layouts/components/SliderPlaylist";
import httpRequest from "~/untils/httpRequest";

function Top100() {
    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [datas, setDatas] = useState(null);
    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("top100");
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
        return <div>Bị lỗi</div>;
    } else {
        return (
            <div>
                {/* {console.log(datas)} */}
                {datas &&
                    datas.map((data, index) => {
                        // if (data?.viewType === "slider") {
                        return (
                            <Section title={data?.title} key={index}>
                                <SliderPlaylist data={data?.items} />
                            </Section>
                        );
                        // } else if (data?.viewType === "list") {
                        //     return (
                        //         <Section title={data?.title} key={index}>
                        //             <Playlist data={data?.items} key={index} m="4" />;
                        //         </Section>
                        //     );
                        // }
                    })}
            </div>
        );
    }
}

export default Top100;
