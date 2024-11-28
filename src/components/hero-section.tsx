"use client";

import React from "react";
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
      <div className="max-w-4xl space-y-4 flex flex-col items-center">
        <motion.div
          className="space-y-1 text-white text-base text-muted-foreground
          sm:text-lg pt-4 pb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          MVP developed within 48 hours as part of
          <img
            src={ironhackLogo}
            alt="IronHack Logo"
            className="h-12 w-auto inline-block"
          />
        </motion.div>

        <motion.h1
          className="text-4xl text-white font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The minimalist notetaking platform
          <span
            className="mt-2 block font-medium text-[#66FFFF]"
            style={{ textShadow: "0 0 20px rgba(102, 255, 255, 0.3)" }}
          >
            simple but smart.
          </span>
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
            onClick={() => navigate("/signup")}
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
