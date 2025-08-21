import clsx from "clsx";
import { jwtDecode } from "jwt-decode";
import { useLoaderData } from "react-router";
import { getElapsedTime } from "../../lib/time";
import type { APILeaderboard } from "../../types/api-types";

export default function Leaderboard() {
    const { data, player }: { data: APILeaderboard; player: string } =
        useLoaderData();

    const { id }: { id: string } = jwtDecode(player);

    return (
        <div className="h-full w-full pt-8 pr-2 pb-8 pl-2">
            <section className="mr-auto ml-auto w-full max-w-7xl">
                <h1 className="text-4xl font-bold">Leaderboard</h1>
                <h2 className="mt-2 text-lg font-medium">{data.game}</h2>
                <div className="mt-4">
                    <table className="grid grid-rows-[min-content_1fr] overflow-hidden rounded-md bg-gray-50 shadow dark:bg-gray-950">
                        <thead className="bg-gray-200 p-4 dark:bg-gray-800">
                            <tr className="grid grid-cols-4 gap-2">
                                <th scope="col" className="text-start">
                                    Place
                                </th>
                                <th scope="col" className="text-start">
                                    Name
                                </th>
                                <th scope="col" className="text-start">
                                    Time *
                                </th>
                                <th scope="col" className="text-start">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="flex flex-col divide-y divide-solid divide-gray-300 dark:divide-gray-700">
                            {data.leaderboard.map((entry, index) => (
                                <tr
                                    key={entry.playerId}
                                    id={entry.playerId}
                                    className={clsx(
                                        "grid",
                                        "grid-cols-4",
                                        "gap-2",
                                        "p-4",
                                        entry.playerId === id &&
                                            "bg-sky-100 dark:bg-sky-900",
                                    )}
                                >
                                    <td className="overflow-x-auto whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="overflow-x-auto whitespace-nowrap">
                                        {entry.name}
                                    </td>
                                    <td className="overflow-x-auto whitespace-nowrap">
                                        {getElapsedTime(
                                            new Date(entry.start).getTime(),
                                            new Date(entry.updatedAt).getTime(),
                                        )}
                                    </td>
                                    <td className="overflow-x-auto whitespace-nowrap">
                                        {new Date(
                                            entry.updatedAt,
                                        ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4">
                    * Time may not reflect the actual time it took to finish the
                    game due to multiple factors including but not limited to
                    network latency, server response time, and client
                    performance.
                </p>
            </section>
        </div>
    );
}
