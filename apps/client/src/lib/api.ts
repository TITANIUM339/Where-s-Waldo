export default function api(url: string, init?: RequestInit) {
    return fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        ...init,
    });
}
