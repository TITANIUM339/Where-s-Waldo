import { redirect } from "react-router";

export default function loader() {
    const player = localStorage.getItem("player-token");

    if (player) {
        return redirect("/games");
    }
}
