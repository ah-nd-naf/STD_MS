import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  // Add 'logout' here so we can use it in the dashboard
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      Loading...
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes: Redirect to dashboard if already logged in */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

        {/* Temporary Dashboard Route with Styling */}
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700 text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
                  <p className="text-green-400 text-xl mb-6">Welcome back, {user.email}!</p>
                  <button 
                    onClick={logout} 
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;