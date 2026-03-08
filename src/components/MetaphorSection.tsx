import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ConfettiHeart {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
  opacity: number;
}

// ─── Palette ──────────────────────────────────────────────────────────────────
const BLUE      = "#1a6fb5";
const BLUE_LIGHT = "#4a9fd4";
const BLUE_PALE  = "#b8d4f0";
const BLUE_DEEP  = "#0e3d6b";
const BLUE_MID   = "#2e6b9e";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const SunIcon = ({ color = BLUE_LIGHT, size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="5"  />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="19.78" y1="4.22"  x2="17.66" y2="6.34"  />
    <line x1="6.34"  y1="17.66" x2="4.22"  y2="19.78" />
  </svg>
);

const StarfishIcon = ({ color = BLUE_PALE, size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="0.5">
    <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" opacity="0.9" />
  </svg>
);

const CuscuzIcon = ({ color = BLUE_MID, size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M8 28 L12 10 L24 10 L28 28 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
    {[14, 18, 22, 12, 16, 20, 24].map((x, i) => (
      <circle key={i} cx={x} cy={13 + (i % 3) * 3} r="1.2" fill={color} opacity="0.6" />
    ))}
    <path d="M15 9 Q14 6 15 3" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <path d="M18 9 Q17 5 18 2" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <path d="M21 9 Q20 6 21 3" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <rect x="6" y="28" width="24" height="3" rx="1.5" fill={color} opacity="0.4" />
  </svg>
);

const HeartSmallIcon = ({ color = BLUE, size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

// ─── Ambient floating icon ────────────────────────────────────────────────────
interface AmbientIconProps {
  children: React.ReactNode;
  top?: string; bottom?: string; left?: string; right?: string;
  floatDuration: number;
  delay: number;
  opacity: number;
  size?: number;
}

const AmbientIcon = ({ children, top, bottom, left, right, floatDuration, delay, opacity, size = 40 }: AmbientIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px" });
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", top, bottom, left, right, width: size, height: size, pointerEvents: "none", zIndex: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? {
        opacity,
        scale: 1,
        y: ["0px", `-${10 + floatDuration}px`, "4px", "0px"],
        rotate: [-3, 3, -2, 0],
      } : { opacity: 0 }}
      transition={{
        opacity: { duration: 1, delay },
        scale:   { duration: 0.8, delay },
        y:       { duration: floatDuration, delay, repeat: Infinity, ease: "easeInOut" },
        rotate:  { duration: floatDuration * 1.2, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Split Row: Text LEFT · Photo RIGHT ──────────────────────────────────────
interface SplitRowProps {
  eyebrow: string;
  headline: string;
  body: string;
  icon: React.ReactNode;
  photoUrl: string;
  photoAlt?: string;
  rowIndex?: number;
}

const SplitRow = ({ eyebrow, headline, body, icon, photoUrl, photoAlt = "", rowIndex = 0 }: SplitRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 5vw, 5rem)",
        alignItems: "center",
        width: "100%",
        maxWidth: 1000,
      }}
    >
      {/* ── LEFT: Text ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {/* Icon bubble */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${BLUE_PALE}55, ${BLUE_PALE}22)`,
            border: `1.5px solid ${BLUE_PALE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </motion.div>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.66rem",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: BLUE_MID,
          opacity: 0.7,
          margin: 0,
          fontWeight: 300,
        }}>
          {eyebrow}
        </p>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.45rem, 3.5vw, 2.1rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: BLUE_DEEP,
          lineHeight: 1.25,
          margin: 0,
          letterSpacing: "0.01em",
        }}>
          {headline}
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
          color: "#4a5568",
          lineHeight: 1.85,
          margin: 0,
          fontWeight: 300,
          fontStyle: "italic",
        }}>
          {body}
        </p>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
          style={{
            width: 48,
            height: 1,
            background: `linear-gradient(90deg, ${BLUE}88, ${BLUE_LIGHT}44, transparent)`,
            transformOrigin: "left",
          }}
        />
      </motion.div>

      {/* ── RIGHT: Photo ── */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.96 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={photoUrl}
          alt={photoAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            borderRadius: "6px",
            filter: "drop-shadow(0 8px 32px rgba(14,61,107,0.13)) drop-shadow(0 2px 8px rgba(14,61,107,0.08))",
          }}
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 10 + rowIndex * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft blue tint overlay — ties photo into palette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, ${BLUE_PALE}08 0%, transparent 60%, ${BLUE_DEEP}12 100%)`,
          pointerEvents: "none",
          borderRadius: "6px",
        }} />
      </motion.div>
    </div>
  );
};

// ─── Confetti Engine ──────────────────────────────────────────────────────────
const CONFETTI_COLORS = [BLUE, BLUE_LIGHT, BLUE_PALE, BLUE_DEEP, BLUE_MID, "#7ab8e0", "#d6e8f8", "#9ecae1"];

function useConfetti() {
  const [particles, setParticles] = useState<ConfettiHeart[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<ConfettiHeart[]>([]);

  const launch = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const origin = { x: window.innerWidth / 2, y: window.innerHeight * 0.85 };

    const newParticles: ConfettiHeart[] = Array.from({ length: 70 }, (_, i) => ({
      id: Date.now() + i,
      x: origin.x + (Math.random() - 0.5) * 160,
      y: origin.y,
      vx: (Math.random() - 0.5) * 10,
      vy: -(Math.random() * 16 + 8),
      size: 10 + Math.random() * 14,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 14,
      opacity: 1,
    }));

    particlesRef.current = newParticles;
    setParticles([...newParticles]);

    let startTime: number | null = null;
    const duration = 2800;

    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);

      particlesRef.current = particlesRef.current.map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vx: p.vx * 0.98,
        vy: p.vy + 0.52,
        rotation: p.rotation + p.vr,
        opacity: Math.max(0, 1 - progress * 1.15),
      }));

      setParticles([...particlesRef.current]);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setParticles([]);
      }
    };

    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  return { particles, launch };
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface MetaphorSectionProps {
  photoUrl?: string;
}

const MetaphorSection = ({ photoUrl = "public/ChatGPT Image 7 de mar. de 2026, 16_24_27.png" }: MetaphorSectionProps) => {
  const { particles, launch } = useConfetti();
  const [buttonPulse, setButtonPulse] = useState(false);

  const handleLoveClick = () => {
    launch();
    setButtonPulse(true);
    setTimeout(() => setButtonPulse(false), 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes lovePulse {
          0%   { transform: scale(1);    box-shadow: 0 4px 24px rgba(26,111,181,0.25); }
          50%  { transform: scale(1.07); box-shadow: 0 8px 36px rgba(26,111,181,0.50); }
          100% { transform: scale(1);    box-shadow: 0 4px 24px rgba(26,111,181,0.25); }
        }
        .love-btn-pulse { animation: lovePulse 0.5s ease-out; }

        /* Mobile: stack vertically */
        @media (max-width: 640px) {
          .split-row-grid {
            grid-template-columns: 1fr !important;
          }
          .split-row-photo {
            aspect-ratio: 3 / 4 !important;
          }
        }
      `}</style>

      {/* ── Confetti overlay ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: `rotate(${p.rotation}deg)`,
              opacity: p.opacity,
              pointerEvents: "none",
            }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
        ))}
      </div>

      <section
        id="metaphor"
        style={{
          position: "relative",
          width: "100%",
          background: "#FFFFFF",
          overflow: "hidden",
          paddingBottom: "120px",
        }}
      >
        {/* Top divider */}
        <div style={{
          width: "100%", height: "1px",
          background: `linear-gradient(90deg, transparent, ${BLUE_PALE}, transparent)`,
        }} />

        {/* ── Ambient icons ── */}
        <AmbientIcon top="5%"  left="1%"  floatDuration={5.5} delay={0.5} opacity={0.15} size={50}><SunIcon color={BLUE_LIGHT} size={50} /></AmbientIcon>
        <AmbientIcon top="30%" right="1%" floatDuration={6.2} delay={1.0} opacity={0.13} size={46}><StarfishIcon color={BLUE_PALE} size={46} /></AmbientIcon>
        <AmbientIcon bottom="30%" left="1%" floatDuration={7.0} delay={1.8} opacity={0.12} size={42}><CuscuzIcon color={BLUE_MID} size={42} /></AmbientIcon>
        <AmbientIcon top="58%" right="2%" floatDuration={5.0} delay={0.8} opacity={0.10} size={34}><SunIcon color={BLUE_PALE} size={34} /></AmbientIcon>
        <AmbientIcon bottom="8%" right="3%" floatDuration={6.8} delay={2.2} opacity={0.11} size={38}><StarfishIcon color={BLUE_LIGHT} size={38} /></AmbientIcon>

        {/* Radial atmosphere */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${BLUE_PALE}12 0%, transparent 70%)`,
        }} />

        {/* ── Rows ── */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(5rem, 12vh, 9rem)",
          padding: "clamp(4rem, 10vh, 7rem) clamp(1.5rem, 8vw, 6rem) 0",
        }}>

          {/* Row 1 — Praia */}
          <SplitRow
            rowIndex={0}
            eyebrow="A mais linda do mundo"
            headline="Jullia"
            body="Neste Dia das Mulheres, exalto quem você é, mas principalmente a forma como você torna o meu mundo muito mais bonito de se viver. Feliz dia das mulheres!"
            icon={<SunIcon color={BLUE} size={22} />}
            photoUrl="public/WhatsApp Image 2026-03-07 at 17.35.42(1).jpeg"
            photoAlt="Julia na praia"
          />
        </div>

        {/* Bottom wave */}
        <div style={{ marginTop: "clamp(5rem, 10vh, 8rem)", position: "relative", zIndex: 2 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 40, display: "block" }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={`${BLUE_PALE}28`} />
          </svg>
        </div>
      </section>

      {/* ── Fixed I Love You button ── */}
      <div style={{
        position: "fixed",
        bottom: "clamp(1.2rem, 4vh, 2rem)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}>
        <motion.button
          onClick={handleLoveClick}
          className={buttonPulse ? "love-btn-pulse" : ""}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.75rem 2rem",
            borderRadius: "100px",
            border: `1.5px solid ${BLUE}33`,
            background: `linear-gradient(135deg, ${BLUE_DEEP} 0%, ${BLUE} 60%, ${BLUE_MID} 100%)`,
            color: "#ffffff",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 400,
            cursor: "pointer",
            boxShadow: `0 4px 24px ${BLUE}40, 0 1px 4px ${BLUE}30`,
            outline: "none",
            whiteSpace: "nowrap",
          }}
        >
          <HeartSmallIcon color="#fff" size={15} />
          I Love You
          <HeartSmallIcon color="#fff" size={15} />
        </motion.button>
      </div>
    </>
  );
};

export default MetaphorSection;