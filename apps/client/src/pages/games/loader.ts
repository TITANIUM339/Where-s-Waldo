/* eslint-disable @typescript-eslint/only-throw-error */
import { redirect } from "react-router";
import api from "../../lib/api";
import type { APIgames } from "../../types/api-types";

export default async function loader() {
    const player = localStorage.getItem("player-token");

    if (!player) {
        return redirect("/");
    }

    const response = await api("games");

    if (!response.ok) {
        throw response;
    }

    return (await response.json()) as APIgames;
}
