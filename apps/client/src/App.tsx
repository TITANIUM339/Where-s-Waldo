import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorBoundary from "./layouts/root/ErrorBoundary";
import Root from "./layouts/root/Root";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Root,
            ErrorBoundary,
            children: [],
        },
    ]);

    return <RouterProvider router={router} />;
}
