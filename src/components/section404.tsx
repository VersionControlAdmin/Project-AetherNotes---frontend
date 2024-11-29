"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Section404() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoHome = () => {
    setIsLoading(true);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-purple-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_20%,rgba(168,85,247,0.15),transparent_25%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(139,92,246,0.15),transparent_25%)]" />
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
                  <h1 className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
                    404
                  </h1>
                  <p className="text-2xl font-semibold text-gray-200">
                    Page Not Found
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-400">
                Oops! The page you're looking for doesn't exist or has been
                moved.
              </p>
              <Button
                onClick={handleGoHome}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Home className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Home className="mr-2 h-4 w-4" />
                )}
                Go to Homepage
              </Button>
            </CardContent>
            <CardFooter className="justify-center">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-1 text-sm text-gray-400 underline-offset-4 hover:text-purple-400"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Go back
              </button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
