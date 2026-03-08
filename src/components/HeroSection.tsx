import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PhotoHeartHeroProps {
  photoUrl?: string;
  name?: string;
  subtitle?: string;
}

type HeartVariant = "outline" | "fill";

interface HeartDef {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  variant: HeartVariant;
  strokeWidth?: number;
  floatDuration: number;
  floatY: number;
  floatX: number;
  initialDelay: number;
  opacity: number;
  rotation: number;
}

const HEARTS: HeartDef[] = [
  { id:  1, top: "6%",  left: "20%", size: 22, color: "#b8d4f0", variant: "outline", strokeWidth: 1.2, floatDuration: 5.2, floatY: 14, floatX: 5,  initialDelay: 0.0, opacity: 0.75, rotation: -12 },
  { id:  2, top: "9%",  left: "72%", size: 16, color: "#f2c4ce", variant: "fill",                      floatDuration: 4.6, floatY: 10, floatX: 4,  initialDelay: 0.4, opacity: 0.65, rotation:  18 },
  { id:  3, top: "3%",  left: "47%", size: 12, color: "#d6e8f8", variant: "fill",                      floatDuration: 6.0, floatY: 18, floatX: 6,  initialDelay: 0.9, opacity: 0.50, rotation:   5 },
  { id:  4, top: "14%", left: "84%", size: 28, color: "#f9d5db", variant: "outline", strokeWidth: 1.0, floatDuration: 5.8, floatY: 12, floatX: 3,  initialDelay: 0.2, opacity: 0.60, rotation: -8  },
  { id:  5, top: "36%", left: "4%",  size: 18, color: "#c8dcf2", variant: "fill",                      floatDuration: 5.0, floatY: 16, floatX: 7,  initialDelay: 0.6, opacity: 0.55, rotation:  22 },
  { id:  6, top: "42%", left: "89%", size: 24, color: "#f2c4ce", variant: "outline", strokeWidth: 1.4, floatDuration: 4.4, floatY: 20, floatX: 5,  initialDelay: 1.1, opacity: 0.70, rotation: -15 },
  { id:  7, top: "55%", left: "7%",  size: 14, color: "#f9d5db", variant: "fill",                      floatDuration: 6.2, floatY: 10, floatX: 4,  initialDelay: 0.3, opacity: 0.45, rotation:  10 },
  { id:  8, top: "60%", left: "87%", size: 13, color: "#b8d4f0", variant: "fill",                      floatDuration: 5.5, floatY: 14, floatX: 6,  initialDelay: 0.8, opacity: 0.50, rotation: -20 },
  { id:  9, top: "75%", left: "18%", size: 20, color: "#f2c4ce", variant: "outline", strokeWidth: 1.1, floatDuration: 4.8, floatY: 12, floatX: 5,  initialDelay: 0.5, opacity: 0.65, rotation:  14 },
  { id: 10, top: "78%", left: "76%", size: 17, color: "#c8dcf2", variant: "fill",                      floatDuration: 5.4, floatY: 16, floatX: 4,  initialDelay: 1.3, opacity: 0.55, rotation:  -6 },
  { id: 11, top: "88%", left: "42%", size: 11, color: "#f9d5db", variant: "fill",                      floatDuration: 6.4, floatY: 8,  floatX: 3,  initialDelay: 0.7, opacity: 0.40, rotation:  25 },
  { id: 12, top: "85%", left: "60%", size: 15, color: "#b8d4f0", variant: "outline", strokeWidth: 1.0, floatDuration: 5.0, floatY: 10, floatX: 5,  initialDelay: 1.0, opacity: 0.50, rotation: -18 },
  { id: 13, top: "22%", left: "12%", size: 10, color: "#f2c4ce", variant: "fill",                      floatDuration: 4.2, floatY: 20, floatX: 8,  initialDelay: 1.5, opacity: 0.40, rotation:   0 },
  { id: 14, top: "18%", left: "80%", size: 10, color: "#d6e8f8", variant: "fill",                      floatDuration: 5.6, floatY: 14, floatX: 6,  initialDelay: 0.1, opacity: 0.38, rotation:  30 },
];

