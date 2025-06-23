export const API_URL = 'https://learn.zone01kisumu.ke/api/auth/signin'

/**
 * @async
 * @function login
 * @description Authenticates a user with the provided email and password.
 * It encodes the credentials, sends a request to the API, and stores the JWT token in local storage upon successful authentication.
 * @param {object} credentials - An object containing the user's email and password.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<string>} A promise that resolves with the JWT token if authentication is successful.
 * @throws {Error} If the authentication fails due to invalid email or password, or if the API request fails.
 * @example
 * // Usage:
 * login({ email: 'user@example.com', password: 'password123' })
 *   .then(token => {
 *     console.log('Authentication successful. Token:', token);
 *   })
 *   .catch(error => {
 *     console.error('Authentication failed:', error.message);
 *   });
 */

export async function login({email, password}) {
    const credentials = btoa(`${email}:${password}`);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
        },
    })

    if (!response.ok) {
        throw new Error('Invalid Email or Password');
    }

    const token = await response.json();
    localStorage.setItem('jwt', token)
    return token;
}

export function logout() {
    localStorage.removeItem('jwt');
  }
  
export function getToken() {
  return localStorage.getItem('jwt');
}