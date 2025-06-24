import { fetchDashboardData } from "../lib/dashboard"
import { logout, getToken } from "../lib/auth"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch Dashboard Data
    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }

        fetchDashboardData()
        .then(setData)
        .catch(err => {
            console.error('Error fetching dashboard data:', err.message);
            setError(err.message);
            navigate('/login');
        });
    },[navigate]);

    if (error) return <div>Error: {error}</div>
    if (!data) return <div>Loading Dashboard</div>

    // Handle Logout
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    // Data Extraction
    const {user, transaction, progress, result} = data;

    // Calculate Total XP
    const totalXP = transaction.reduce((acc, tx) => acc + tx.amount, 0);

    // Calculate Pass/Fail Ratio
    const passCount = result.filter(r => r.grade === 1).length;
    const failCount = result.filter(r => r.grade === 0).length;

    return (
        <div className="flex flex-col">
            {/* Name Card */}
            <div className="w-[95%] xl:w-[80%] h-fit bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px] justify-center z-10">
                <div className="flex flex-row justify-between items-center mb-6">
                    <h2 className="text-white font-light text-[22px] md:text-3xl xl:text-4xl">Welcome, <strong className="font-bold">{user[0].login}</strong></h2>
                    <button
                        onClick={handleLogout}
                        className="w-20 md:w-40 h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer"
                        >logout</button>
                </div>
                                        
                {/* Stats Card */}
                <div className="flex flex-row justify-between">
                        <h2 className="text-gray-200 md:text-2xl xl:text-3xl font-light">Total XP: <strong className="font-bold text-[var(--green-accent-color)]">{totalXP}</strong></h2>                    
                        <h2 className="text-gray-200 md:text-2xl xl:text-3xl font-light">Pass/Fail Ratio: <strong className="font-bold text-[var(--orange-accent-color)]">{passCount}/{failCount}</strong></h2>
                </div>
            </div>
        </div>
    )
}