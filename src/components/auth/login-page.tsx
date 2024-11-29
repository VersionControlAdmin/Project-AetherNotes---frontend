"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authService } from "./auth.service";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/useAuth";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);
      useAuth.getState().setToken(response.token, email);
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_20%,rgba(14,165,233,0.15),transparent_25%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(29,78,216,0.15),transparent_25%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="space-y-0.5">
                  <h1 className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                    Welcome back
                  </h1>
                  <p className="text-sm text-gray-400">
                    Enter your credentials to access your account
                  </p>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign In
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    Continue with Google (Coming Soon)
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    Continue with GitHub (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </form>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-gray-400">
                <div
                  onClick={() => navigate("/auth/reset-password")}
                  className="cursor-pointer hover:text-blue-400 underline underline-offset-4"
                >
                  Forgot your password? (Coming Soon)
                </div>
              </div>
              <div
                onClick={() => navigate("/auth/signup")}
                className="group flex items-center gap-1 text-sm text-gray-400 underline-offset-4 hover:text-blue-400 cursor-pointer"
              >
                Create an account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
