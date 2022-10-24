import Home from "~/pages/Home";
import Chart from "~/pages/Chart";
import Top100 from "~/pages/Top100";
import Radio from "~/pages/Radio";
import NewMusic from "~/pages/NewMusic";
import Category from "~/pages/Category";
import DetailPlaylist from "~/pages/DetailPlaylist";
import DetailAlbum from "~/pages/DetailAlbum";
import DetailArtist from "~/pages/DetailArtist/DetailArtist";

const publicRoute = [
    { path: "/", component: Home },
    { path: "/radio", component: Radio },
    { path: "/chart", component: Chart },
    { path: "/top100", component: Top100 },
    { path: "/new-music", component: NewMusic },
    { path: "/category", component: Category },
    { path: "/album/:nameAlbum/:id", component: DetailAlbum },
    { path: "/playlist/:namePlaylist/:id", component: DetailPlaylist },
    { path: "/nghe-si/:nameArtist", component: DetailArtist },
    { path: "/:nameArtist", component: DetailArtist },
];

export { publicRoute };
