/* eslint-disable @typescript-eslint/only-throw-error */
import { type LoaderFunctionArgs, redirect } from "react-router";
import api from "../../lib/api";
import type { APIerror, APItoken } from "../../types/api-types";

export default async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);

    const response = await api(
        `new-player?name=${url.searchParams.get("name") ?? ""}`,
    );

    if (response.status === 400) {
        return (await response.json()) as APIerror;
    }

    if (!response.ok) {
        throw response;
    }

    const { token } = (await response.json()) as APItoken;

    localStorage.setItem("player-token", token);

    return redirect("/games");
}
