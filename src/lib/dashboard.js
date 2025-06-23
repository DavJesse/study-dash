import { getToken } from "./auth";

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

    const { data } = await response.json();
    return data;
}