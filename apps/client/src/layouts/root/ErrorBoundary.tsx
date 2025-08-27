import clsx from "clsx";
import { BsArrowRight } from "react-icons/bs";
import { isRouteErrorResponse, useRouteError } from "react-router";
import Button from "../../components/Button";
import useTheme from "../../hooks/theme";

export default function ErrorBoundary() {
    const error = useRouteError();

    const { theme } = useTheme();

    return (
        <div
            className={clsx(
                "flex",
                "min-h-dvh",
                "justify-center",
                "items-center",
                "text-center",
                "bg-gray-100",
                "text-gray-900",
                "transition-colors",
                "dark:bg-gray-900",
                "dark:text-gray-100",
                theme,
            )}
        >
            <div>
                <section>
                    {isRouteErrorResponse(error) ? (
                        <h1 className="mb-2 text-4xl font-bold">
                            <span className="text-red-500">{error.status}</span>{" "}
                            {error.statusText ||
                                (error.data as { message?: string }).message}
                        </h1>
                    ) : (
                        <h1 className="text-4xl font-bold">Unknown Error</h1>
                    )}
                </section>
                <div className="mt-6 flex justify-center">
                    <div className="w-max">
                        <Button link to="/" replace>
                            <div className="flex items-center gap-2">
                                Go home <BsArrowRight size={20} />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
