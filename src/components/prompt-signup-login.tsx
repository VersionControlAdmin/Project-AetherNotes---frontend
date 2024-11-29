"use client";

import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PromptSignupLogin() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-[200px] flex-col items-center justify-center px-4 text-center"
    >
      <div className="max-w-4xl space-y-4 flex flex-col items-center py-8">
        <motion.h1
          className="text-3xl text-white font-bold tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <span className="relative group hover:bg-gradient-to-r hover:from-blue-500 hover:via-teal-500 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              Please Login or Sign Up to Continue
            </span>
          </div>
        </motion.h1>

        <motion.div
          className="flex gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-[#66FFFF] px-8 py-6 text-lg font-semibold transition-transform hover:scale-105 hover:shadow-lg hover:shadow-[#66FFFF]/20"
            onClick={() => navigate("/auth/login")}
          >
            <span className="relative z-10 flex items-center gap-2 text-black group-hover:text-white">
              <LogIn className="h-5 w-5" />
              Login
              <motion.div
                className="absolute inset-0 z-0 bg-[#66FFFF]/20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 2 }}
                transition={{ duration: 0.5 }}
              />
            </span>
          </Button>

          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-[#66FFFF] px-8 py-6 text-lg font-semibold transition-transform hover:scale-105 hover:shadow-lg hover:shadow-[#66FFFF]/20"
            onClick={() => navigate("/auth/signup")}
          >
            <span className="relative z-10 flex items-center gap-2 text-black group-hover:text-white">
              <UserPlus className="h-5 w-5" />
              Sign Up
              <motion.div
                className="absolute inset-0 z-0 bg-[#66FFFF]/20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 2 }}
                transition={{ duration: 0.5 }}
              />
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
