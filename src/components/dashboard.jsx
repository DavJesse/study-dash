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
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-2">
            {/* Name Card */}
            <div className="w-[95%] xl:w-[60%] h-fit bg-white/15 mt-1 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px]">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-light text-[22px] md:text-3xl xl:text-4xl">Welcome, <strong className="font-bold">{user[0].login}</strong></h2>
                    <button
                        onClick={handleLogout}
                        className="w-20 md:w-40 h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer"
                        >logout</button>
                </div>                                        
            </div>
                {/* Stats Card */}
                <div className="flex flex-row w-[95%] xl:w-[60%] gap-2">
                    <div className="w-[50%] h-fit bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light">Total XP:</h2>
                        <h2 className="font-bold text-[var(--green-accent-color)] text:2xl md:text-3xl"><strong>{totalXP}</strong></h2>         
                    </div>

                    <div className="w-[50%] h-fit bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light">Pass/Fail Ratio:</h2>
                        <h2 className="font-bold text-[var(--orange-accent-color)] text:2xl md:text-3xl"><strong>{passCount}/{failCount}</strong></h2>
                    </div>
                </div>
        </div>
    )
}