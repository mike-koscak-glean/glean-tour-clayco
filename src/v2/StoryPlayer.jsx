import React, { useCallback, useEffect, useState } from "react";
import claycoLogo from "../clayco_logo.png";
import { stories } from "../data/stories";
import { GleanLogo, StoryCtx, Avatar, Logo } from "./ui";
import SceneBrief from "./SceneBrief";
import ExecStory from "./stories/ExecStory";
import FieldStory from "./stories/FieldStory";
import DataStory from "./stories/DataStory";
import SecurityStory from "./stories/SecurityStory";

/* "**word**" in a caption becomes a highlighted pop */
function renderPop(text) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <mark key={i} className="pop">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

const VIEWS = { exec: ExecStory, field: FieldStory, data: DataStory, security: SecurityStory };

function IconBtn({ children, onClick, title, disabled }) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition"
    >
      {children}
    </button>
  );
}

export default function StoryPlayer({ storyIdx, playing, setPlaying, onHome, onOpen, onFinishStory, clean }) {
  const story = stories[storyIdx];
  const View = VIEWS[story.id];
  const [step, setStep] = useState(0);
  const [briefOpen, setBriefOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const last = story.steps.length - 1;
  const cur = story.steps[step];
  const nextStory = stories[storyIdx + 1];

  const next = useCallback(() => {
    if (step < last) setStep((s) => s + 1);
    else onFinishStory();
  }, [step, last, onFinishStory]);

  const prev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const startScene = useCallback(() => {
    setBriefOpen(false);
    setStarted(true);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!playing || briefOpen || !started) return;
    const t = setTimeout(next, cur.ms);
    return () => clearTimeout(t);
  }, [playing, step, next, cur.ms, briefOpen, started]);

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (briefOpen) {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          startScene();
        }
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        onHome();
      } else if (e.key.toLowerCase() === "p") {
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev, onHome, setPlaying, briefOpen, startScene]);

  const caption = !started
    ? story.person
      ? `Meet **${story.name.split(" ")[0]}**.`
      : "Meet **security**."
    : cur.outcome
    ? nextStory
      ? `Up next: ${nextStory.role}. "${nextStory.question}"`
      : "Up next: what this could look like at Clayco."
    : cur.caption;

  const ctaLabel = step < last ? cur.cta : nextStory ? `Next scene: ${nextStory.role}` : "See what's next";

  return (
    <StoryCtx.Provider value={{ cta: ctaLabel, onNext: next, show: started && !briefOpen && !playing && !clean }}>
    <div className="h-screen w-screen flex flex-col bg-[#FAF8F4] overflow-hidden">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-5 sm:px-7 flex-shrink-0">
        <button onClick={onHome} className="flex items-center gap-3" title="All stories">
          <GleanLogo size={22} />
          <span className="text-gray-300">×</span>
          <img src={claycoLogo} alt="Clayco" className="h-[18px] mix-blend-multiply" draggable="false" />
        </button>
        <div className="hidden md:flex items-center gap-3 bg-white border border-[#E9E5DE] rounded-full pl-1.5 pr-1.5 py-1 text-[12.5px]">
          <span className="flex items-center gap-1 pl-1">
            {stories.map((st, i) => (
              <span key={st.id} className={`h-1.5 rounded-full transition-all ${i === storyIdx ? "w-5 bg-[#343CED]" : i < storyIdx ? "w-1.5 bg-[#343CED]/50" : "w-1.5 bg-gray-300"}`} />
            ))}
          </span>
          <span className="font-semibold text-gray-800">
            Scene {storyIdx + 1} of {stories.length}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5 text-gray-700">
            {story.person && <Avatar person={story.person} size={18} />}
            {story.name}, {story.role}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <Logo id={story.whereLogo} size={13} /> {story.where}
          </span>
          <button
            onClick={() => setBriefOpen(true)}
            className="ml-1 flex items-center gap-1.5 rounded-full bg-[#F2F3FF] text-[#343CED] font-semibold px-3 py-1 hover:bg-[#E7E8FD] transition"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="8" x2="12" y2="8" /></svg>
            Scene brief
          </button>
        </div>
        <button onClick={onHome} className="text-[12.5px] text-gray-500 hover:text-gray-800">
          Exit tour
        </button>
      </div>

      {/* Stage */}
      <div className="flex-1 min-h-0 px-4 sm:px-7">
        <div className="h-full max-w-[1240px] mx-auto">
          <View step={started ? step : -1} onNext={next} />
        </div>
      </div>

      {/* Caption bar */}
      <div className="flex-shrink-0 px-4 sm:px-7 pt-3 pb-4">
        <div className="max-w-[1240px] mx-auto flex items-center gap-5 bg-white border border-[#E9E5DE] rounded-2xl px-5 py-3.5 shadow-sm">
          <div className="hidden lg:block w-[210px] flex-shrink-0">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Scene {storyIdx + 1} of {stories.length} · {story.role}
            </div>
            <div className="text-[13px] text-gray-700 font-medium truncate">{story.title}</div>
            <div className="flex gap-1 mt-2">
              {story.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#343CED]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div key={`${storyIdx}-${step}`} className={`caption-in text-[18px] sm:text-[21px] font-semibold leading-snug ${cur.outcome ? "text-gray-500" : "text-[#14152B]"}`}>
              {renderPop(caption)}
            </div>
          </div>

          {!clean && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <IconBtn onClick={prev} title="Back (←)" disabled={step === 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </IconBtn>
              <IconBtn onClick={() => setPlaying((p) => !p)} title={playing ? "Pause (P)" : "Autoplay (P)"}>
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4l13 8-13 8z" />
                  </svg>
                )}
              </IconBtn>
              <button
                onClick={next}
                className={`h-10 rounded-full bg-[#343CED] hover:bg-[#2A31C9] text-white text-[14px] font-medium px-5 flex items-center gap-2 transition ${
                  ""
                }`}
              >
                {step < last ? "Next" : nextStory ? "Next scene" : "What's next"}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      {briefOpen && <SceneBrief idx={storyIdx} onStart={startScene} autoplay={playing} resumed={started} />}
    </div>
    </StoryCtx.Provider>
  );
}
