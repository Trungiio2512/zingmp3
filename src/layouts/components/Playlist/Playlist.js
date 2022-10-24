import { Grid, GridItem } from "~/components/Grid";
import PlaylistItem from "./PlaylistItem";
function Playlist({ data, c = "12", m = "6", l = "2-4" }) {
    // console.log(data);
    return (
        <Grid>
            {data &&
                data.map((item, index) => (
                    <GridItem c={c} m={m} l={l} key={index}>
                        <PlaylistItem data={item} title subtitle />
                    </GridItem>
                ))}
        </Grid>
    );
}

export default Playlist;
