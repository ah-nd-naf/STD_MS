import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Passing the "VIP Pass"
          },
        });
        setProfileData(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-4 mb-6">Student Profile</h1>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-700/50 pb-2">
            <span className="text-gray-400">Email:</span>
            <span className="font-mono">{profileData?.email}</span>
          </div>
          <div className="flex justify-between border-b border-gray-700/50 pb-2">
            <span className="text-gray-400">Account Status:</span>
            <span className={profileData?.isVerified ? "text-green-400" : "text-yellow-400"}>
              {profileData?.isVerified ? "Verified" : "Pending Verification"}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-700/50 pb-2">
            <span className="text-gray-400">User ID:</span>
            <span className="text-xs text-gray-500">{profileData?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;