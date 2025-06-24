import { fetchDashboardData } from "../lib/dashboard"
import { logout } from "../lib/auth"
import { useState, useEffect } from "react"

export function Dashboard() {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetchDashboardData().then(setData)
    },[])

    if (!data) return <div>Loading Dashboard</div>
console.log('Dashboard Data: ', data)
    // Data Extraction
    const {user, transaction, progress, result} = data

    // Calculate Total XP
    const totalXP = transaction.reduce((acc, tx) => acc + tx.amount, 0)

    // Calculate Pass/Fail Ratio
    const passCount = result.filter(r => r.grade === 1).length
    const failCount = result.filter(r => r.grade === 0).length

    return (
        <div className="flex flex-col">
            {/* Name Card */}
            <div className="w-[80%] h-fit bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[30px] justify-center z-10">
                <div className="flex flex-row justify-between items-center mb-6">
                    <h1 className="text-white font-light">Welcome, <strong className="font-bold">{user[0].login}</strong></h1>
                    <button
                        onClick={logout()}
                        className="w-40 h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer"
                        >logout</button>
                </div>

                {/* Stats Card */}
                <div className="flex flex-row justify-between">
                        <h2 className="text-gray-200 text-4xl font-light">Total XP: <strong className="font-bold text-[var(--green-accent-color)]">{totalXP}</strong></h2>
                    
                        <h2 className="text-gray-200 text-4xl font-light">Pass/Fail Ratio: <strong className="font-bold text-[var(--orange-accent-color)]">{passCount}/{failCount}</strong></h2>
                </div>
            </div>
        </div>
    )
}