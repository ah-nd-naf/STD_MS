import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Wallet 
} from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // FIX: Check for the 'name' field first. 
        // Fallback to splitting email only if name is null/empty.
        if (res.data) {
          const displayName = res.data.name || res.data.email.split('@')[0];
          setStudentName(displayName);
        }
      } catch (err) {
        console.error("Error fetching name for dashboard", err);
      }
    };

    getStudentData();
  }, []);

  // Stats remains the same
  const stats = [
    { label: "Enrolled Courses", value: "6", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Attendance Rate", value: "94%", icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Pending Assignments", value: "3", icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Due Fees", value: "৳2,500", icon: Wallet, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-blue-500 capitalize">{studentName || "Student"}</span>!
          </h1>
          <p className="text-gray-500 mt-2">Here is what's happening with your studies today.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all shadow-sm">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Schedule</h2>
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
              <p className="text-gray-600">Your timetable will appear here once courses are assigned.</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                <p className="text-sm text-blue-400 font-medium">System Update</p>
                <p className="text-xs text-gray-500 mt-1">Email verification successfully completed.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;