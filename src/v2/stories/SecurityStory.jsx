import React from "react";
import { GleanFrame } from "../frames";
import { Block, Avatar, PEOPLE, Logo, Outcome, CheckDot, XDot, LockIcon, Trace } from "../ui";

const Q = "What's going on with the Northline concrete dispute on Riverbend?";

const VIEWS = [
  {
    who: "maria",
    trace: [{ src: "glean", kind: "ctx", label: "Permissions", detail: "5 sources checked" }],
    answer: (
      <>
        Northline disputes the <b>$86K re-pour back-charge</b>. Legal sent a formal notice on Oct 2. Total supplier exposure is <b>$215K</b>, including the surcharge.
      </>
    ),
    sources: [
      ["outlook", "Legal: Northline notice", true],
      ["teams", "#riverbend-leadership", true],
      ["snowflake", "CONCRETE_COSTS · full detail", false],
    ],
  },
  {
    who: "luis",
    answer: (
      <>
        Two trucks were rejected for slump on Sep 22, and the L2 east bay was re-poured on Sep 24. Northline now sends a QC tech to every pour.
      </>
    ),
    note: "Costs shown as summary only, based on your Snowflake role.",
    sources: [
      ["webex", "OAC meeting · Sep 23", false],
      ["teams", "#field-team", false],
      ["snowflake", "CONCRETE_COSTS · summary", false],
    ],
  },
  {
    who: "priya",
    answer: <>I didn't find anything about a dispute. Here's what's next for Riverbend concrete: the L3 deck pour is on Tue, Oct 13.</>,
    sources: [["sharepoint", "Riverbend pour schedule", false]],
  },
];

const MATRIX = [
  ["outlook", "Legal email thread", "Mailbox access", ["y", "n", "n"]],
  ["teams", "#riverbend-leadership", "Private channel", ["y", "n", "n"]],
  ["snowflake", "Concrete costs", "Row access policy", ["Full", "Summary", "n"]],
  ["webex", "OAC transcript", "Meeting invitees", ["y", "y", "n"]],
  ["sharepoint", "Pour schedule", "Project site", ["y", "y", "y"]],
];

function Cell({ v }) {
  if (v === "y") return <CheckDot small />;
  if (v === "n") return <XDot small />;
  return <span className={`text-[11.5px] font-semibold rounded-full px-2 py-0.5 ${v === "Full" ? "bg-[#E1F4FB] text-[#0B6E99]" : "bg-amber-50 text-amber-700"}`}>{v}</span>;
}

function ViewCol({ v, i }) {
  const p = PEOPLE[v.who];
  return (
    <div className="border border-gray-200 rounded-xl bg-white flex flex-col fade-in-up overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-[#FAFAFC]">
        <Avatar person={v.who} size={30} />
        <div className="leading-tight">
          <div className="text-[13.5px] font-semibold text-gray-900">{p.name}</div>
          <div className="text-[11.5px] text-gray-500">{p.role}</div>
        </div>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <Logo id="glean" size={16} className="mt-0.5" />
          <p className="text-[13.5px] text-gray-800 leading-relaxed">{v.answer}</p>
        </div>
        {v.note && (
          <div className="text-[11.5px] text-amber-700 bg-amber-50 rounded-md px-2.5 py-1.5 flex items-center gap-1.5">
            <LockIcon /> {v.note}
          </div>
        )}
        <div className="mt-auto space-y-1.5">
          {v.sources.map(([id, t, sensitive]) => (
            <div key={t} className="flex items-center gap-2 text-[12px] text-gray-600 border border-gray-100 rounded-md px-2 py-1">
              <Logo id={id} size={13} />
              <span className="truncate">{t}</span>
              {sensitive && (
                <span className="ml-auto text-gray-400">
                  <LockIcon size={11} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SecurityStory({ step }) {
  return (
    <GleanFrame dep={step} wide title="Assistant · same question, three people" user="maria">
      {step >= 0 && (
        <Block>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              {["maria", "luis", "priya"].map((w) => (
                <Avatar key={w} person={w} size={30} />
              ))}
              <span className="text-[12.5px] text-gray-500 ml-1">all ask</span>
            </div>
            <div className="text-[20px] font-semibold text-gray-900 max-w-[640px] mx-auto leading-snug">"{Q}"</div>
          </div>
        </Block>
      )}

      {step >= 1 && (
        <Block>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {VIEWS.map((v, i) =>
              step >= i + 1 ? (
                <ViewCol key={v.who} v={v} i={i} />
              ) : (
                <div key={v.who} className="hidden md:block border-2 border-dashed border-gray-200 rounded-xl min-h-[260px]" />
              )
            )}
          </div>
        </Block>
      )}

      {step >= 4 && (
        <Block>
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-[#F6F7FF]">
              <div className="text-[13.5px] font-semibold text-gray-900">Why each person saw something different</div>
              <div className="text-[11.5px] text-gray-500 flex items-center gap-1.5">
                <LockIcon /> Checked live at the source · every answer logged
              </div>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[11.5px] text-gray-500">
                  <th className="text-left font-medium px-5 py-2">Source</th>
                  <th className="text-left font-medium px-3 py-2">Permission Glean respects</th>
                  {["maria", "luis", "priya"].map((w) => (
                    <th key={w} className="font-medium px-3 py-2">
                      {PEOPLE[w].name.split(" ")[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(([id, label, perm, vals], r) => (
                  <tr key={label} className="border-t border-gray-100 fade-in" style={{ animationDelay: `${r * 140}ms` }}>
                    <td className="px-5 py-2.5">
                      <span className="flex items-center gap-2 text-gray-800">
                        <Logo id={id} size={15} /> {label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-500">{perm}</td>
                    {vals.map((v, c) => (
                      <td key={c} className="px-3 py-2.5 text-center">
                        <span className="inline-flex justify-center">
                          <Cell v={v} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>
      )}

      {step >= 5 && (
        <Block>
          <Outcome text="Same question. The right answer for each person." sub="Your existing permissions, enforced. Nothing rebuilt." />
        </Block>
      )}
    </GleanFrame>
  );
}
