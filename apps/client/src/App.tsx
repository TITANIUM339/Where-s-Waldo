import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorBoundary from "./layouts/root/ErrorBoundary";
import HydrateFallback from "./layouts/root/HydrateFallback";
import Root from "./layouts/root/Root";
import endGameAction from "./pages/end-game/action";
import Game from "./pages/game/Game";
import gameLoader from "./pages/game/loader";
import Games from "./pages/games/Games";
import gamesLoader from "./pages/games/loader";
import Index from "./pages/index/Index";
import indexLoader from "./pages/index/loader";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import leaderBoardLoader from "./pages/leaderboard/loader";
import newPlayerLoader from "./pages/new-player/loader";
import verifyCharactersLoader from "./pages/verify-position/loader";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Root,
            ErrorBoundary,
            HydrateFallback,
            children: [
                {
                    index: true,
                    loader: indexLoader,
                    Component: Index,
                },
                {
                    path: "new-player",
                    loader: newPlayerLoader,
                },
                {
                    path: "games",
                    loader: gamesLoader,
                    Component: Games,
                },
                {
                    path: "games/:gameId",
                    loader: gameLoader,
                    Component: Game,
                    children: [
                        {
                            path: "characters/:characterId/verify-position",
                            loader: verifyCharactersLoader,
                        },
                        {
                            path: "end-game",
                            action: endGameAction,
                        },
                    ],
                },
                {
                    path: "games/:gameId/leaderboard",
                    loader: leaderBoardLoader,
                    Component: Leaderboard,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
