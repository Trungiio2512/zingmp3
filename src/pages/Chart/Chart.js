import { useEffect, useState } from "react";
import ShowRankSong from "~/pages/components/ShowRankSong";
import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import WeekRankSong from "../components/WeekRankSong";
function Chart() {
    const [data, setData] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
    useEffect(() => {
        const fecthApi = async () => {
            setLoading(true);
            try {
                const res = await httpRequest.get("charthome");
                setData(res.data);
                setLoading(false);
                // console.log(res.data);
            } catch (error) {
                console.log(error.response);
                setFailed(true);
            }
        };
        fecthApi();
    }, []);
    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>bi loi</div>;
    } else {
        return (
            <div>
                <ShowRankSong data={data?.RTChart} rankNumber={10} />
                <WeekRankSong data={data?.weekChart} rankNumber={5} />
            </div>
        );
    }
}

export default Chart;
