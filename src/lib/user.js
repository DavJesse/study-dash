import { getToken } from "./auth";;

/**
 * @async
 * @function fetchCurrentUser
 * @description Fetches the current user's data from the GraphQL API.
 *              It retrieves the token, makes a request to the GraphQL endpoint,
 *              and returns the user data if successful.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found,
 *                                 or null if no user is found or if an error occurs.
 *                                 The user object contains 'id' and 'login' properties.
 * @throws {Error} If the fetch operation fails or if the GraphQL query returns errors.
 */

import { demoData } from './demo_data';

export async function fetchCurrentUser() {
    const token = getToken();
    if (!token) return null;

    // Return user for demo mode
    if (token === 'demo-mode') {
        return demoData.user[0];
    }

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

    if (errors || !data || !data.user || data.user.length === 0) {
        console.error('No user found or GraphQL errors:', errors);
        return null;
    }

    return data.user[0];
}
