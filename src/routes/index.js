import Home from "~/pages/Home";
import Chart from "~/pages/Chart";
import Top100 from "~/pages/Top100";
import Radio from "~/pages/Radio";
import NewMusic from "~/pages/NewMusic";
import Category from "~/pages/Category";

const publicRoute = [
    { path: "/", component: Home },
    { path: "/radio", component: Radio },
    { path: "/chart", component: Chart },
    { path: "/top100", component: Top100 },
    { path: "/new-music", component: NewMusic },
    { path: "/category", component: Category },
];

export { publicRoute };