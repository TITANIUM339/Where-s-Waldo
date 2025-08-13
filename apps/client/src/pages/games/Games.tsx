import { useLoaderData } from "react-router";
import Button from "../../components/Button";
import type { APIgames } from "../../types/api-types";

export default function Games() {
    const games: APIgames = useLoaderData();

    return (
        <div className="h-full w-full pt-8 pr-2 pb-8 pl-2">
            <section className="mr-auto ml-auto w-full max-w-7xl">
                <h1 className="text-4xl font-bold">Games</h1>
                <div className="mt-4 grid auto-rows-[500px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="grid grid-rows-[250px_1fr] rounded-md bg-gray-50 p-4 shadow dark:bg-gray-950"
                        >
                            <div>
                                <img
                                    className="h-full w-full object-cover"
                                    src={game.imageURL}
                                    alt=""
                                />
                            </div>
                            <section className="mt-4 overflow-hidden">
                                <h2 className="truncate text-xl font-bold">
                                    {game.name}
                                </h2>
                                <p className="mt-2 wrap-break-word text-gray-500">
                                    {game.description}
                                </p>
                            </section>
                            <div className="mt-4 flex gap-4">
                                <div className="flex-1">
                                    <Button link to={`/games/${game.id}`}>
                                        Play
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <Button
                                        link
                                        to={`/games/${game.id}/leaderboard`}
                                        variant="secondary"
                                    >
                                        Leaderboard
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
