import { fetchDashboardData } from "../lib/dashboard"
import { logout, getToken } from "../lib/auth"
import { useState, useEffect} from "react"
import { FaPhone, FaEnvelope } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { XPLineGraph, PassFailPieChart } from "./graphs"

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
    console.log('user', user);
    // Calculate Total XP and Audit Ratio
    let totalXP = transaction.reduce((acc, tx) => acc + tx.amount, 0);
    const auditRatio = Number(user[0].auditRatio).toFixed(2);

    // Bio Data extraction
    const fullName = `${user[0].attrs.firstName} ${user[0].attrs.middleName} ${user[0].attrs.lastName}`;
    const firstName = `${user[0].attrs.firstName}`;
    const phone = `${user[0].attrs.phone}`;
    const email = `${user[0].attrs.email}`;
    const userName = `${user[0].login}`;
    const gender = `${user[0].attrs.gender}`;
    const country = `${user[0].attrs.country}`;
    
    // Format Total XP
    if (totalXP > 1048576) {
        totalXP = (totalXP / 1048576).toFixed(2) + 'MB';
    } else if (totalXP > 1024) {
        totalXP = (totalXP / 1024).toFixed(2) + 'KB';
    } else {
        totalXP = totalXP + 'B';
    }

    // Calculate Pass/Fail Ratio
    const passCount = result.filter(r => r.grade === 1).length;
    const failCount = result.filter(r => r.grade === 0).length;

   // Sort transactions by date
const sortedTransactions = [...transaction].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  
  // Calculate cumulative XP over time
  let cumulativeXP = 0;
  const xpOverTime = sortedTransactions.map(tx => {
    cumulativeXP += tx.amount;
    return {
      date: new Date(tx.createdAt),
      xp: cumulativeXP,
      label: tx.object.name // Optional: for tooltips or labels
    };
  });

    return (
        <div className="w-screen min-h-screen h-fit flex flex-col items-center justify-center gap-2">
            {/* Name Card */}
            <div className="w-[95%] xl:w-[60%] h-fit bg-white/15 mt-1 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:pt-[30px]">
                {/* Welcome Statement */}
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-light text-[22px] md:text-3xl xl:text-4xl">Welcome, <strong className="font-bold">{firstName}</strong></h2>
                  
                    <button
                        onClick={handleLogout}
                        className="w-20 md:w-40 h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer"
                        >logout</button>
                </div>

                {/* Personal Information */}
                <div className="flex flex-col items-center py-4">
                    <div className="flex items-center justify-center gap-4 w-full">
                      <hr className="w-full border-t border-gray-200" />
                      <h2 className="text-gray-100 italic whitespace-nowrap">Personal Information</h2>
                      <hr className="w-full border-t border-gray-200" />
                    </div>
                    {/* Bio Data */}
                    <div className="flex flex-row justify-between w-full px-10">
                      {/* Column 1 */}
                      <div className="w-1/2 px-2">
                        <h2 className="text-gray-100 font-light">
                          Full Name: <strong>{fullName}</strong>
                        </h2>
                        <h2 className="text-gray-100 font-light">
                          Username: <strong>{userName}</strong>
                        </h2>
                      </div>

                      {/* Column 2 */}
                      <div className="w-1/2 px-2">
                        <h2 className="text-gray-100 font-light">
                          Gender: <strong>{gender}</strong>
                        </h2>
                        <h2 className="text-gray-100 font-light">
                          Campus Location: <strong>{country}</strong>
                        </h2>
                      </div>
                    </div>

                      {/* Contact Information */}
                      <div className="flex flex-col sm:flex-row gap-6 mt-4">
                            <div className="flex flex-row items-center gap-2">
                                <FaPhone className="text-[var(--green-accent-color)] text-base" />
                                <h2 className="text-gray-200">{phone}</h2>
                            </div>
                            <h2 className="text-gray-200 text-4xl font-light hidden sm:block">|</h2>
                            <div className="flex flex-row items-center gap-2">
                              <FaEnvelope className="text-[var(--orange-accent-color)] text-base" />
                              <h2 className="text-gray-200">{email}</h2>
                            </div>
                      </div>
                  </div>                                        
            </div>
                {/* Stats Card */}
                <div className="flex flex-row w-[95%] xl:w-[60%] gap-2">
                    <div className="w-[33.3%] min-h-22 h-fit bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light">Total XP:</h2>
                        <h2 className="font-bold text-[var(--green-accent-color)] text:2xl md:text-3xl"><strong>{totalXP}</strong></h2>         
                    </div>

                    <div className="w-[33.3%] min-h-22 h-fit bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light">Audit Ratio:</h2>
                        <h2 className="font-bold text-[var(--green-accent-color)] text:2xl md:text-3xl"><strong>{auditRatio}</strong></h2>         
                    </div>

                    <div className="w-[33.3%] min-h-22 h-fit bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] md:px-[35px] md:py-[30px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light">Pass/Fail Ratio:</h2>
                        <h2 className="font-bold text-[var(--orange-accent-color)] text:2xl md:text-3xl"><strong>{passCount}/{failCount}</strong></h2>
                    </div>
                </div>

                {/* Graph Cards */}
                <div className="flex flex-col lg:flex-row w-[95%] xl:w-[60%] gap-2">
                    <div className="w-[100%] md:w-[50%] h-70 bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light ml-[30px]">XP Over Time:</h2>
                        <div className="w-fit mx-auto my-auto">
                          <XPLineGraph data={xpOverTime} />
                        </div>
                    </div>

                    <div className="w-[100%] md:w-[50%] h-70 bg-white/15 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[10px] py-[10px] flex flex-col z-10">
                        <h2 className="text-gray-200 md:text-2xl xl:text-[20px] font-light ml-[30px]">Pass/Fail Ratio:</h2>
                        <div className="w-fit mx-auto my-auto">
                          <PassFailPieChart passCount={passCount} failCount={failCount} />
                        </div>
                    </div>
                </div>
        </div>
    )
}