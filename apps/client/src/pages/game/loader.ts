/* eslint-disable @typescript-eslint/only-throw-error */
import type { LoaderFunctionArgs } from "react-router";
import api from "../../lib/api";
import type { APInewGame } from "../../types/api-types";

export default async function loader({ params }: LoaderFunctionArgs) {
    const response = await api(`games/${params.gameId}/new-game`);

    if (!response.ok) {
        throw response;
    }

    return (await response.json()) as APInewGame;
}
