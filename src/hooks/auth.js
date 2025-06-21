export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async () => {
            if (!getToken()) {
                setUser(null);
                setLoading(false);
                return;
            }

            const user = await fetchCurrentUser();
            setUser(user);
            setLoading(false);
        }

        check();
    }, []);

    return { user, loading, 'isLoggedIn': !!user};
}