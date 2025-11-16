import { useState } from "react";
import { motion } from "motion/react";
import { LogIn, User, Lock, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    // For demo purposes, accept any non-empty credentials
    onLogin(username);
  };

  return (
    <div className="min-h-screen bg-[#23272A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#5865F2] rounded-full mb-4"
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-white mb-2">COS 214 App</h1>
          <p className="text-gray-400">Learn design patterns through interactive games</p>
        </div>

        {/* Login Card */}
        <Card className="bg-[#2C2F33] border-[#2F3136] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your username"
                  className="pl-10 bg-[#23272A] border-[#2F3136] text-white placeholder:text-gray-500 focus:border-[#5865F2]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="pl-10 bg-[#23272A] border-[#2F3136] text-white placeholder:text-gray-500 focus:border-[#5865F2]"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              size="lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 pt-6 border-t border-[#2F3136]">
            <p className="text-sm text-gray-400 text-center">
              Please enter your username and password
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Learn • Play • Master Design Patterns
        </p>
      </motion.div>
    </div>
  );
}