import { getToken } from "./auth";

/**
 * @async
 * @function fetchDashboardData
 * @description Fetches dashboard data from the GraphQL API.
 * @returns {Promise<Object>} A promise that resolves to the dashboard data.
 * @throws {Error} If the fetch request fails or if the GraphQL query returns errors.
 */

export async function fetchDashboardData() {
    const token = getToken();

    const response = await fetch('https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'contentType' : 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: `{
                user {
                  id
                  login
                  email
                  attrs
                  auditRatio
                }
        
                transaction(
                  where: { type: { _eq: "xp" } }
                  order_by: { createdAt: asc }
                ) {
                  amount
                  createdAt
                  object {
                    name
                    type
                  }
                }

                progress {
                  grade
                  path
                  createdAt
                }

                result {
                  id
                  grade
                  type
                  createdAt
                  path
                }
              }`,
        }),
    })

    if (!response.ok) {
      console.error('Failed to fetch dashboard data:', response.statusText);
      throw new Error("Failed to fetch dashboard data");
    }

    const { data, errors } = await response.json();

    if (errors || !data) {
      console.error('GraphQL errors:', errors);
      throw new Error("GraphQL query failed");
    }

    return data;
}