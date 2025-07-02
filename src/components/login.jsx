/**
 * @file Defines the LoginForm component for user authentication.
 */

import React, { useState } from 'react';
import { login } from '../lib/auth'; // Assuming login function is in auth.js
import logoPath from '../assets/images/logo/logo.png'; // Path to the logo image

/**
 * @function LoginForm
 * @description A functional component that renders a login form.
 *              It handles user input for username (email) and password,
 *              attempts to log the user in, and redirects to the dashboard upon success.
 *              Displays an error message if login fails.
 * @returns {JSX.Element} The LoginForm component.
 */

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email: username, password });
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
    <div className="min-h-screen h-fit w-screen relative">
        <form
            onSubmit={handleSubmit}
            className='h-fit w-80 bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] flex flex-col justify-center gap-6 z-10'
            >
            <img src={logoPath} alt="Logo" className='h-30 w-auto max-w-full object-contain'></img>
                <div className='flex flex-col justify-center'>
                    <div className='flex justify-center text-red-500'>
                        <p>{error}</p>
                    </div>
                    <label htmlFor="username" className='block text-white text-base font-medium'>Username</label>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='block h-10 bg-white/10 text-white rounded px-[10px] mb-2 text-sm font-light'
                        ></input>

                    <label htmlFor="password" className='block text-white text-base font-medium'>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='block h-10 bg-white/10 text-white rounded px-[10px] text-sm font-light'
                        ></input>

                    <button className='mt-10 h-10 bg-gray-200 text-[var(--primary-color)] p-0 text-lg font-semibold rounded-[5px] cursor-pointer'>Log In</button>
                    <div className='flex justify-center text-blue-500'>
                        <p>use '<strong className='text-green-500'>demo</strong>' as both username and password to access demo mode</p>
                    </div>
                </div>
        </form>
        <div className="green-circle w-30 h-30 absolute rounded-full left-[0%] top-[20%] md:left-[24%] md:top-[24%] lg:left-[31%] lg:top-[6%] xl:left-[34%] xl:top-[17%] 2xl:left-[38%] 2xl:top-[18%] overflow-hidden"></div>
        <div className="orange-circle w-30 h-30 absolute rounded-full right-[0%] bottom-[20%] md:right-[24%] md:bottom-[24%] lg:right-[31%] lg:bottom-[6%] xl:right-[34%] xl:bottom-[17%] 2xl:right-[38%] 2xl:bottom-[18%] overflow-hidden"></div>
    </div>
    )
}