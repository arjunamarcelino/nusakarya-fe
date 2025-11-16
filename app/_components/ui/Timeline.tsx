"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Triangle } from "../Icons";
import { useMediaQuery } from "../../_hooks/useMediaQuery";

interface TimelineEntry {
  title: string;
  color: string;
  id: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const [activeSection, setActiveSection] = useState("hikari-finance");
  const [mounted, setMounted] = useState(false);

  const isMobile = !useMediaQuery("only screen and (min-width : 768px)");

  const sections = data.map((item) => item.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile || !mounted) return;

    const handleScroll = () => {
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            if (id !== activeSection) {
              setActiveSection(id);
              console.log(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, isMobile, activeSection, mounted]);

  if (!mounted || isMobile) {
    return null;
  }

  return (
    <Tags item={data.find((item) => item.id === activeSection) || data[0]} />
  );
};

const Tags = ({ item }: { item: TimelineEntry }) => {
  return (
    <div className="fixed left-0 h-screen flex flex-col justify-center items-center z-50 pointer-events-none">
      <div className="flex items-center gap-3 z-40 pointer-events-auto">
        <Triangle color={item.color} />
        <div>
          <motion.h3
            className="text-sm font-OnestMedium"
            animate={{ color: item.color }}
            transition={{ duration: 0.3 }}
          >
            {item.title}
          </motion.h3>
        </div>
      </div>
    </div>
  );
};
