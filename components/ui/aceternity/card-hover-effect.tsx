"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

interface HoverEffectProps {
  items: HoverItem[];
  className?: string;
}

export function HoverEffect({ items, className }: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const staggerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerVariants}
      className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px", className)}
    >
      {items.map((card, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative group p-px"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block bg-purple-500/10"
                layoutId="card-hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full border border-white/5 bg-[#0d0d18] p-6 flex flex-col gap-4 hover:border-purple-500/30 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                {card.icon}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-white font-semibold text-base">{card.title}</h3>
              <p className="text-white/50 text-sm leading-6">{card.description}</p>
            </div>
            {card.link && (
              <a
                href={card.link}
                className="text-purple-400 text-sm font-medium flex items-center gap-1 hover:text-purple-300 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
