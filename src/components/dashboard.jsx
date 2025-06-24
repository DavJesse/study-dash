import { fetchDashboardData } from "../lib/dashboard"
import { logout } from "../lib/auth"
import { useState, useEffect } from "react"

export function Dashboard() {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetchDashboardData().then(setData)
    },[])
console.log('Dashboard Data: ', data)
    if (!data) return <div>Loading Dashboard</div>

    return (
        <div className="flex flex-col">
            <div className="w-[80%] h-fit bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] justify-center z-10">
                <div>
                    <h1>{data.login}</h1>
                    <button
                        onClick={logout()}
                        className="w-40 h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer"
                        >logout</button>
                </div>
                <div className="flex flex-row">

                </div>
            </div>
        </div>
    )
}