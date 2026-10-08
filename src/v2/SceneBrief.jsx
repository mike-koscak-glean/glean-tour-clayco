import React, { useEffect, useState } from "react";
import { stories, SCENARIO } from "../data/stories";
import { Avatar, Logo, NUM, CTX } from "./ui";

/* Between-scene modal: grounds the viewer in who, where, why, and what to watch for. */

function ShieldAvatar({ size = 44 }) {
  return (
    <span className="rounded-full bg-[#0E1030] text-[#D8FD49] flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      </svg>
    </span>
  );
}

function Tracker({ idx }) {
  return (
    <div className="flex items-center gap-1.5">
      {stories.map((s, i) => {
        const done = i < idx;
        const cur = i === idx;
        return (
          <React.Fragment key={s.id}>
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold whitespace-nowrap ${
                cur ? "bg-[#343CED] text-white" : done ? "bg-[#E7E8FD] text-[#343CED]" : "bg-gray-100 text-gray-400"
              }`}
            >
              <span>{done ? "✓" : i + 1}</span>
              <span className="hidden sm:inline">{s.role.replace(" / IT Security", "")}</span>
            </div>
            {i < stories.length - 1 && <span className={`h-px w-3 ${done ? "bg-[#343CED]/40" : "bg-gray-200"}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function SceneBrief({ idx, onStart, autoplay, resumed }) {
  const s = stories[idx];
  const first = idx === 0;
  const prev = stories[idx - 1];
  const [t, setT] = useState(0);

  // Autoplay: show a fill bar on the button, then continue on its own
  const AUTO_MS = first ? 9000 : 7000;
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
  }, [autoplay, AUTO_MS, onStart]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1030]/45 backdrop-blur-[3px] fade-in">
      <div className="w-full max-w-[640px] bg-white rounded-3xl shadow-[0_30px_80px_-20px_rgba(14,16,48,0.55)] overflow-hidden pop-in">
        {/* Exercise framing */}
        <div className="bg-[#F6F7FF] border-b border-[#E7E8FD] px-7 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#343CED]">
              {first ? "The exercise" : prev ? `✓ Scene ${idx} done: ${prev.recap}` : ""}
            </div>
          </div>
          {first && (
            <p className="text-[14.5px] text-[#14152B] leading-relaxed mb-3">
              Follow one Clayco project through four people's week. <b>{SCENARIO}</b> Each person needs something different, and each scene shows what Glean + Snowflake would do for them.
            </p>
          )}
          <Tracker idx={idx} />
        </div>

        {/* Scene */}
        <div className="px-7 pt-6 pb-6">
          <div className="text-[11.5px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Scene {idx + 1} of {stories.length}
          </div>
          <div className="flex items-center gap-3.5 mb-4">
            {s.person ? <Avatar person={s.person} size={46} /> : <ShieldAvatar size={46} />}
            <div className="min-w-0">
              <div className="text-[19px] font-semibold text-[#14152B] leading-tight">{s.name}</div>
              <div className="text-[13.5px] text-gray-500 flex items-center gap-2 mt-0.5">
                {s.role}
                <span className="text-gray-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Logo id={s.whereLogo} size={14} /> in {s.where}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[23px] font-semibold text-[#14152B] leading-snug mb-2">"{s.question}"</div>
          <p className="text-[14.5px] text-gray-600 leading-relaxed">{s.situation}</p>

          <div className="mt-5 rounded-2xl border border-gray-200 px-4 py-3.5">
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Watch for</div>
            <ul className="space-y-2">
              {s.watch.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-gray-800 fade-in-up" style={{ animationDelay: `${200 + i * 120}ms` }}>
                  <span className="mt-[3px] w-[18px] h-[18px] rounded-full bg-[#D8FD49] text-[#0E1030] text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="text-[12px] text-gray-500 leading-snug">
            {first ? (
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: NUM }} /> Snowflake numbers
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: CTX }} /> Conversations &amp; docs
                </span>
                <span>· Click the blue button to move forward</span>
              </span>
            ) : (
              "Click the blue button in each scene to move forward."
            )}
          </div>
          <button
            onClick={onStart}
            autoFocus
            className="relative overflow-hidden next-pulse flex items-center justify-center gap-2.5 bg-[#343CED] hover:bg-[#2A31C9] text-white text-[15px] font-semibold rounded-full pl-6 pr-4 py-3 flex-shrink-0 transition-colors"
          >
            {autoplay && <span className="absolute inset-y-0 left-0 bg-white/20" style={{ width: `${t * 100}%` }} />}
            <span className="relative">{resumed ? "Back to the scene" : `Start scene ${idx + 1}`}</span>
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
