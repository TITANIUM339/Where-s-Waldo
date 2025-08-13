import clsx from "clsx";
import { BsGithub, BsMoonFill, BsSunFill } from "react-icons/bs";
import { Link, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Button from "../../components/Button";
import useTheme from "../../hooks/theme";

export default function Root() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={clsx(
                "grid",
                "min-h-dvh",
                "grid-rows-[min-content_1fr_min-content]",
                "bg-gray-100",
                "text-gray-900",
                "transition-colors",
                "dark:bg-gray-900",
                "dark:text-gray-100",
                theme,
            )}
        >
            <header className="p-2">
                <div className="mr-auto ml-auto flex w-full max-w-7xl justify-between">
                    <div>
                        <Link to="/" className="text-2xl font-bold">
                            Where's <span className="text-red-500">Waldo</span>
                        </Link>
                    </div>
                    <div>
                        <Button
                            icon
                            variant="secondary"
                            aria-label={
                                theme === "dark" ? "Light mode" : "Dark mode"
                            }
                            onClick={toggleTheme}
                        >
                            {theme === "dark" ? <BsSunFill /> : <BsMoonFill />}
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="flex items-center justify-center gap-2 p-2">
                Copyright © TITANIUM339 {new Date().getFullYear()}
                <Link
                    to="https://github.com/TITANIUM339"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-125"
                >
                    <BsGithub />
                </Link>
            </footer>
            <ToastContainer />
        </div>
    );
}
