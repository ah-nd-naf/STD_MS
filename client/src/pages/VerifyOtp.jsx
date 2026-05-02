import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Grab the email passed from the Signup page
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });
      
      // If verification is successful, send them to login
      navigate("/login", { state: { message: "Account verified! You can now log in." } });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
          <ShieldCheck size={32} className="text-blue-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
        <p className="text-gray-500 text-sm mb-8">
          We've sent a 6-digit code to <span className="text-blue-400 font-medium">{email}</span>
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <input
              type="text"
              maxLength="6"
              placeholder="000000"
              className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-4 text-center text-2xl font-mono tracking-[1em] text-white focus:border-blue-500 outline-none transition"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Verify Account <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-gray-500 mt-8 text-sm">
          Didn't receive the code? <button className="text-blue-400 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;