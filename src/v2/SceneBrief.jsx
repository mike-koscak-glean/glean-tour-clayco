import React, { useEffect, useState } from "react";
import { stories } from "../data/stories";
import { Avatar, Logo } from "./ui";

/* Between-scene card. Built for a 3-second read: who, the question, today vs. with Glean. */

function ShieldAvatar({ size = 52 }) {
  return (
    <span className="rounded-full bg-[#0E1030] text-[#D8FD49] flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      </svg>
    </span>
  );
}

function Dots({ idx }) {
  return (
    <div className="flex items-center gap-1.5">
      {stories.map((s, i) => (
        <span
          key={s.id}
          className={`h-1.5 rounded-full transition-all ${i === idx ? "w-7 bg-[#343CED]" : i < idx ? "w-1.5 bg-[#343CED]/50" : "w-1.5 bg-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function SceneBrief({ idx, onStart, autoplay, resumed }) {
  const s = stories[idx];
  const first = idx === 0;
  const [t, setT] = useState(0);

  const AUTO_MS = 5000;
  useEffect(() => {
    if (!autoplay) return;
    const start = Date.now();
    const id = setInterval(() => {
      const p = (Date.now() - start) / AUTO_MS;
      setT(Math.min(p, 1));
      if (p >= 1) {
        clearInterval(id);
        onStart();
      }
    }, 50);
    return () => clearInterval(id);
  }, [autoplay, onStart]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1030]/50 backdrop-blur-[4px] fade-in">
      <div className="w-full max-w-[540px] bg-white rounded-3xl shadow-[0_30px_80px_-20px_rgba(14,16,48,0.6)] overflow-hidden pop-in">
        <div className="px-7 pt-6 pb-7">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#343CED]">
              {first ? "1 project · 4 people · 3 min" : `Scene ${idx + 1} of ${stories.length}`}
            </div>
            <Dots idx={idx} />
          </div>

          {/* Who */}
          <div className="flex items-center gap-3.5">
            {s.person ? <Avatar person={s.person} size={52} /> : <ShieldAvatar size={52} />}
            <div>
              <div className="text-[20px] font-semibold text-[#14152B] leading-tight">{s.person ? s.name : "Security"}</div>
              <div className="text-[13.5px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                {s.role} · <Logo id={s.whereLogo} size={13} /> {s.where}
              </div>
            </div>
          </div>

          {/* The ask */}
          <div className="text-[27px] font-semibold text-[#14152B] leading-[1.15] tracking-tight mt-5">"{s.question}"</div>

          {/* Today vs. with Glean */}
          <div className="grid grid-cols-2 gap-2.5 mt-6">
            <div className="rounded-2xl bg-gray-100 px-4 py-3.5 fade-in-up" style={{ animationDelay: "150ms" }}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Today</div>
              <div className="text-[15px] font-medium text-gray-500 leading-snug line-through decoration-gray-300">{s.before}</div>
            </div>
            <div className="rounded-2xl bg-[#0E1030] px-4 py-3.5 fade-in-up" style={{ animationDelay: "350ms" }}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#D8FD49] mb-1">With Glean</div>
              <div className="text-[15px] font-semibold text-white leading-snug">{s.after}</div>
            </div>
          </div>

          {/* Go */}
          <button
            onClick={onStart}
            autoFocus
            className="relative overflow-hidden next-pulse w-full mt-6 flex items-center justify-center gap-2.5 bg-[#343CED] hover:bg-[#2A31C9] text-white text-[16px] font-semibold rounded-full py-3.5 transition-colors"
          >
            {autoplay && <span className="absolute inset-y-0 left-0 bg-white/20" style={{ width: `${t * 100}%` }} />}
            <span className="relative">{resumed ? "Back to the scene" : "Show me"}</span>
            <span className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
