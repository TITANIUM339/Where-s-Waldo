import { createBrowserRouter, RouterProvider } from "react-router";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <h1 className="text-4xl text-amber-400">Hello, World!</h1>,
        },
    ]);

    return <RouterProvider router={router} />;
}
