import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// 路由懒加载
const Discover = React.lazy(() => import("../pages/discover"));
const Album = React.lazy(() => import("../pages/discover/c-pages/album"));
const Artist = React.lazy(() => import("../pages/discover/c-pages/artist"));
const Djradio = React.lazy(() => import("../pages/discover/c-pages/djradio"));
const Ranking = React.lazy(() => import("../pages/discover/c-pages/ranking"));
const Recommend = React.lazy(() => import("../pages/discover/c-pages/recommend"));
const Songs = React.lazy(() => import("../pages/discover/c-pages/songs"));
const Friend = React.lazy(() => import("../pages/friend"));
const Mine = React.lazy(() => import("../pages/mine"));
const Player = React.lazy(() => import("../pages/player"));
// import Discover from "../pages/discover";
// import Album from "../pages/discover/c-pages/album";
// import Artist from "../pages/discover/c-pages/artist";
// import Djradio from "../pages/discover/c-pages/djradio";
// import Ranking from "../pages/discover/c-pages/ranking";
// import Recommend from "../pages/discover/c-pages/recommend";
// import Songs from "../pages/discover/c-pages/songs";
// import Friend from "../pages/friend";
// import Mine from "../pages/mine";
// import Player from "../pages/player";

const routes = [
    {
        path: "/",
        exact: true,
        // 重定向
        render: () => (
            <Redirect to="/discover" />
        )
    },
    {
        path: "/discover",
        component: Discover,
        routes: [
            {
                path: "/discover",
                exact: true,
                render: () => (
                    <Redirect to="/discover/recommend" />
                )
            },
            {
                path: "/discover/recommend",
                component: Recommend
            },
            {
                path: "/discover/ranking",
                component: Ranking
            },
            {
                path: "/discover/songs",
                component: Songs
            },
            {
                path: "/discover/djradio",
                component: Djradio
            },
            {
                path: "/discover/artist",
                component: Artist
            },
            {
                path: "/discover/album",
                component: Album
            },
            {
                path: "/discover/player",
                component: Player
            }
        ]
    },
    {
        path: "/mine",
        component: Mine
    },
    {
        path: "/friend",
        component: Friend
    }
];

export default routes;