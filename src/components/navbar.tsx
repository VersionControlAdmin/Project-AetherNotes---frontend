"use client";

import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AetherNotesLogo from "../assets/AetherNotes-logo.png";
import { useAuth } from "@/components/auth/useAuth";
import { authService } from "@/components/auth/auth.service";

export function Navbar() {
  const location = useLocation();
  const [selected, setSelected] = React.useState(
    location.pathname === "/" ? "public" : "private"
  );
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, userEmail, logout } = useAuth();

  React.useEffect(() => {
    setSelected(location.pathname === "/" ? "public" : "private");
  }, [location.pathname]);

  const handleToggleChange = (value: string) => {
    if (value) {
      setSelected(value);
      if (value === "private") {
        navigate("/private-notes");
      } else {
        navigate("/");
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    logout();
    navigate("/");
  };

  const handleNavigation = (path: string, value: string) => {
    handleToggleChange(value);
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handleDrawerLogout = () => {
    handleLogout();
    setIsDrawerOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-transparent backdrop-blur-xl px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-2 order-2 lg:order-1"
          >
            <img
              src={AetherNotesLogo}
              alt="AetherNotes Logo"
              className="h-8 lg:h-12 w-auto transition-all duration-300 hover:brightness-125 hover:scale-105"
            />
          </Link>

          {/* Mobile Menu */}
          <div className="lg:hidden order-1">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] border-r border-white"
              >
                <SheetHeader className="border-b border-white pb-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation("/", "public")}
                  >
                    Public Notes
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() =>
                      handleNavigation("/private-notes", "private")
                    }
                  >
                    Private Notes
                  </Button>
                  {isAuthenticated ? (
                    <>
                      <div className="text-sm">
                        Account:{" "}
                        <span className="font-medium">{userEmail}</span>
                      </div>
                      <Button
                        variant="ghost"
                        className="justify-start text-red-600"
                        onClick={handleDrawerLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="justify-start w-full"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link
                        to="/auth/signup"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <Button className="justify-start bg-blue-600 text-white w-full">
                          Sign up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Toggle Group */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <ToggleGroup
              type="single"
              value={selected}
              onValueChange={handleToggleChange}
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

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4 pr-4 order-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-white text-sm">
                  Account: <span className="font-medium">{userEmail}</span>
                </span>
                <Button
                  variant="ghost"
                  className="text-white hover:text-red-400 transition-colors flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground transition-colors text-white hover:text-black"
                  asChild
                >
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 transition-all duration-200 hover:shadow-lg"
                  asChild
                >
                  <Link to="/auth/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
