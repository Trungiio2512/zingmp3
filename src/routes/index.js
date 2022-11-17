import Home from "~/pages/Home";
import Chart from "~/pages/Chart";
import Top100 from "~/pages/Top100";
import Radio from "~/pages/Radio";
import NewMusic from "~/pages/NewMusic";
import Category from "~/pages/Category";
import DetailArtist from "~/pages/DetailArtist/DetailArtist";
import Detail from "~/pages/Detail";
import Mv from "~/pages/Mv";

const publicRoute = [
    { path: "/", component: Home },
    { path: "/radio", component: Radio },
    { path: "/chart", component: Chart },
    { path: "/top100", component: Top100 },
    { path: "/new-music", component: NewMusic },
    { path: "/category", component: Category },
    { path: "/album/:nameAlbum/:id", component: Detail },
    { path: "/playlist/:namePlaylist/:id", component: Detail },
    { path: "/nghe-si/:nameArtist", component: DetailArtist },
    { path: "/:nameArtist", component: DetailArtist },
    { path: "/:video-clip/:nameVideo/:id", component: Mv, layout: null },
];

export { publicRoute };
