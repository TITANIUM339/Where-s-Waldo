import clsx from "clsx";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useFetcher, useLoaderData, useParams, useSubmit } from "react-router";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Timer from "../../components/Timer";
import type { APInewGame, APIVerifyPosition } from "../../types/api-types";

export default function Game() {
    const {
        newGame,
        playerToken,
    }: { newGame: APInewGame; playerToken: string } = useLoaderData();

    const dropdownContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [dropdownPosition, setDropdownPosition] = useState<{
        clientX: number;
        clientY: number;
    } | null>(null);
    const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
    const [characters, setCharacters] = useState<
        {
            id: number;
            name: string;
            imageURL: string;
            position: null | { x: number; y: number };
        }[]
    >(
        newGame.game.characters.map((character) => ({
            ...character,
            position: null,
        })),
    );

    const fetcher = useFetcher();

    const submit = useSubmit();

    const params = useParams();

    useEffect(() => {
        function resetDropdown() {
            setDropdownPosition(null);
        }

        window.addEventListener("click", resetDropdown);
        window.addEventListener("resize", resetDropdown);

        return () => {
            window.removeEventListener("click", resetDropdown);
            window.removeEventListener("resize", resetDropdown);
        };
    }, []);

    useEffect(() => {
        setDropdownPosition(null);

        if (!fetcher.data) {
            return;
        }

        const fetcherData = fetcher.data as APIVerifyPosition;

        const theme = localStorage.getItem("theme") ?? "light";

        if (fetcherData.found) {
            toast(`You found ${fetcherData.character.name}!`, {
                type: "success",
                theme,
            });

            setCharacters((prev) =>
                prev.map((character) =>
                    character.id === fetcherData.character.id
                        ? {
                              ...character,
                              position: fetcherData.position,
                          }
                        : character,
                ),
            );
        } else {
            toast(`${fetcherData.character.name} is not there. Try again!`, {
                type: "error",
                theme,
            });
        }
    }, [fetcher.data]);

    useEffect(() => {
        if (characters.filter((character) => !character.position).length) {
            return;
        }

        void submit(
            {
                characters: characters.map((character) => ({
                    id: character.id,
                    position: character.position,
                })),
                playerToken,
                gameToken: newGame.token,
            },
            {
                method: "post",
                action: `end-game`,
                encType: "application/json",
            },
        );
    }, [characters, submit, playerToken, newGame.token]);

    const { iat }: { iat: number } = jwtDecode(newGame.token);

    return (
        <div className="relative flex h-full w-full items-center justify-center p-2">
            <div className="absolute top-0 right-0 z-10 m-2 flex flex-col items-end gap-2">
                {/* Convert iat to ms */}
                <Timer start={iat * 1000} />
                <div className="flex flex-wrap gap-2 bg-gray-50/60 p-2 shadow dark:bg-gray-950/60">
                    {characters.map((character) => (
                        <img
                            key={character.id}
                            className={clsx(
                                "max-h-[10dvh]",
                                "max-w-[10dvw]",
                                "object-contain",
                                "transition-opacity",
                                character.position && "opacity-20",
                            )}
                            src={character.imageURL}
                            alt={character.name}
                        />
                    ))}
                </div>
            </div>
            <div
                ref={dropdownContainerRef}
                className="relative overflow-hidden"
                onClick={(event) => {
                    event.stopPropagation();

                    if (dropdownPosition) {
                        setDropdownPosition(null);
                    } else {
                        setDropdownPosition({
                            clientX: event.clientX,
                            clientY: event.clientY,
                        });
                    }
                }}
            >
                {dropdownPosition && dropdownContainerRef.current ? (
                    <Dropdown
                        position={dropdownPosition}
                        targetRect={dropdownContainerRef.current.getBoundingClientRect()}
                    >
                        <ul className="flex flex-col gap-2">
                            {characters
                                .filter((character) => !character.position)
                                .map((character) => (
                                    <li key={character.id}>
                                        <fetcher.Form
                                            className="flex flex-col"
                                            action={`/games/${params.gameId}/characters/${character.id}/verify-position`}
                                        >
                                            <input
                                                type="number"
                                                name="x"
                                                value={characterPosition.x}
                                                hidden
                                                readOnly
                                                required
                                            />
                                            <input
                                                type="number"
                                                name="y"
                                                value={characterPosition.y}
                                                hidden
                                                readOnly
                                                required
                                            />
                                            <Button
                                                type="submit"
                                                variant="secondary"
                                                onClick={(event) =>
                                                    event.stopPropagation()
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        className="h-10 w-10 object-cover object-top"
                                                        src={character.imageURL}
                                                        alt=""
                                                    />
                                                    {character.name}
                                                </div>
                                            </Button>
                                        </fetcher.Form>
                                    </li>
                                ))}
                        </ul>
                    </Dropdown>
                ) : null}
                <img
                    ref={imageRef}
                    src={newGame.game.imageURL}
                    alt=""
                    onClick={(event) => {
                        const rect = imageRef.current?.getBoundingClientRect();

                        if (!rect) {
                            return;
                        }

                        const { width, height } = rect;

                        const coordinateX =
                            (event.nativeEvent.offsetX / width) *
                            newGame.game.imageWidth;
                        const coordinateY =
                            (event.nativeEvent.offsetY / height) *
                            newGame.game.imageHeight;

                        setCharacterPosition({
                            x: coordinateX,
                            y: coordinateY,
                        });
                    }}
                />
            </div>
        </div>
    );
}
