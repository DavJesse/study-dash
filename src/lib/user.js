import { API_URL } from "./auth";
import { getToken } from "./auth";;

export async function fetchCurrentUser() {
    const token = getToken();
    if (!token) return null;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: `{
                user {
                    id
                    login
                    }
                }`
        }),
    });

    if (!response.ok) return null;

    const { data, errors} = await response.json();
    if (errors || !data.user || !data) return null;
    return data.user;
}
