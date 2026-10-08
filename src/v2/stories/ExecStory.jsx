import React from "react";
import { GleanFrame } from "../frames";
import { Block, UserMsg, GleanTurn, Trace, CostChart, Cite, Legend, SourceChip, Outcome, Logo, Btn, NUM, CTX } from "../ui";

const TRACE = [
  { src: "snowflake", kind: "num", label: "Snowflake", detail: "CONCRETE_POURS · cost per yard, Building 2, last 6 weeks" },
  { src: "autodesk", kind: "ctx", label: "Autodesk Docs", detail: "RFIs and spec changes · Level 2" },
  { src: "outlook", kind: "ctx", label: "Outlook", detail: "Northline Ready-Mix correspondence" },
  { src: "webex", kind: "ctx", label: "WebEx", detail: "3 OAC meeting transcripts" },
  { src: "sharepoint", kind: "ctx", label: "SharePoint", detail: "Northline supply agreement" },
];

const DRIVERS = [
  {
    amt: "$197K",
    text: "Mix upgraded to 5,000 PSI for the chiller pads after the owner's RFI-112 change.",
    n: 2,
    src: "autodesk",
  },
  {
    amt: "$129K",
    text: "Northline added a $9/yd fuel surcharge on Sep 15.",
    n: 3,
    src: "outlook",
  },
  {
    amt: "$86K",
    text: "Two trucks rejected for slump on the Sep 22 pour. The L2 east bay was re-poured.",
    n: 4,
    src: "webex",
  },
];

export default function ExecStory({ step }) {
  return (
    <GleanFrame dep={step} user="maria" connected={["snowflake", "autodesk", "outlook", "webex", "teams", "sharepoint"]}>
      {step >= 0 && (
        <Block>
          <UserMsg person="maria" text="We're over on concrete at Riverbend Building 2. What happened, and what do I tell the owner Thursday?" />
        </Block>
      )}

      {step >= 1 && (
        <Block>
          <GleanTurn>
            <Trace items={TRACE} as="Maria Chen" interval={620} />
          </GleanTurn>
        </Block>
      )}

      {step >= 2 && (
        <Block>
          <GleanTurn>
            <div className="space-y-3">
              <Legend />
              <p className="text-[16px] leading-relaxed text-gray-900">
                Building 2 concrete is <b style={{ color: "#0B6E99" }}>$412K over budget (8.6%)</b>. Almost all of it came from the last three weeks of Level 2 pours.
                <Cite n={1} kind="num" />
              </p>
              <CostChart />
            </div>
          </GleanTurn>
        </Block>
      )}

      {step >= 3 && (
        <Block>
          <div className="pl-[42px]">
            <div className="text-[13px] font-semibold text-gray-800 mb-2">Why it happened</div>
            <div className="space-y-2">
              {DRIVERS.map((d, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 fade-in-up" style={{ animationDelay: `${i * 260}ms` }}>
                  <span className="text-[15px] font-bold w-[58px] flex-shrink-0" style={{ color: "#0B6E99" }}>
                    {d.amt}
                  </span>
                  <span className="w-[3px] self-stretch rounded-full" style={{ background: CTX, opacity: 0.8 }} />
                  <span className="text-[14px] text-gray-800 flex-1">
                    {d.text}
                    <Cite n={d.n} />
                  </span>
                  <Logo id={d.src} size={18} />
                </div>
              ))}
            </div>
          </div>
        </Block>
      )}

      {step >= 4 && (
        <Block>
          <div className="pl-[42px]">
            <div className="rounded-xl border-2 border-[#D8FD49] bg-[#FBFFE9] px-4 py-3.5">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#3F4A00] mb-2">
                <span className="text-[16px]">💡</span> $326K is worth recovering
              </div>
              <ul className="space-y-1.5 text-[14px] text-gray-800">
                <li>
                  <b>$197K → change order.</b> The owner directed RFI-112, so the mix upgrade is billable.
                  <Cite n={2} />
                </li>
                <li>
                  <b>$129K → push back.</b> Northline's contract requires 30 days' notice for surcharges. They gave 6.
                  <Cite n={5} />
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <SourceChip n={1} id="snowflake" kind="num" title="CONCRETE_POURS" />
              <SourceChip n={2} id="autodesk" title="RFI-112 response" />
              <SourceChip n={3} id="outlook" title="Northline price notice" />
              <SourceChip n={4} id="webex" title="OAC meeting · Sep 23" />
              <SourceChip n={5} id="sharepoint" title="Northline supply agreement" />
            </div>
          </div>
        </Block>
      )}

      {step >= 5 && (
        <Block>
          <div className="pl-[42px]">
            <div className="flex gap-2 mb-3">
              <Btn primary pressed>Draft owner update</Btn>
              <Btn>Start change order</Btn>
            </div>
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-[#F8F9FB]">
                <Logo id="outlook" size={16} />
                <span className="text-[12.5px] font-semibold text-gray-700">Draft · Outlook</span>
                <span className="ml-auto text-[11.5px] text-gray-500">To: Riverbend owner team</span>
              </div>
              <div className="px-4 py-3 text-[14px] text-gray-800 leading-relaxed space-y-2">
                <div className="font-semibold">Riverbend B2 concrete: update before Thursday</div>
                <p>A quick heads-up before Thursday: Building 2 concrete is $412K over, mostly from the Level 2 pours.</p>
                <p>$197K is from the 5,000 PSI chiller-pad mix in RFI-112. We will send a change order request this week.</p>
                <p>The rest is supplier-related. We are handling it with Northline directly.</p>
              </div>
            </div>
          </div>
        </Block>
      )}

      {step >= 6 && (
        <Block>
          <Outcome text="Two days of digging became one question." sub="Numbers + reasons + $326K to recover." />
        </Block>
      )}
    </GleanFrame>
  );
}
