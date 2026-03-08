import { motion, useScroll, useTransform } from "framer-motion";
import { Sun } from "lucide-react";

const FloatingIcons = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.35]);

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sun */}
      <div className="absolute top-20 right-8 md:right-16 animate-float">
        <Sun className="w-8 h-8 text-gold/30" />
      </div>

      {/* Starfish (SVG) */}
      <div className="absolute top-1/3 left-6 md:left-12 animate-float-delay">
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-sand/20 fill-current">
          <path d="M32 2l6 20h20l-16 12 6 20-16-12-16 12 6-20L6 22h20z" />
        </svg>
      </div>

      {/* Cuscuz easter egg */}
      <div className="absolute bottom-1/4 right-10 md:right-20 animate-float-delay-2">
        <svg viewBox="0 0 48 48" className="w-9 h-9 text-gold/20 fill-current">
          <circle cx="24" cy="24" r="20" />
          <line x1="12" y1="16" x2="36" y2="16" stroke="hsl(220,50%,4%)" strokeWidth="1.5" />
          <line x1="12" y1="22" x2="36" y2="22" stroke="hsl(220,50%,4%)" strokeWidth="1.5" />
          <line x1="12" y1="28" x2="36" y2="28" stroke="hsl(220,50%,4%)" strokeWidth="1.5" />
          <line x1="12" y1="34" x2="36" y2="34" stroke="hsl(220,50%,4%)" strokeWidth="1.5" />
        </svg>
      </div>
    </motion.div>
  );
};

export default FloatingIcons;
