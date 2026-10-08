import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

/* Story context — lets every frame render the "what to click next" button */
export const StoryCtx = createContext({ cta: null, onNext: null, show: false });

/* ─────────────────────────────────────────────
 * Brand + source registry
 * ───────────────────────────────────────────── */
export const NUM = "#29B5E8"; // Snowflake — "the numbers"
export const CTX = "#343CED"; // Glean — "the context"

const CDN = "https://app.glean.com/images/logos";
export const GLEAN_WORDMARK = "https://app.glean.com/images/glean-logo2.svg";

export function GleanLogo({ size = 26, dark = false }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <img src={GLEAN_WORDMARK} alt="" style={{ width: size, height: size }} draggable="false" />
      <span className={`font-bold tracking-tight ${dark ? "text-white" : "text-[#343CED]"}`} style={{ fontSize: size * 0.82 }}>
        glean
      </span>
    </span>
  );
}

export const SOURCES = {
  snowflake: { label: "Snowflake", logo: `${CDN}/snowflake.svg` },
  autodesk: { label: "Autodesk Docs", logo: `${CDN}/autodesk.svg` },
  outlook: { label: "Outlook", logo: `${CDN}/outlook.svg` },
  teams: { label: "Teams", logo: `${CDN}/teams.svg` },
  sharepoint: { label: "SharePoint", logo: `${CDN}/sharepoint.svg` },
  servicenow: { label: "ServiceNow", logo: `${CDN}/servicenow.svg` },
  okta: { label: "Okta", logo: `${CDN}/okta.svg` },
  webex: { label: "WebEx", logo: `${CDN}/webex_meetings.svg` },
  glean: { label: "Glean", logo: `${CDN}/glean.svg` },
  intune: { label: "Intune", letter: "In", color: "#0078D4" },
};

export function Logo({ id, size = 16, className = "" }) {
  const s = SOURCES[id];
  if (!s) return null;
  if (s.logo) {
    return (
      <img
        src={s.logo}
        alt={s.label}
        style={{ width: size, height: size }}
        className={`flex-shrink-0 object-contain ${className}`}
        draggable="false"
      />
    );
  }
  return (
    <span
      className={`inline-flex items-center justify-center rounded text-white font-bold flex-shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.45, background: s.color }}
    >
      {s.letter}
    </span>
  );
}

export function LogoStack({ ids, size = 18 }) {
  return (
    <div className="flex items-center -space-x-1">
      {ids.map((id) => (
        <span
          key={id}
          className="w-[26px] h-[26px] rounded-full bg-white border border-gray-200 flex items-center justify-center"
        >
          <Logo id={id} size={size * 0.75} />
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * People
 * ───────────────────────────────────────────── */
export const PEOPLE = {
  maria: { name: "Maria Chen", role: "Project Executive", initials: "MC", color: "#C2410C" },
  luis: { name: "Luis Romero", role: "Superintendent", initials: "LR", color: "#0F766E" },
  kim: { name: "Kim Alvarez", role: "Project Manager", initials: "KA", color: "#7C3AED" },
  priya: { name: "Priya Shah", role: "Field Engineer · starts Monday", initials: "PS", color: "#DB2777" },
};

export function Avatar({ person, size = 32 }) {
  const p = typeof person === "string" ? PEOPLE[person] : person;
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0"
      style={{ width: size, height: size, background: p.color, fontSize: size * 0.38 }}
    >
      {p.initials}
    </span>
  );
}

export function GleanMark({ size = 28 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <Logo id="glean" size={size * 0.62} />
    </span>
  );
}

/* ─────────────────────────────────────────────
 * Hooks
 * ───────────────────────────────────────────── */
export function useTypewriter(text, speed = 18) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 2;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return text.slice(0, n);
}

export function useTicker(count, interval = 520, delay = 150) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let id;
    const t = setTimeout(() => {
      setN(1);
      id = setInterval(() => {
        setN((v) => {
          if (v >= count) {
            clearInterval(id);
            return v;
          }
          return v + 1;
        });
      }, interval);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, [count, interval, delay]);
  return n;
}

export function useMounted(delay = 60) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setM(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return m;
}

/* ─────────────────────────────────────────────
 * Auto-scrolling thread: keeps the newest block in view
 * ───────────────────────────────────────────── */
export function Thread({ children, dep, className = "", innerClassName = "" }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  const focusNewest = () => {
    const c = ref.current;
    if (!c) return;
    const blocks = c.querySelectorAll("[data-block]");
    const last = blocks[blocks.length - 1];
    if (!last) return;
    const cRect = c.getBoundingClientRect();
    const lRect = last.getBoundingClientRect();
    const lastTop = lRect.top - cRect.top + c.scrollTop;
    const maxScroll = c.scrollHeight - c.clientHeight;
    const target = lRect.height > c.clientHeight - 40 ? lastTop - 20 : maxScroll;
    c.scrollTo({ top: Math.max(0, Math.min(target, maxScroll)), behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const t = setTimeout(focusNewest, 60);
    return () => clearTimeout(t);
  }, [dep]);

  useEffect(() => {
    if (!innerRef.current) return;
    const ro = new ResizeObserver(() => focusNewest());
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-y-auto ${className}`}>
      <div ref={innerRef} className={innerClassName}>
        {children}
        <NextCta />
      </div>
    </div>
  );
}

