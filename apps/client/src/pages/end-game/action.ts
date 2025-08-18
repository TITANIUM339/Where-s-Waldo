/* eslint-disable @typescript-eslint/only-throw-error */
import { redirect, type ActionFunctionArgs } from "react-router";
import api from "../../lib/api";

export default async function action({ request, params }: ActionFunctionArgs) {
    const response = await api(`games/${params.gameId}/end-game`, {
        body: JSON.stringify(await request.json()),
        method: "post",
    });

    if (!response.ok) {
        throw response;
    }

    return redirect(`/games/${params.gameId}/leaderboard`);
}
