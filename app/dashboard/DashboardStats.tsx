// components/DashboardStats.tsx
"use client";

import { motion } from "framer-motion";

export default function DashboardStats({ books }: any[]) {
  const stats = {
    total: books.length,
    want: books.filter((b: any) => b.status === "WANT_TO_READ").length,
    reading: books.filter((b: any) => b.status === "READING").length,
    completed: books.filter((b: any) => b.status === "COMPLETED").length,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <Stat 
        label="Total Books" 
        value={stats.total} 
        icon="📚"
        color="from-stone-500 to-stone-700"
        delay={0}
      />
      <Stat 
        label="Want to Read" 
        value={stats.want} 
        icon="📖"
        color="from-amber-500 to-amber-700"
        delay={0.1}
      />
      <Stat 
        label="Reading" 
        value={stats.reading} 
        icon="📘"
        color="from-blue-500 to-blue-700"
        delay={0.2}
      />
      <Stat 
        label="Completed" 
        value={stats.completed} 
        icon="✅"
        color="from-green-500 to-green-700"
        delay={0.3}
      />
    </motion.div>
  );
}

function Stat({ label, value, icon, color, delay }: { 
  label: string; 
  value: number; 
  icon: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
    >
      {/* Decorative gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Icon with animation */}
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ delay, type: "spring" }}
        className="text-3xl mb-2"
      >
        {icon}
      </motion.div>
      
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      
      <motion.p 
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring" }}
        className="text-3xl font-bold text-gray-900 mt-1"
      >
        {value}
      </motion.p>
      
      {/* Decorative element */}
      <div className="absolute bottom-2 right-2 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
}