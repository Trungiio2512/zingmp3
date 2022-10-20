import { Grid, GridItem } from "~/components/Grid";
import PlaylistItem from "./PlaylistItem";
function Playlist({ data }) {
    // console.log(data);
    return (
        <Grid>
            {data.map((item, index) => (
                <GridItem c="12" m="6" l="2-4" key={index}>
                    <PlaylistItem data={item} title subtitle />
                </GridItem>
            ))}
        </Grid>
    );
}

export default Playlist;
