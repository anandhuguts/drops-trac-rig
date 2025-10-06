import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import dropsTracLogo from "@assets/generated_images/e28805cb-6174-4d0d-960b-b4bef57acca3.png";

function LoginPage() {
  const [, setLocation] = useLocation();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      
      if (res.data.token) {
        setToken(res.data.token);
        setLocation("/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err: any) {
      if (err.isAuthError) {
        setError(err.message);
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-sky-200">
      <form
        onSubmit={handleLogin}
        className="bg-white/80 backdrop-blur-md p-10 shadow-2xl rounded-3xl w-[420px] border border-white/20"
      >
        {/* Logo */}
     <div className="flex justify-center mb-6">
  <div className="w-20 h-20 rounded-2xl flex items-center justify-center ">
    <img
      src={dropsTracLogo}
      alt="DropsTrac Logo"
      className="w-16 h-16 object-contain"
      loading="eager"
      decoding="async"
      style={{
        imageRendering: "crisp-edges",
        WebkitFilter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
      }}
    />
  </div>
</div>


        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Rig Inspection Portal
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Access your inspection dashboard, manage reports,<br />
          and monitor rigs in real-time.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Username Input */}
        <div className="mb-4 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1119.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Rig Inspection Management System © {new Date().getFullYear()}
        </p>
      </form>
    </div>
  );
}

export default LoginPage;