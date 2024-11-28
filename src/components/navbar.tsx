"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AetherNotesLogo from "../assets/AetherNotes-logo.png";

export function Navbar() {
  const [selected, setSelected] = React.useState("public");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-transparent backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 ">
            <img
              src={AetherNotesLogo}
              alt="AetherNotes Logo"
              className="h-12 w-auto transition-all duration-300 hover:brightness-125 hover:scale-105"
            />
          </Link>

          {/* Toggle Group */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <ToggleGroup
              type="single"
              value={selected}
              onValueChange={(value) => value && setSelected(value)}
              className="bg-muted p-1 rounded-full"
            >
              <ToggleGroupItem
                value="public"
                aria-label="Toggle public notes"
                className="relative px-6 data-[state=on]:bg-background data-[state=on]:text-foreground rounded-full transition-all duration-200"
              >
                {selected === "public" && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-background rounded-full"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-medium">Public Notes</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="private"
                aria-label="Toggle private notes"
                className="relative px-6 data-[state=on]:bg-background data-[state=on]:text-foreground rounded-full transition-all duration-200"
              >
                {selected === "private" && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-background rounded-full"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-medium">Private Notes</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 pr-4">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors text-white"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 transition-all duration-200 hover:shadow-md"
              asChild
            >
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
