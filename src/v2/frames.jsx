import React from "react";
import { Logo, Thread, Avatar, PEOPLE } from "./ui";

const Icon = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </>
  ),
  agent: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
    </>
  ),
  bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2a5 5 0 0 1 5.5 5" />
    </>
  ),
  cal: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <line x1="3.5" y1="10" x2="20.5" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
};

function Svg({ name, size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {Icon[name]}
    </svg>
  );
}

function WindowShell({ children, className = "" }) {
  return (
    <div className={`h-full w-full rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_-20px_rgba(20,20,60,0.25)] overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Glean Assistant
 * ───────────────────────────────────────────── */
export function GleanFrame({ children, dep, title = "Assistant", connected = [], wide = false, user = "maria" }) {
  return (
    <WindowShell>
      <div className="flex-1 flex min-h-0">
        <div className="hidden md:flex w-[60px] bg-[#F6F6FA] border-r border-gray-200 flex-col items-center py-4 gap-6 text-gray-500">
          <Logo id="glean" size={26} />
          <Svg name="home" />
          <span className="w-9 h-9 rounded-lg bg-[#E7E8FD] text-[#343CED] flex items-center justify-center">
            <Svg name="chat" />
          </span>
          <Svg name="search" />
          <Svg name="agent" />
          <div className="mt-auto">
            <Avatar person={user} size={28} />
          </div>
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-12 border-b border-gray-200 px-5 flex items-center justify-between flex-shrink-0">
            <div className="text-[14px] font-semibold text-gray-800">{title}</div>
            {connected.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-[11.5px] text-gray-500">
                Connected
                <div className="flex items-center gap-1.5">
                  {connected.map((id) => (
                    <Logo key={id} id={id} size={15} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <Thread dep={dep} className="flex-1 min-h-0" innerClassName={`${wide ? "max-w-[1060px]" : "max-w-[800px]"} mx-auto px-6 py-6 space-y-5`}>
            {children}
          </Thread>
          <div className="border-t border-gray-200 px-6 py-3 flex-shrink-0">
            <div className={`${wide ? "max-w-[1060px]" : "max-w-[800px]"} mx-auto flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2.5 text-[14px] text-gray-400`}>
              <Svg name="search" size={16} />
              Ask Glean anything about Clayco…
            </div>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}

/* ─────────────────────────────────────────────
 * Microsoft Teams (Glean app inside Teams)
 * ───────────────────────────────────────────── */
export function TeamsFrame({ children, dep }) {
  return (
    <WindowShell>
      <div className="h-10 bg-[#464EB8] flex items-center px-4 gap-3 flex-shrink-0">
        <Logo id="teams" size={18} />
        <div className="flex-1 flex justify-center">
          <div className="bg-white/20 text-white/80 text-[12px] rounded-md px-3 py-1 w-[340px] max-w-full flex items-center gap-2">
            <Svg name="search" size={13} /> Search
          </div>
        </div>
        <Avatar person="luis" size={24} />
      </div>
      <div className="flex-1 flex min-h-0">
        <div className="hidden md:flex w-[64px] bg-[#EBEBF2] flex-col items-center py-3 gap-5 text-gray-600 text-[10px]">
          {[
            ["bell", "Activity"],
            ["chat", "Chat"],
            ["people", "Teams"],
            ["cal", "Calendar"],
          ].map(([ic, l], i) => (
            <div key={l} className={`flex flex-col items-center gap-1 ${i === 2 ? "text-[#464EB8] font-semibold" : ""}`}>
              <Svg name={ic} size={19} />
              {l}
            </div>
          ))}
          <div className="flex flex-col items-center gap-1 text-[#464EB8]">
            <Logo id="glean" size={20} />
            Glean
          </div>
        </div>
        <div className="hidden lg:flex w-[230px] bg-[#F5F5F8] border-r border-gray-200 flex-col py-3 px-3 text-[13px]">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">Your teams</div>
          <div className="flex items-center gap-2 px-2 py-1.5 font-semibold text-gray-800">
            <span className="w-6 h-6 rounded bg-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center">RB</span>
            Riverbend Data Center
          </div>
          {["General", "Field team", "Concrete", "Safety"].map((c) => (
            <div key={c} className={`ml-8 px-2 py-1.5 rounded-md ${c === "Field team" ? "bg-white shadow-sm font-semibold text-gray-900" : "text-gray-600"}`}>
              {c}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col min-w-0 bg-[#F7F7FA]">
          <div className="h-12 bg-white border-b border-gray-200 px-5 flex items-center gap-4 flex-shrink-0">
            <div className="text-[14px] font-semibold text-gray-800">Field team</div>
            <div className="text-[13px] text-[#464EB8] font-semibold border-b-2 border-[#464EB8] h-full flex items-center">Posts</div>
            <div className="text-[13px] text-gray-500">Files</div>
          </div>
          <Thread dep={dep} className="flex-1 min-h-0" innerClassName="max-w-[820px] mx-auto px-6 py-6 space-y-4">
            {children}
          </Thread>
          <div className="px-6 py-3 flex-shrink-0">
            <div className="max-w-[820px] mx-auto bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-[13.5px] text-gray-400">
              Reply to the Field team…
            </div>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}

export function TeamsMsg({ who, time = "8:42 AM", children, bot }) {
  const p = who ? PEOPLE[who] : null;
  return (
    <div className="flex items-start gap-3">
      {bot ? (
        <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
          <Logo id="glean" size={18} />
        </span>
      ) : (
        <Avatar person={who} size={32} />
      )}
      <div className="flex-1 min-w-0 bg-white rounded-lg border border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-semibold text-gray-900">{bot ? "Glean" : p.name}</span>
          {bot && <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">APP</span>}
          <span className="text-[11.5px] text-gray-500">{time}</span>
        </div>
        <div className="text-[14px] text-gray-800 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Snowflake Intelligence (illustrative)
 * ───────────────────────────────────────────── */
export function SnowflakeFrame({ children, dep, side }) {
  return (
    <WindowShell>
      <div className="flex-1 flex min-h-0">
        <div className="hidden md:flex w-[230px] bg-[#F7FAFC] border-r border-gray-200 flex-col py-4 px-3">
          <div className="flex items-center gap-2 px-2 mb-5">
            <Logo id="snowflake" size={22} />
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-[#11567F]">Snowflake</div>
              <div className="text-[11px] text-gray-500">Intelligence</div>
            </div>
          </div>
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">Clayco agents</div>
          {[
            ["Concrete Pour Agent", true],
            ["Project Cost Agent", false],
            ["Equipment Utilization", false],
            ["Safety Insights", false],
          ].map(([n, active]) => (
            <div key={n} className={`flex items-center gap-2 px-2 py-2 rounded-md text-[13px] ${active ? "bg-[#E1F4FB] text-[#0B6E99] font-semibold" : "text-gray-600"}`}>
              <Svg name="agent" size={15} />
              {n}
            </div>
          ))}
          <div className="mt-auto px-2 text-[11px] text-gray-400 leading-snug">Built by the Clayco Data &amp; AI team</div>
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-12 border-b border-gray-200 px-5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-800">
              Concrete Pour Agent
              <span className="text-[11px] font-medium text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">semantic view · CONCRETE_POURS</span>
            </div>
            <Avatar person="kim" size={26} />
          </div>
          <div className="flex-1 flex min-h-0">
            <Thread dep={dep} className="flex-1 min-h-0" innerClassName="max-w-[780px] mx-auto px-6 py-6 space-y-5">
              {children}
            </Thread>
            {side}
          </div>
          <div className="border-t border-gray-200 px-6 py-3 flex-shrink-0">
            <div className="max-w-[780px] mx-auto border border-gray-300 rounded-xl px-4 py-2.5 text-[14px] text-gray-400">Ask Concrete Pour Agent…</div>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}

export function SnowTurn({ children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-[30px] h-[30px] rounded-lg bg-[#E1F4FB] flex items-center justify-center flex-shrink-0">
        <Logo id="snowflake" size={17} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-gray-500 mb-1.5">Concrete Pour Agent</div>
        {children}
      </div>
    </div>
  );
}
