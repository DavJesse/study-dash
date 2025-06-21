import { getToken, API_URL } from "./auth";

export async function fetchDashboardData() {
    const token = getToken();

    const response = await fetch(API_URL, {
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
              }`,
        }),
    })

    const { data } = await response.json();
    return data;
}