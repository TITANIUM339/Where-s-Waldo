/* eslint-disable @typescript-eslint/only-throw-error */
import { redirect, type ActionFunctionArgs } from "react-router";
import api from "../../lib/api";
import type { APIerror, APItoken } from "../../types/api-types";

export default async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const response = await api("new-player", {
        method: "post",
        body: JSON.stringify({
            name: formData.get("name"),
        }),
    });

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
