"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { authService } from "./auth.service";
import { useToast } from "@/hooks/use-toast";

export function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await authService.signup(formData.email, formData.password);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      navigate("/auth/login");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-black to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_20%,rgba(14,165,233,0.15),transparent_25%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_80%,rgba(29,78,216,0.15),transparent_25%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md pt-20"
        >
          <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="space-y-0.5">
                  <h1 className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                    Create an account
                  </h1>
                  <p className="text-sm text-gray-400">
                    Enter your information to get started
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
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-200">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-white/10 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        acceptTerms: checked as boolean,
                      }))
                    }
                    className="border-white/10 data-[state=checked]:bg-blue-500"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm leading-none text-gray-400"
                  >
                    I agree to the{" "}
                    <span
                      onClick={() => navigate("/terms")}
                      className="text-blue-400 underline underline-offset-4 hover:text-blue-500 cursor-pointer"
                    >
                      terms and conditions
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  disabled={isLoading || !formData.acceptTerms}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
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
            <CardFooter>
              <div
                onClick={() => navigate("/auth/login")}
                className="group flex items-center gap-1 text-sm text-gray-400 underline-offset-4 hover:text-blue-400 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to login
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
