import clsx from "clsx";
import Spinner from "../../components/Spinner";
import useTheme from "../../hooks/theme";

export default function HydrateFallback() {
    const { theme } = useTheme();

    return (
        <div
            className={clsx(
                "flex",
                "min-h-dvh",
                "justify-center",
                "items-center",
                "bg-gray-100",
                "text-gray-900",
                "transition-colors",
                "dark:bg-gray-900",
                "dark:text-gray-100",
                theme,
            )}
        >
            <Spinner size={50} />
        </div>
    );
}
