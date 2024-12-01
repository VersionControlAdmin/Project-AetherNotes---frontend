import { LockIcon } from "lucide-react";
import { motion } from "framer-motion";

export function LoggedInHeaderSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-[200px] flex-col items-center justify-center px-4 text-center"
    >
      <div className="max-w-4xl space-y-4 flex flex-col items-center pt-32 pb-12">
        <motion.h1
          className="text-3xl text-white font-bold tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <span className="relative group hover:bg-gradient-to-r hover:from-blue-500 hover:via-teal-500 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
              Your Private Workspace
            </span>
          </div>
        </motion.h1>

        <motion.div
          className="space-y-1 text-white text-base text-muted-foreground sm:text-lg pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="flex items-center justify-center gap-2">
            <LockIcon className="h-4 w-4 text-[#66FFFF]" />
            Your notes are NOT end-to-end encrypted but accessible only by you
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
