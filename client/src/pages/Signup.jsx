import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = Signup, 2 = OTP
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage("Signup successful! Check your email.");
      setStep(2); // Move to OTP step
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: formData.email,
        otp: otp
      });
      setMessage("Email verified! You can now log in.");
      // You could redirect to /login here
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {step === 1 ? "Create Account" : "Verify Email"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500">
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-gray-400 text-sm text-center">Enter the 6-digit code sent to {formData.email}</p>
            <input
              type="text"
              placeholder="123456"
              maxLength="6"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white text-center text-2xl tracking-widest"
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500">
              Verify OTP
            </button>
          </form>
        )}

        <p className = "text-gray-400 mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link></p>

        {message && (
          <p className={`mt-4 text-center ${message.includes("successful") || message.includes("verified") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;