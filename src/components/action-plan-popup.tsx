"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ClipboardCopy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionPlanPopupProps {
  isOpen: boolean;
  onClose: () => void;
  actionPlan: string | null;
}

export function ActionPlanPopup({
  isOpen,
  onClose,
  actionPlan,
}: ActionPlanPopupProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (actionPlan) {
      navigator.clipboard.writeText(actionPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
        >
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <h3 className="mb-4 text-lg font-semibold">
              Generated Action Plan
            </h3>
            <div className="max-h-[60vh] overflow-y-auto rounded-md bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm">{actionPlan}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="gap-2" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
