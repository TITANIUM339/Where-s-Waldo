import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorBoundary from "./layouts/root/ErrorBoundary";
import Root from "./layouts/root/Root";
import indexAction from "./pages/index/action";
import Index from "./pages/index/Index";
import indexLoader from "./pages/index/loader";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Root,
            ErrorBoundary,
            children: [
                {
                    index: true,
                    loader: indexLoader,
                    action: indexAction,
                    Component: Index,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
