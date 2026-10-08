import React from "react";
import claycoLogo from "../clayco_logo.png";
import { GleanLogo, Logo, Avatar, CTX } from "./ui";

export default function Landing({ onOpen }) {
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

        {/* Hero, vertically centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <h1 className="text-[34px] sm:text-[50px] font-semibold tracking-tight text-[#14152B] leading-[1.06] max-w-[900px] fade-in-up">
            Clayco builds the foundation that powers AI for the world.
          </h1>
          <p className="text-[20px] sm:text-[27px] text-gray-500 mt-4 font-medium fade-in-up" style={{ animationDelay: "120ms" }}>
            Snowflake + Glean can be the foundation that powers AI for Clayco.
          </p>

          {/* Equation */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 mt-12 fade-in-up" style={{ animationDelay: "220ms" }}>
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

          {/* Single CTA */}
          <div className="flex flex-col items-center gap-4 mt-12 fade-in-up" style={{ animationDelay: "320ms" }}>
            <button
              onClick={() => onOpen(0)}
              className="next-pulse flex items-center gap-3 bg-[#343CED] hover:bg-[#2A31C9] text-white text-[18px] font-semibold rounded-full pl-8 pr-5 py-4 shadow-[0_14px_36px_-10px_rgba(52,60,237,0.65)] transition-colors"
            >
              Start the tour
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </button>
            <div className="flex items-center gap-2.5 text-[13px] text-gray-500">
              <span className="flex -space-x-1.5">
                {["maria", "luis", "kim"].map((p) => (
                  <span key={p} className="rounded-full ring-2 ring-[#FAF8F4]">
                    <Avatar person={p} size={22} />
                  </span>
                ))}
              </span>
              4 people at Clayco · one project · about 3 minutes
            </div>
          </div>
        </div>

        <p className="text-[11.5px] text-gray-400 text-center">
          Prepared for Clayco by the Glean team · An illustrative demo. Projects, people, and numbers are fictional.
        </p>
      </div>
    </div>
  );
}
