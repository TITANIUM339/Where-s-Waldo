/* eslint-disable @typescript-eslint/only-throw-error */
import { jwtDecode } from "jwt-decode";
import { redirect, type ActionFunctionArgs } from "react-router";
import api from "../../lib/api";

export default async function action({ request, params }: ActionFunctionArgs) {
    const json = (await request.json()) as {
        characters: {
            id: number;
            position: {
                x: number;
                y: number;
            } | null;
        }[];
        playerToken: string;
        gameToken: string;
    };

    const response = await api(`games/${params.gameId}/end-game`, {
        body: JSON.stringify(json),
        method: "post",
    });

    if (!response.ok) {
        throw response;
    }

    const { id }: { id: string } = jwtDecode(json.playerToken);

    return redirect(`/games/${params.gameId}/leaderboard#${id}`);
}
