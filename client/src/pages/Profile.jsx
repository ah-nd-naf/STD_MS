import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { User, Mail, ShieldCheck, Hash, Edit3 } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your student profile information</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl font-semibold transition">
              <Edit3 size={18} /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Avatar & Status */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
                <User size={40} className="text-blue-400" />
              </div>
              <h2 className="text-xl font-bold">{profile?.name || "Student"}</h2>
              <p className="text-gray-500 text-sm mb-4">{profile?.role}</p>
              
              <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${profile?.isVerified ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                {profile?.isVerified ? "Verified" : "Pending"}
              </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-800">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <InfoItem icon={User} label="Full Name" value={profile?.name} />
                <InfoItem icon={Mail} label="Email Address" value={profile?.email} />
                <InfoItem icon={Hash} label="Student ID" value={`#${profile?.id}`} />
                <InfoItem icon={ShieldCheck} label="Account Type" value={profile?.role} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Component for the grid items
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-2.5 bg-gray-800 rounded-lg">
      <Icon size={20} className="text-gray-400" />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-gray-200 font-medium">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default Profile;