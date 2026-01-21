import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Lock, User, ArrowRight, PawPrint } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:7654";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_or_email: usernameOrEmail,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden p-4">
      {/* Dekorasi Background - Paw Prints Lucu */}
      <div className="absolute top-10 left-10 text-slate-200 rotate-12">
        <PawPrint size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-slate-200 -rotate-12">
        <PawPrint size={150} />
      </div>

      <Card className="w-full max-w-[450px] border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white z-10">
        <CardContent className="p-0">
          {/* Header Biru Navy */}
          <div className="bg-[#00365c] p-10 text-center text-white relative">
            <div className="bg-white w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-lg rotate-3 group hover:rotate-0 transition-transform duration-500">
              <img
                src="/assets/logo_pet_cargo.png"
                alt="Logo"
                className="w-14 h-14 object-contain"
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-1">
              Darin Admin Portal
            </h1>
            <p className="text-white/60 text-sm font-medium">
              Safe Trip for Pets, Peace of Mind for You
            </p>

            {/* Aksen hiasan melengkung (optional) */}
            <div className="absolute -bottom-6 left-0 right-0">
              <svg viewBox="0 0 1440 320" className="w-full h-12 fill-white">
                <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
          </div>

          {/* Form Login */}
          <form onSubmit={handleLogin} className="p-10 pt-14 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">
                  Email / Username
                </label>
              </div>

              <div className="relative">
                <User
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <Input
                  id="usernameOrEmail"
                  type="text"
                  placeholder="admin@darinpet.com"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                {/* <button type="button" className="text-xs font-bold text-[#00365c] hover:underline">Lupa Password?</button> */}
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-3 text-slate-400"
                  size={18}
                />
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="🐱︎🐱︎🐱︎🐱︎🐱︎🐱︎"
                  className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#00365c] hover:bg-[#002845] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#00365c]/20 transition-all hover:-translate-y-1"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Masuk Ke Dashboard <ArrowRight size={18} />
                </div>
              )}
            </Button>
          </form>
          {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Secure admin access for Pet Cargo management
              </p>
              <div className="flex justify-center items-center gap-1 mt-2">
                <PawPrint className="w-4 h-4 text-red-400" />
                <span className="text-xs text-gray-400">Made with love for pets</span>
                <PawPrint className="w-4 h-4 text-red-400" />
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
