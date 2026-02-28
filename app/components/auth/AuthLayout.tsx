// components/auth/AuthLayout.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthLayout({ 
  children, 
  title, 
  subtitle,
  alternateText,
  alternateLink,
  alternateHref 
}: { 
  children: React.ReactNode;
  title: string;
  subtitle: string;
  alternateText: string;
  alternateLink: string;
  alternateHref: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-amber-100/30 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated books in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -100,
              rotate: Math.random() * 20 - 10
            }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: Math.random() * 40 - 20
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-6xl opacity-10"
          >
            {["📕", "📗", "📘", "📙", "📚", "📖"][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Decorative book spines */}
        <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden md:block">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className={`w-8 h-16 rounded-r-lg shadow-lg bg-gradient-to-b ${
                  i % 3 === 0 ? 'from-amber-600 to-amber-800' :
                  i % 3 === 1 ? 'from-stone-600 to-stone-800' :
                  'from-emerald-600 to-emerald-800'
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Right side decorative books */}
        <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ x: -5 }}
                className={`w-8 h-16 rounded-l-lg shadow-lg bg-gradient-to-b ${
                  i % 3 === 0 ? 'from-amber-600 to-amber-800' :
                  i % 3 === 1 ? 'from-stone-600 to-stone-800' :
                  'from-emerald-600 to-emerald-800'
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Decorative header stripe */}
          <div className="h-2 bg-gradient-to-r from-amber-500 via-stone-500 to-emerald-500" />
          
          <div className="p-8 space-y-6">
            {/* Logo and title section */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-2"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-5xl inline-block"
              >
                📚
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 via-stone-700 to-emerald-700 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-stone-600">
                {subtitle}
              </p>
            </motion.div>

            {/* Children (form content) */}
            {children}

            {/* Alternate action */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-stone-600"
            >
              {alternateText}{" "}
              <Link 
                href={alternateHref}
                className="text-amber-700 font-semibold hover:text-amber-800 transition-colors relative group"
              >
                {alternateLink}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </motion.p>
          </div>
        </motion.div>

        {/* Floating bookmark decoration */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -top-4 -right-4 text-4xl transform rotate-12"
        >
          🔖
        </motion.div>
      </motion.div>
    </div>
  );
}