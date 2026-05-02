import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Loader2 } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Backend request to authRoutes.js (using /signup)
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      // 2. Redirect to OTP page and pass email so they don't have to re-type it
      navigate("/verify-otp", { state: { email } });
      
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 text-gray-100">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Sign up for the Student Management System</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-600" size={18} />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-12 py-3.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-600" size={18} />
              <input
                type="email"
                placeholder="university@email.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-12 py-3.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-600" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-12 py-3.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;