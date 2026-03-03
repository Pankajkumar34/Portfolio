"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FloatingChat() {
  const router = useRouter();
  const [showText, setShowText] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      
      {/* Animated Text Bubble */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg text-sm font-medium"
        >
          Want to know about <br />
          <span className="font-bold text-indigo-600">
            Pankaj Kushwaha's Portfolio?
          </span>
        </motion.div>
      )}

      {/* Chat Icon Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        onClick={() => router.push("/chat")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl"
      >
        💬
      </motion.button>
    </div>
  );
}