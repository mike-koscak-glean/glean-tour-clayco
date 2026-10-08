import React from "react";
import { SnowflakeFrame, SnowTurn } from "../frames";
import { Block, UserMsg, Trace, CostChart, Cite, Legend, SourceChip, Outcome, Logo, LockIcon, useMounted, CTX } from "../ui";

const Q = "Why did our cost per yard jump on Riverbend Level 2?";

const TRACE = [
  { src: "snowflake", kind: "num", label: "Cortex Analyst", detail: "CONCRETE_POURS · cost per yard by pour" },
  { src: "glean", kind: "ctx", label: "Glean", detail: "Searched Autodesk Docs, Outlook, WebEx, and Teams" },
];

function Toggle() {
  const on = useMounted(900);
  return (
    <span className={`w-10 h-[22px] rounded-full relative transition-colors duration-300 ${on ? "bg-[#29B5E8]" : "bg-gray-300"}`}>
      <span className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${on ? "left-[21px]" : "left-[3px]"}`} />
    </span>
  );
}

function ToolsCard() {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden max-w-[560px] mx-auto">
      <div className="px-4 py-2.5 border-b border-gray-100 bg-[#F7FAFC] text-[12.5px] font-semibold text-gray-700">
        Concrete Pour Agent · Tools
      </div>
      <div className="divide-y divide-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Logo id="snowflake" size={18} />
          <div className="flex-1">
            <div className="text-[13.5px] font-medium text-gray-800">Cortex Analyst</div>
            <div className="text-[12px] text-gray-500">Semantic view: CONCRETE_POURS</div>
          </div>
          <span className="w-10 h-[22px] rounded-full relative bg-[#29B5E8]">
            <span className="absolute top-[3px] left-[21px] w-4 h-4 rounded-full bg-white shadow" />
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-[#F6F7FF]">
          <Logo id="glean" size={18} />
          <div className="flex-1">
            <div className="text-[13.5px] font-medium text-gray-800">Glean · Company knowledge</div>
            <div className="text-[12px] text-gray-500 flex items-center gap-1.5">
              <LockIcon /> Runs as the signed-in user. Source permissions are enforced.
            </div>
          </div>
          <Toggle />
        </div>
      </div>
    </div>
  );
}

export default function DataStory({ step }) {
  return (
    <SnowflakeFrame dep={step}>
      {step >= 0 && (
        <>
          <Block>
            <UserMsg person="kim" text={Q} />
          </Block>
          <Block>
            <SnowTurn>
              <div className="space-y-3">
                <p className="text-[15px] text-gray-900 leading-relaxed">
                  Cost per yard rose from <b style={{ color: "#0B6E99" }}>$186 to $221 (+19%)</b> between Sep 8 and Sep 29. The increase came from Level 2 pours.
                </p>
                <CostChart height={110} />
                <div className="flex items-center gap-2 text-[13.5px] text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-lg px-3 py-2">
                  <span>🤷</span> I don't have information about why. Try asking the project team.
                </div>
              </div>
            </SnowTurn>
          </Block>
        </>
      )}

      {step >= 1 && (
        <Block>
          <div className="text-center text-[11.5px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Your team adds one tool</div>
          <ToolsCard />
        </Block>
      )}

      {step >= 2 && (
        <>
          <Block>
            <UserMsg person="kim" text={Q} />
          </Block>
          <Block>
            <SnowTurn>
              <Trace items={TRACE} as="Kim Alvarez" title="Planning" interval={800} />
            </SnowTurn>
          </Block>
        </>
      )}

      {step >= 3 && (
        <Block>
          <div className="pl-[42px] space-y-3">
            <Legend />
            <p className="text-[15px] text-gray-900 leading-relaxed">
              Cost per yard rose from <b style={{ color: "#0B6E99" }}>$186 to $221 (+19%)</b>.
              <Cite n={1} kind="num" /> Three things drove it:
            </p>
            <div className="space-y-2">
              {[
                ["Spec change", "RFI-112 upgraded the chiller-pad mix to 5,000 PSI.", 2, "autodesk"],
                ["Supplier", "Northline added a $9/yd fuel surcharge on Sep 15.", 3, "outlook"],
                ["Field", "Two trucks were rejected on Sep 22, and the L2 east bay was re-poured.", 4, "webex"],
              ].map(([tag, text, n, src], i) => (
                <div key={tag} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 fade-in-up" style={{ animationDelay: `${i * 240}ms` }}>
                  <span className="text-[11px] font-semibold uppercase tracking-wide w-[78px] flex-shrink-0" style={{ color: CTX }}>
                    {tag}
                  </span>
                  <span className="text-[14px] text-gray-800 flex-1">
                    {text}
                    <Cite n={n} />
                  </span>
                  <Logo id={src} size={17} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <SourceChip n={1} id="snowflake" kind="num" title="CONCRETE_POURS" />
              <SourceChip n={2} id="autodesk" title="RFI-112 response" />
              <SourceChip n={3} id="outlook" title="Northline price notice" />
              <SourceChip n={4} id="webex" title="OAC meeting · Sep 23" />
            </div>
          </div>
        </Block>
      )}

      {step >= 4 && (
        <Block>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-3">What your team didn't build</div>
              <ul className="space-y-2 text-[14px] text-gray-500">
                {["Pipelines for SharePoint, Teams, and Outlook", "ACL sync and identity mapping", "Chunking, embeddings, and relevance tuning", "Connector upkeep"].map((t, i) => (
                  <li key={t} className="flex items-center gap-2.5 fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                    <span className="text-red-400 font-bold">✕</span>
                    <span className="line-through decoration-gray-300">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#BFE6F5] bg-[#F2FAFE] px-5 py-4">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0B6E99] mb-3">What your team keeps building</div>
              <ul className="space-y-2 text-[14px] text-gray-800">
                {["Semantic views in Clayco's language", "Data products and Cortex agents", "New agents for every trade", "Row-level security, as it works today"].map((t, i) => (
                  <li key={t} className="flex items-center gap-2.5 fade-in" style={{ animationDelay: `${i * 200 + 400}ms` }}>
                    <span className="text-[#29B5E8] font-bold">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>
      )}

      {step >= 5 && (
        <Block>
          <Outcome text="Everyone who uses the concrete agent now gets the why, not just the what." sub="No new pipelines. Snowflake is still the source of truth for the numbers." />
        </Block>
      )}
    </SnowflakeFrame>
  );
}