/* The in-frame "what happens next" button. Sticky, so it never scrolls away. */
export function NextCta() {
  const { cta, onNext, show } = useContext(StoryCtx);
  if (!show || !cta) return null;
  return (
    <div className="sticky bottom-3 z-20 flex justify-center pt-4 pointer-events-none">
      <button
        key={cta}
        onClick={onNext}
        className="pointer-events-auto cta-in flex items-center gap-2.5 bg-[#343CED] hover:bg-[#2A31C9] text-white text-[15px] font-semibold rounded-full pl-5 pr-4 py-3 shadow-[0_10px_30px_-8px_rgba(52,60,237,0.6)] transition-colors"
      >
        {cta}
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export function Block({ children, className = "" }) {
  return (
    <div data-block className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Chat primitives
 * ───────────────────────────────────────────── */
export function UserMsg({ person = "maria", text }) {
  const typed = useTypewriter(text);
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-3 max-w-[85%]">
        <div className="bg-[#EEF0FF] text-[#1B1D3A] rounded-2xl rounded-tr-md px-4 py-3 text-[15px] leading-relaxed">
          {typed}
          {typed.length < text.length && <span className="cursor-blink">▍</span>}
        </div>
        <Avatar person={person} size={30} />
      </div>
    </div>
  );
}

export function GleanTurn({ children, label = "Glean" }) {
  return (
    <div className="flex items-start gap-3">
      <GleanMark size={30} />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-gray-500 mb-1.5">{label}</div>
        {children}
      </div>
    </div>
  );
}

export function Cite({ n, kind = "ctx" }) {
  return <span className={`cite cite-${kind}`}>{n}</span>;
}

export function Legend() {
  return (
    <div className="flex items-center gap-4 text-[11.5px] text-gray-500">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full" style={{ background: NUM }} />
        The numbers · Snowflake
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full" style={{ background: CTX }} />
        The context · conversations &amp; docs
      </span>
    </div>
  );
}

export function SourceChip({ n, id, title, kind = "ctx" }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg pl-2 pr-3 py-1.5 text-[12px] text-gray-700 min-w-0">
      {n != null && <Cite n={n} kind={kind} />}
      <Logo id={id} size={14} />
      <span className="truncate">{title}</span>
    </div>
  );
}

/* Trace — "Glean is working" with sequential tool calls */
export function Trace({ items, as, title = "Working across your systems", interval = 520 }) {
  const n = useTicker(items.length, interval);
  const done = n >= items.length;
  return (
    <div className="border border-gray-200 rounded-xl bg-[#FAFAFC] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
          {done ? <CheckDot /> : <Spinner />}
          {done ? "Done" : title}
        </div>
        {as && (
          <div className="text-[11.5px] text-gray-500 flex items-center gap-1.5">
            <LockIcon /> Running as {as}
          </div>
        )}
      </div>
      <div className="px-4 py-2.5 space-y-2">
        {items.map((it, i) =>
          i < n ? (
            <div key={i} className="flex items-center gap-3 text-[13px] fade-in">
              <span
                className="w-1 self-stretch rounded-full"
                style={{ background: it.kind === "num" ? NUM : it.kind === "act" ? "#16A34A" : CTX, opacity: 0.85 }}
              />
              <Logo id={it.src} size={16} />
              <span className="text-gray-800 font-medium whitespace-nowrap">{it.label}</span>
              <span className="text-gray-500 truncate">{it.detail}</span>
              <span className="ml-auto flex-shrink-0">{i < n - 1 || done ? <CheckDot small /> : <Spinner small />}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export function Spinner({ small }) {
  const s = small ? 12 : 14;
  return (
    <span
      className="inline-block rounded-full border-2 border-gray-300 border-t-[#343CED] animate-spin"
      style={{ width: s, height: s }}
    />
  );
}

export function CheckDot({ small, color = "#16A34A" }) {
  const s = small ? 14 : 16;
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white"
      style={{ width: s, height: s, background: color }}
    >
      <svg width={s * 0.62} height={s * 0.62} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export function LockIcon({ size = 12, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function XDot({ small }) {
  const s = small ? 14 : 16;
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-500" style={{ width: s, height: s }}>
      <svg width={s * 0.55} height={s * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────
 * Snowflake cost chart
 * ───────────────────────────────────────────── */
export const POUR_WEEKS = [
  { w: "Aug 25", v: 184 },
  { w: "Sep 1", v: 187 },
  { w: "Sep 8", v: 189 },
  { w: "Sep 15", v: 204 },
  { w: "Sep 22", v: 231 },
  { w: "Sep 29", v: 221 },
];

export function CostChart({ data = POUR_WEEKS, budget = 186, height = 150, title = "Cost per cubic yard · Building 2", source = "CONCRETE_POURS semantic view" }) {
  const mounted = useMounted(120);
  const min = 150;
  const max = 240;
  const scale = (v) => ((v - min) / (max - min)) * height;
  return (
    <div className="border border-gray-200 rounded-xl bg-white px-4 pt-3 pb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12.5px] font-semibold text-gray-800">{title}</div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#E6F6FC", color: "#0B6E99" }}>
          <Logo id="snowflake" size={11} />
          {source}
        </div>
      </div>
      <div className="relative" style={{ height: height + 22 }}>
        {/* budget line */}
        <div
          className="absolute left-0 right-0 border-t-2 border-dashed border-gray-300"
          style={{ bottom: scale(budget) + 22 }}
        >
          <span className="absolute -top-[18px] right-0 text-[10.5px] text-gray-500 bg-white px-1">Budget ${budget}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-1" style={{ height: height + 22 }}>
          {data.map((d, i) => {
            const over = d.v > budget + 5;
            return (
              <div key={d.w} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className={`text-[11px] font-semibold mb-1 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ color: over ? "#0B6E99" : "#6B7280", transitionDelay: `${i * 90 + 300}ms` }}>
                  ${d.v}
                </span>
                <div
                  className="w-full max-w-[44px] rounded-t-md bar-grow"
                  style={{
                    height: scale(d.v),
                    background: over ? NUM : "#BFE6F5",
                    transform: mounted ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
                <span className="text-[10.5px] text-gray-500 mt-1.5 h-[14px]">{d.w}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Outcome banner — the "oh yeah" line
 * ───────────────────────────────────────────── */
export function Outcome({ text, sub }) {
  return (
    <div className="rounded-2xl bg-[#0E1030] text-white px-6 py-5 flex items-center gap-5 shadow-lg pop-in">
      <div className="w-11 h-11 rounded-xl bg-[#D8FD49] text-[#0E1030] flex items-center justify-center flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <div className="text-[19px] font-semibold leading-snug">{text}</div>
        {sub && <div className="text-[13.5px] text-white/65 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

export function Btn({ children, primary, pressed, className = "", ...rest }) {
  return (
    <button
      {...rest}
      className={`text-[13px] font-medium rounded-lg px-3.5 py-2 transition-all ${
        primary ? "bg-[#343CED] text-white hover:bg-[#2A31C9]" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      } ${pressed ? "ring-4 ring-[#343CED]/25 scale-[0.97]" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
