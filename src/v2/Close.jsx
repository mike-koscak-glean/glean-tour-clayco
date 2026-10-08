import React from "react";
import claycoLogo from "../clayco_logo.png";
import { stories } from "../data/stories";
import { GleanLogo, Logo } from "./ui";

const RECAP = {
  exec: "The numbers and the reasons, in one answer",
  field: "Work done in ServiceNow, from Teams",
  data: "Your Snowflake agents, now with context",
  security: "The right answer for each person",
};

const SCORECARD = ["Permission accuracy", "Answer quality", "Build effort", "Do people ask for more?"];

export default function Close({ onOpen, onHome }) {
  return (
    <div className="min-h-screen w-full bg-[#0E1030] text-white overflow-y-auto">
      <div className="max-w-[1080px] mx-auto px-6 sm:px-10 py-8 flex flex-col min-h-screen">
        <div className="flex items-center justify-between">
          <button onClick={onHome} className="flex items-center gap-3">
            <span className="bg-white rounded-lg px-2.5 py-1.5 flex items-center gap-2.5">
              <GleanLogo size={22} />
              <span className="text-gray-300">×</span>
              <img src={claycoLogo} alt="Clayco" className="h-[18px]" draggable="false" />
            </span>
          </button>
          <button onClick={onHome} className="text-[12.5px] text-white/50 hover:text-white">
            ↩ Back to the stories
          </button>
        </div>

        <div className="text-center mt-16">
          <h1 className="text-[32px] sm:text-[44px] font-semibold tracking-tight leading-[1.1] max-w-[860px] mx-auto fade-in-up">
            Clayco builds the foundation that powers AI for the world.
          </h1>
          <p className="text-[20px] sm:text-[26px] text-[#D8FD49] mt-3 font-medium fade-in-up" style={{ animationDelay: "150ms" }}>
            Let's build the foundation that powers AI for Clayco.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onOpen(i)}
              className="text-left bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl px-4 py-3.5 transition fade-in-up"
              style={{ animationDelay: `${i * 90 + 250}ms` }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/45">{s.role}</div>
              <div className="text-[14.5px] font-medium mt-1 leading-snug">{RECAP[s.id]}</div>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-white text-[#14152B] rounded-2xl px-6 sm:px-8 py-6 grid md:grid-cols-[1.3fr_1fr] gap-6 items-center fade-in-up" style={{ animationDelay: "600ms" }}>
          <div>
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-[#343CED]">A fair next step</div>
            <div className="text-[22px] font-semibold mt-1 leading-snug">A 30-day side-by-side on Clayco's data</div>
            <p className="text-[14.5px] text-gray-600 mt-2">
              Compare Snowflake alone with Snowflake + Glean. Start with M365, WebEx, and ServiceNow, plus the concrete agent you already built. You set the scorecard.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {SCORECARD.map((s) => (
                <span key={s} className="text-[12.5px] font-medium bg-[#F2F3FF] text-[#343CED] rounded-full px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://calendar.app.google/4ettvhBnPpcMQzEG9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#343CED] hover:bg-[#2A31C9] text-white text-center font-medium text-[15px] py-3 rounded-xl transition"
            >
              Pick a time to scope it →
            </a>
            <a href="mailto:mike.koscak@glean.com?subject=Clayco%20%C3%97%20Glean%20%C3%97%20Snowflake" className="border border-gray-300 hover:bg-gray-50 text-center font-medium text-[14px] py-2.5 rounded-xl transition">
              Email Mike Koscak
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-10 text-[13px] text-white/60">
          <span className="flex items-center gap-2">
            <Logo id="snowflake" size={15} /> 2026 AMER Snowflake Product Innovation Partner of the Year
          </span>
          <span>Snowflake + Glean at Shelter Insurance</span>
          <span>Building with Glean: McCarthy and ARCO</span>
        </div>

        <div className="flex-1" />
        <p className="text-[11.5px] text-white/35 text-center mt-10">
          Prepared for Clayco by the Glean team · An illustrative demo. Projects, people, and numbers are fictional.
        </p>
      </div>
    </div>
  );
}
