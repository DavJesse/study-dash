import { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../lib/user';
import { getToken } from '../lib/auth';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async () => {
            const token = getToken();
    
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
    
            try {
                const currUser = await fetchCurrentUser();
                setUser(currUser);
            } catch (err) {
                console.error('Error fetching user:', err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    
        check();

        // Listen for changes to local storage (e.g., logout)
        const handleStorageChange = () => {
            check();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { user, loading, isLoggedIn: !!user };
}