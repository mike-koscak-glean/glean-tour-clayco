import React from "react";
import claycoLogo from "../clayco_logo.png";
import { stories } from "../data/stories";
import { GleanLogo, Logo, Avatar, LogoStack, CTX } from "./ui";

function StoryCard({ s, i, onOpen }) {
  return (
    <button
      onClick={() => onOpen(i)}
      className="group text-left bg-white border border-[#E9E5DE] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(30,30,80,0.35)] hover:border-[#343CED]/40 transition-all duration-200 flex flex-col fade-in-up"
      style={{ animationDelay: `${i * 90 + 250}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-4 relative w-full">
        <span className="absolute right-0 top-0 text-[12px] font-bold text-gray-300">0{i + 1}</span>
        {s.person ? (
          <Avatar person={s.person} size={34} />
        ) : (
          <span className="w-[34px] h-[34px] rounded-full bg-[#0E1030] text-[#D8FD49] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
            </svg>
          </span>
        )}
        <div className="leading-tight">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{s.role}</div>
          <div className="text-[13px] text-gray-600">{s.personLabel || (s.person && { maria: "Maria Chen", luis: "Luis Romero", kim: "Kim Alvarez" }[s.person])}</div>
        </div>
      </div>
      <div className="text-[18px] font-semibold text-[#14152B] leading-snug mb-5 flex-1">"{s.question}"</div>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="text-[12.5px] text-gray-600 leading-snug">{s.how}</div>
          <LogoStack ids={s.howLogos} />
        </div>
        <div className="flex items-center justify-between text-[13.5px] font-semibold text-[#343CED] bg-[#F2F3FF] group-hover:bg-[#343CED] group-hover:text-white rounded-xl px-3.5 py-2.5 transition-colors">
          <span>{i === 0 ? "Start here" : "Start this story"}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </button>
  );
}

export default function Landing({ onOpen, onPlayAll }) {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F4] overflow-y-auto">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-10 py-7 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between fade-in">
          <div className="flex items-center gap-3">
            <GleanLogo size={30} />
            <span className="text-gray-300 text-lg">×</span>
            <img src={claycoLogo} alt="Clayco" className="h-6 mix-blend-multiply" draggable="false" />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-gray-500">
            <Logo id="snowflake" size={14} />
            2026 AMER Snowflake Product Innovation Partner of the Year
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mt-10 sm:mt-12 mb-10">
          <h1 className="text-[34px] sm:text-[46px] font-semibold tracking-tight text-[#14152B] leading-[1.08] max-w-[880px] mx-auto fade-in-up">
            Clayco builds the foundation that powers AI for the world.
          </h1>
          <p className="text-[20px] sm:text-[26px] text-gray-500 mt-3 font-medium fade-in-up" style={{ animationDelay: "120ms" }}>
            Snowflake + Glean can be the foundation that powers AI for Clayco.
          </p>

          <div className="flex flex-col items-center gap-3 mt-8 fade-in-up" style={{ animationDelay: "180ms" }}>
            <button
              onClick={() => onOpen(0)}
              className="next-pulse flex items-center gap-3 bg-[#343CED] hover:bg-[#2A31C9] text-white text-[17px] font-semibold rounded-full pl-7 pr-5 py-4 shadow-[0_14px_36px_-10px_rgba(52,60,237,0.65)] transition-colors"
            >
              Start the tour
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>
            <div className="text-[13px] text-gray-500">
              4 short stories, about 3 minutes ·{" "}
              <button onClick={onPlayAll} className="text-[#343CED] font-medium hover:underline">
                or let it autoplay
              </button>
            </div>
          </div>

          {/* Equation */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 mt-10 fade-in-up" style={{ animationDelay: "220ms" }}>
            <div className="bg-white border border-[#BFE6F5] rounded-2xl px-5 py-4 text-left md:w-[270px]">
              <div className="flex items-center gap-2 mb-1">
                <Logo id="snowflake" size={18} />
                <span className="text-[14px] font-semibold" style={{ color: "#0B6E99" }}>
                  The numbers
                </span>
              </div>
              <div className="text-[13px] text-gray-600">Costs, pours, schedules, and forecasts your team engineered in Snowflake</div>
            </div>
            <div className="flex items-center justify-center text-[24px] text-gray-300 font-light">+</div>
            <div className="bg-white border border-[#D5D7FB] rounded-2xl px-5 py-4 text-left md:w-[270px]">
              <div className="flex items-center gap-2 mb-1">
                <Logo id="glean" size={18} />
                <span className="text-[14px] font-semibold" style={{ color: CTX }}>
                  The context
                </span>
              </div>
              <div className="text-[13px] text-gray-600">Teams, WebEx, email, documents, and tickets</div>
              <div className="flex gap-1.5 mt-2">
                {["teams", "webex", "outlook", "sharepoint", "autodesk", "servicenow"].map((id) => (
                  <Logo key={id} id={id} size={14} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center text-[24px] text-gray-300 font-light">=</div>
            <div className="bg-[#0E1030] rounded-2xl px-5 py-4 text-left md:w-[270px]">
              <div className="text-[14px] font-semibold text-[#D8FD49] mb-1">Answers that act</div>
              <div className="text-[13px] text-white/70">In Teams, in Snowflake, and wherever people work. Each person sees only what they should.</div>
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="mb-4">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-gray-400">Or jump to a story</div>
          <div className="text-[15px] text-gray-700">Four people at Clayco. One project. One question each.</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((s, i) => (
            <StoryCard key={s.id} s={s} i={i} onOpen={onOpen} />
          ))}
        </div>

        <div className="flex-1" />
        <p className="text-[11.5px] text-gray-400 text-center mt-12">
          Prepared for Clayco by the Glean team · An illustrative demo. Projects, people, and numbers are fictional.
        </p>
      </div>
    </div>
  );
}
