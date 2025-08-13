/* eslint-disable @typescript-eslint/only-throw-error */
import type { LoaderFunctionArgs } from "react-router";
import api from "../../lib/api";
import type { APIVerifyPosition } from "../../types/api-types";

export default async function loader({ request, params }: LoaderFunctionArgs) {
    const url = new URL(request.url);

    const response = await api(
        `games/${params.gameId}/characters/${params.characterId}/verify-position?x=${url.searchParams.get("x") ?? ""}&y=${url.searchParams.get("y") ?? ""}`,
    );

    if (!response.ok) {
        throw response;
    }

    return (await response.json()) as APIVerifyPosition;
}
