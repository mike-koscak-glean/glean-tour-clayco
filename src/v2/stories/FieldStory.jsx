import React from "react";
import { TeamsFrame, TeamsMsg } from "../frames";
import { Block, Trace, Outcome, Logo, Btn, CheckDot, Spinner, Avatar, useTypewriter } from "../ui";

const TRACE = [
  { src: "sharepoint", kind: "ctx", label: "SharePoint", detail: "Field Engineer onboarding standard" },
  { src: "okta", kind: "ctx", label: "Okta", detail: "Role groups for Field Engineer · Riverbend" },
  { src: "intune", kind: "ctx", label: "Intune", detail: "Device stock · St. Louis depot" },
  { src: "snowflake", kind: "num", label: "Snowflake", detail: "Concrete Pour Agent access policy" },
  { src: "servicenow", kind: "ctx", label: "ServiceNow", detail: "Open requests for Priya Shah · none" },
];

const KIT = [
  { item: "Rugged laptop + iPad", note: "In stock in St. Louis", src: "intune", auto: true },
  { item: "M365, Teams, and WebEx", note: "Field Engineer group", src: "okta", auto: true },
  { item: "Bluebeam Revu", note: "4 seats free", src: "sharepoint", auto: true },
  { item: "Concrete Pour Agent", note: "Riverbend rows only", src: "snowflake", auto: true },
  { item: "Site safety orientation", note: "Mon 7:00 AM, trailer B", src: "sharepoint", auto: true },
  { item: "Autodesk Construction Cloud · Riverbend", note: "Needs Kim Alvarez's OK", src: "autodesk", auto: false },
];

function LuisAsk() {
  const text = "Priya Shah starts Monday as a field engineer on Riverbend. Can you get her set up?";
  const t = useTypewriter(text);
  return (
    <>
      <span className="text-[#464EB8] font-semibold bg-[#E8EAFB] rounded px-1">@Glean</span> {t}
      {t.length < text.length && <span className="cursor-blink">▍</span>}
    </>
  );
}

function SnowTicket({ step }) {
  const approved = step >= 4;
  return (
    <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F8F6] border-b border-gray-200">
        <Logo id="servicenow" size={16} />
        <span className="text-[13px] font-semibold text-gray-800">REQ0048213</span>
        <span className="text-[12.5px] text-gray-600">· Onboarding: Priya Shah</span>
        <span className={`ml-auto text-[11px] font-semibold rounded-full px-2 py-0.5 ${approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
          {approved ? "Approved · fulfilling" : "Submitted"}
        </span>
      </div>
      <div className="px-4 py-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {KIT.map((k, i) => (
          <div key={i} className="flex items-center gap-2 text-[12.5px] text-gray-700 fade-in" style={{ animationDelay: `${i * 120}ms` }}>
            {k.auto || approved ? <CheckDot small /> : <Spinner small />}
            <span className="truncate">{k.item}</span>
            <span className="text-gray-400 truncate">{k.auto ? "auto-approved" : approved ? "approved by Kim" : "awaiting Kim"}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-gray-100 text-[11.5px] text-gray-500 flex flex-wrap gap-x-4">
        <span>Requested for: Priya Shah</span>
        <span>Requested by: Luis Romero</span>
        <span>Assignment: IT Field Services</span>
        <span>Filed by Glean</span>
      </div>
    </div>
  );
}

export default function FieldStory({ step }) {
  return (
    <TeamsFrame dep={step}>
      {step >= 0 && (
        <Block>
          <TeamsMsg who="luis" time="8:41 AM">
            <LuisAsk />
          </TeamsMsg>
        </Block>
      )}

      {step >= 1 && (
        <Block>
          <TeamsMsg bot time="8:41 AM">
            <Trace items={TRACE} as="Luis Romero" title="Building Priya's Day 1 kit" interval={560} />
            {step >= 2 && (
              <div data-block className="mt-3 fade-in-up">
                <p className="mb-2.5">
                  Here is Priya's Day 1 kit, based on Clayco's field engineer standard. <b>5 items can be approved automatically. 1 item needs approval.</b>
                </p>
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {KIT.map((k, i) => (
                    <div key={i} className="flex items-center gap-3 px-3.5 py-2 fade-in" style={{ animationDelay: `${i * 140}ms` }}>
                      <Logo id={k.src} size={16} />
                      <span className="text-[13.5px] font-medium text-gray-800">{k.item}</span>
                      <span className="text-[12.5px] text-gray-500 truncate">{k.note}</span>
                      <span className={`ml-auto text-[11px] font-semibold rounded-full px-2 py-0.5 flex-shrink-0 ${k.auto ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                        {k.auto ? "Auto" : "Approval"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Btn primary pressed={step >= 3}>
                    {step >= 3 ? "✓ Filed in ServiceNow" : "File it in ServiceNow"}
                  </Btn>
                  <Btn>Edit kit</Btn>
                </div>
                {step >= 3 && (
                  <div data-block className="fade-in-up">
                    <SnowTicket step={step} />
                  </div>
                )}
              </div>
            )}
          </TeamsMsg>
        </Block>
      )}

      {step >= 4 && (
        <Block>
          <div className="ml-11 border-l-2 border-[#464EB8]/30 pl-4">
            <div className="text-[11.5px] text-gray-500 mb-2 flex items-center gap-2">
              <Avatar person="kim" size={18} /> In Kim Alvarez's Teams activity
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm max-w-[520px]">
              <div className="flex items-center gap-2 mb-1.5">
                <Logo id="glean" size={15} />
                <span className="text-[12.5px] font-semibold text-gray-800">Approval needed</span>
              </div>
              <p className="text-[13.5px] text-gray-700 mb-3">
                Give <b>Priya Shah</b> access to <b>Autodesk Construction Cloud · Riverbend</b>? This matches the field engineer standard.
              </p>
              <div className="flex items-center gap-2">
                <Btn primary pressed>
                  ✓ Approved
                </Btn>
                <Btn>Deny</Btn>
                <span className="text-[11.5px] text-green-700 ml-2">Approved by Kim · 9:14 AM · synced to ServiceNow</span>
              </div>
            </div>
          </div>
        </Block>
      )}

      {step >= 5 && (
        <Block>
          <TeamsMsg bot time="9:15 AM">
            <span className="text-[#464EB8] font-semibold">@Luis Romero</span> Priya is all set. Her laptop and iPad ship to the Riverbend trailer Friday, and her access is live Monday at 6 AM. I'll close <b>REQ0048213</b> when she signs in.
          </TeamsMsg>
        </Block>
      )}

      {step >= 6 && (
        <Block>
          <Outcome text="Nobody opened ServiceNow. Priya is ready on Monday." sub="Luis asked once in Teams. IT received one complete ticket, not three partial ones." />
        </Block>
      )}
    </TeamsFrame>
  );
}
