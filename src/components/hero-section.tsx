"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ironhackLogo from "../assets/IH-Logo.png";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center"
    >
      {/* Main Heading Group */}
      <div className="max-w-4xl space-y-4 flex flex-col items-center pt-12 pb-8 xl:pt-24 xl:pb-16">
        <motion.div
          className="space-y-1 text-white text-base text-muted-foreground
          sm:text-lg pt-4 pb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          MVP developed within 48 hours as part of
          <a
            href="https://ironhack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={ironhackLogo}
              alt="IronHack Logo"
              className="h-12 w-auto inline-block transition-transform duration-300 hover:scale-110"
            />
          </a>
        </motion.div>

        <motion.h1
          className="text-4xl text-white font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <span className="absolute blur-xl bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 opacity-0 transition-opacity duration-300 bg-clip-text text-transparent group-hover:opacity-100">
              The minimalist notetaking platform
            </span>
            <span className="relative group hover:bg-gradient-to-r hover:from-blue-500 hover:via-teal-500 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              The minimalist notetaking platform
            </span>
          </div>
          <div className="relative mt-2">
            <span className="block font-medium text-[#66FFFF] hover:[text-shadow:_0_0_25px_#66FFFF] transition-all duration-300">
              simple but smart.
            </span>
          </div>
        </motion.h1>

        {/* Subheading Group */}
        <motion.div
          className="space-y-1 text-white text-base text-muted-foreground sm:text-lg pt-4 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Capture your thoughts with ease and let AI do the heavy lifting.
          </p>
          <p>
            AetherNotes transforms your notes into concise, on-demand summaries.
          </p>
          <p>
            Stay organised, stay focused, and let simplicity fuel your
            productivity.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-[#66FFFF] px-8 py-6 text-lg font-semibold transition-transform hover:scale-105 hover:shadow-lg hover:shadow-[#66FFFF]/20"
            onClick={() => navigate("/auth/signup")}
          >
            <span className="relative z-10 flex items-center gap-2 text-black group-hover:text-white">
              <Sparkles className="h-5 w-5" />
              Sign up today
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
