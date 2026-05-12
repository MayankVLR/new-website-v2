"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Card art images — replace src with your actual paths in /public ──────────
const CARD_IMAGES = [
  { src: "/img/EXP/1.png", alt: "Experience card 1" },
  { src: "/img/EXP/2.png", alt: "Experience card 2" },
  { src: "/img/EXP/3.png", alt: "Experience card 3" },
];

interface ExperienceEntry {
  logo: string;
  company: string;
  role: string;
  type: string;
  details: string[];
}

const experiences: ExperienceEntry[] = [
  {
    logo: "V",
    company: "Vected Technologies Pvt. Ltd.",
    role: "Video Editor & Content Strategist",
    type: "Full-time",
    details: [
      "Edited educational and promotional videos for course and brand content",
      "Wrote scripts that improved narrative flow and viewer retention",
      "Developed and executed multi-platform content strategies"
    ],
  },
  {
    logo: "B",
    company: "Boba Bhai (Shark Tank India)",
    role: "Video Editor",
    type: "Project",
    details: [
      "Produced advertising content for a nationally recognised D2C brand",
      "Delivered social media campaigns that grew audience engagement"
    ],
  },
];

interface CardProps {
  index: number;
  showTapNote?: boolean;
}

const PolaroidCard = ({ index, showTapNote }: CardProps) => {
  const [flipped, setFlipped] = useState(false);
  const backData = [
    { icon: "👁️", title: "Motion", desc: "Bringing ideas to life through movement, energy, and design" },
    { icon: "🪄", title: "Editing", desc: "Crafting clean, engaging visuals that keep every second impactful" },
    { icon: "✨", title: "Storytelling", desc: "Turning simple ideas into meaningful stories that connect with people" }
  ];
  const back = backData[index];
  const img = CARD_IMAGES[index];
  const rotation = [-4, 2, 6][index] || 0;

  return (
    <div
      className="polaroid-wrap"
      style={{ "--rot": `${rotation}deg` } as React.CSSProperties}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="aspect" />
      <div className="polaroid-scene">
        <div className={`polaroid-flipper${flipped ? " flipped" : ""}`}>
          {/* Front */}
          <div className="polaroid-face polaroid-front">
            <div className="polaroid-shell">
              <div className="polaroid-img">
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 600px) 100vw, 300px" />
              </div>
              {showTapNote && !flipped && <div className="tap-note">tap to flip!</div>}
            </div>
          </div>
          {/* Back */}
          <div className="polaroid-face polaroid-back-face">
            <div className="polaroid-back-shell">
              <div className="back-inner">
                <div className="back-ico">{back.icon}</div>
                <p className="back-h">{back.title}</p>
                <p className="back-p">{back.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogoBadge = ({ letter, color }: { letter: string; color: string }) => (
  <div
    style={{
      width: 44,
      height: 44,
      borderRadius: 8,
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 18,
      color: "white",
      flexShrink: 0,
      fontFamily: "'Georgia', serif",
    }}
  >
    {letter}
  </div>
);

export default function ExperienceSection() {
  return (
    <>
      <style>{`
        .experience-section{background:#E5E7EB;min-height:100vh;padding:40px 32px 60px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;position:relative;overflow:hidden}
        .experience-inner{max-width:1000px;margin:0 auto;}
        .heading-row{display:flex;align-items:center;gap:10px;margin-bottom:4px}
        .pick-label{font-size:14px;font-weight:700;color:#3DAD8A;letter-spacing:.02em}
        .watermark{font-size:clamp(52px,9vw,96px);font-weight:900;color:#1E4ED8;letter-spacing:.12em;text-transform:uppercase;line-height:1;margin-bottom:28px;user-select:none;font-family:'Arial Black','Helvetica Neue',sans-serif}
        .polaroids-row{display:flex;gap:32px;margin-bottom:60px;flex-wrap:wrap;justify-content:center;padding:20px 0}
        .polaroid-wrap{position:relative;flex:1;min-width:200px;max-width:280px;cursor:pointer;transform:rotate(var(--rot));transition:transform .4s cubic-bezier(.34,1.56,.64,1);z-index:1}
        .polaroid-wrap:hover{transform:translateY(-12px) rotate(0deg) scale(1.02);z-index:10}
        .aspect{padding-top:122%}
        .polaroid-scene{position:absolute;inset:0;perspective:1000px}
        .polaroid-flipper{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.45,.05,.55,.95)}
        .polaroid-flipper.flipped{transform:rotateY(180deg)}
        .polaroid-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
        .polaroid-back-face{transform:rotateY(180deg)}
        .polaroid-shell{width:100%;height:100%;box-sizing:border-box;background:#F9F9F9;border-radius:2px;box-shadow:0 8px 24px rgba(0,0,0,.15), inset 0 0 0 1px rgba(0,0,0,.05);padding:14px 14px 64px 14px;display:flex;flex-direction:column;position:relative}
        .polaroid-img{position:relative;width:100%;flex:1;background:#EBEBEB;overflow:hidden;box-shadow:inset 0 2px 6px rgba(0,0,0,.1)}
        .polaroid-back-shell{width:100%;height:100%;box-sizing:border-box;background:#333;border-radius:2px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.15)}
        .back-inner{text-align:center;padding:20px}
        .back-ico{font-size:40px;margin-bottom:12px}
        .back-h{font-size:20px;font-weight:800;color:#FFF;margin:0 0 8px}
        .back-p{font-size:14px;color:#BBB;margin:0;line-height:1.5}
        .tap-note{position:absolute;bottom:20px;left:50%;transform:translateX(-50%) rotate(-4deg);font-size:16px;font-weight:700;color:#333;font-family:'Comic Sans MS','Chalkboard SE',cursive;white-space:nowrap;line-height:1;pointer-events:none;opacity:0.8}
        .exp-list{display:flex;flex-direction:column;gap:14px}
        .exp-card{background:white;border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:12px;box-shadow:0 1px 4px rgba(0,0,0,.08)}
        .exp-header{display:flex;align-items:flex-start;gap:12px}
        .exp-info{flex:1;min-width:0}
        .exp-institution{font-size:15px;font-weight:700;color:#111;margin:0}
        .exp-degree{font-size:13px;color:#666;margin:2px 0 0}
        .exp-type{font-size:12px;color:#999;font-weight:500;margin:0}
        .exp-details{font-size:13px;color:#666;line-height:1.6;margin:0;padding-left:24px}
        .exp-details li{margin:4px 0}
        @media(max-width:600px){.polaroid-wrap{min-width:140px}.exp-header{flex-direction:column;align-items:flex-start;gap:12px}}
      `}</style>
      <section className="experience-section">
        <div className="experience-inner">
          <div className="heading-row">
            <span className="pick-label">Pick a card</span>
            <svg width="56" height="12" viewBox="0 0 56 12" fill="none">
              <line x1="0" y1="6" x2="46" y2="6" stroke="#3DAD8A" strokeWidth="2" />
              <polyline points="40,1 50,6 40,11" fill="none" stroke="#3DAD8A" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="watermark">EXPERIENCE</div>
          <div className="polaroids-row">
            {[0, 1, 2].map((i) => (
              <PolaroidCard key={i} index={i} showTapNote />
            ))}
          </div>
          <div className="exp-list">
            {experiences.map((exp, i) => (
              <div className="exp-card" key={i}>
                <div className="exp-header">
                  <LogoBadge letter={exp.logo} color="#F97316" />
                  <div className="exp-info">
                    <p className="exp-institution">{exp.company}</p>
                    <p className="exp-degree">{exp.role}</p>
                    <p className="exp-type">{exp.type}</p>
                  </div>
                </div>
                <ul className="exp-details">
                  {exp.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
