import { getToken } from "./auth";;

export async function fetchCurrentUser() {
    const token = getToken();
    if (!token) return null;

    const response = await fetch('https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: `{
                user {
                    id
                    login
                }
            }`,
        }),
    });

    if (!response.ok) {
        console.error('Failed to fetch user:', response.statusText);
        return null;
    }

    const { data, errors } = await response.json();
    console.log('Data: ', data.user[0]);

    if (errors || !data || !data.user || data.user.length === 0) {
        console.error('No user found or GraphQL errors:', errors);
        return null;
    }

    return data.user[0];
}