const HeartSVG = ({
  size, color, variant, strokeWidth = 1.2, opacity, rotation,
}: Pick<HeartDef, "size" | "color" | "variant" | "strokeWidth" | "opacity" | "rotation">) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={variant === "fill" ? color : "none"}
    stroke={variant === "outline" ? color : "none"}
    strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ opacity, transform: `rotate(${rotation}deg)`, display: "block" }}
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const FloatingHeart = ({ h }: { h: HeartDef }) => (
  <motion.div
    aria-hidden="true"
    style={{ position: "absolute", top: h.top, left: h.left, zIndex: 2, pointerEvents: "none" }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{
      opacity: 1, scale: 1,
      y: [`0px`, `-${h.floatY}px`, `${h.floatY * 0.4}px`, `0px`],
      x: [`0px`, `${h.floatX}px`, `-${h.floatX * 0.6}px`, `0px`],
    }}
    transition={{
      opacity: { duration: 1.2, delay: h.initialDelay },
      scale:   { duration: 1.2, delay: h.initialDelay },
      y: { duration: h.floatDuration, delay: h.initialDelay, repeat: Infinity, ease: "easeInOut" },
      x: { duration: h.floatDuration * 1.15, delay: h.initialDelay, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <HeartSVG size={h.size} color={h.color} variant={h.variant} strokeWidth={h.strokeWidth} opacity={h.opacity} rotation={h.rotation} />
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PhotoHeartHero = ({
  photoUrl = "public/ChatGPT Image 7 de mar. de 2026, 16_24_27.png",
  name = "Te quiero",
  subtitle = "Feliz dia das mulheres",
}: PhotoHeartHeroProps) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Great+Vibes&display=swap');

        @keyframes subtitlePulse {
          0%, 100% { text-shadow: 0 2px 18px rgba(192,24,42,0.18), 0 1px 4px rgba(192,24,42,0.10); }
          50%       { text-shadow: 0 2px 28px rgba(192,24,42,0.35), 0 1px 8px rgba(192,24,42,0.20); }
        }
        .subtitle-pulse {
          animation: subtitlePulse 3.5s ease-in-out infinite;
        }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Faint radial blush */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 46%, rgba(242,196,206,0.15) 0%, rgba(184,212,240,0.08) 55%, transparent 100%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />

        {/* ── Floating Hearts ── */}
        {HEARTS.map((h) => <FloatingHeart key={h.id} h={h} />)}

        {/* ── Central Content ── */}
        <div
          style={{
            position: "relative", zIndex: 3,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "1.2rem",
          }}
        >

          {/* ── SUBTITLE — large handwritten red, prominent ── */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.90 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ textAlign: "center" }}
          >
            <p
              className="subtitle-pulse"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.4rem, 8.5vw, 4.2rem)",
                color: "#c0182a",
                fontWeight: 400,
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {subtitle}
            </p>

            {/* Red flourish underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
              style={{
                margin: "0.35rem auto 0",
                width: "clamp(100px, 22vw, 200px)",
                height: "1.5px",
                background: "linear-gradient(90deg, transparent, #c0182a88, #c0182a, #c0182a88, transparent)",
                transformOrigin: "center",
              }}
            />
          </motion.div>

          {/* ── Photo — clean float, no box/frame ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "relative",
              width: "clamp(200px, 40vw, 340px)",
              aspectRatio: "4 / 5",
            }}
          >
            <motion.img
              src={photoUrl}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                borderRadius: "2px",
                // Only image drop-shadow — no surrounding box
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.13)) drop-shadow(0 2px 8px rgba(0,0,0,0.07))",
              }}
              animate={{ scale: [1, 1.012, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* ── Name ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
          >
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                letterSpacing: "0.06em",
                fontWeight: 600,
                color: "#c0182a",
                lineHeight: 1,
                textShadow: "0 2px 12px rgba(192,24,42,0.15)",
                margin: 0,
              }}
            >
              {name}
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
              style={{
                width: 52,
                height: 1,
                background: "linear-gradient(90deg, transparent, #c0182a66, transparent)",
                transformOrigin: "center",
              }}
            />
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default PhotoHeartHero;