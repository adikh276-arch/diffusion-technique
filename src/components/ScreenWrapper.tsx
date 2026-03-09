import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScreenWrapperProps {
  children: ReactNode;
}

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto px-4"
    >
      {children}
    </motion.div>
  );
}
