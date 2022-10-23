import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "~/layouts/components/Loading";
import httpRequest from "~/untils/httpRequest";
import Detail from "~/pages/components/Detail";

function DetailAlbum() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(null);
    const [isFailed, setFailed] = useState(null);
    const [data, setData] = useState(null);
    console.log(id.split(".")[0]);

    useEffect(() => {
        const idPlaylist = id.split(".")[0];
        setLoading(true);
        const fetchApi = async () => {
            try {
                const res = await httpRequest.get("detailplaylist", {
                    params: { id: idPlaylist },
                });
                // console.log(res);
                setLoading(false);
                setData(res?.data);
            } catch (error) {
                setFailed(true);
            }
        };
        fetchApi();
    }, [id]);
    if (isLoading) {
        return <Loading />;
    } else if (isFailed) {
        return <div>bi loi</div>;
    } else {
        return <div>{data && <Detail data={data} />}</div>;
    }
}

export default DetailAlbum;
