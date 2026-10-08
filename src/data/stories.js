/*
 * Clayco × Glean × Snowflake — story script
 *
 * Every story shares one fictional scenario so the viewer builds context:
 * Riverbend Data Center, Building 2 — concrete is running over budget.
 *
 * Guardrails (from the Oct 7 research brief):
 *  - No Procore on screen.
 *  - No ROI calculators. Outcomes, not math.
 *  - Positive about Snowflake. Glean extends it; it does not replace it.
 *  - Avoid "MCP" as a hero term.
 *  - All people, projects, suppliers, and numbers are fictional.
 *
 * Each step = one caption (keep under ~14 words) + autoplay duration (ms).
 */

export const stories = [
  {
    id: "exec",
    before: "2 days digging through reports and threads",
    after: "1 question: numbers, reasons, owner email",
    name: "Maria Chen",
    where: "Glean Assistant",
    whereLogo: "glean",
    recap: "The numbers and the reasons, in one answer",
    situation:
      "Maria runs Riverbend for Clayco. Building 2 concrete is over budget, and she meets the owner on Thursday. Today that means two days of cost reports, email threads, and meeting notes.",
    watch: [
      "Snowflake numbers (blue) and the reasons from conversations and docs (purple), in one answer",
      "Every claim links to its source",
      "Glean drafts the owner update for her",
    ],
    slug: "project-executive",
    role: "Project Executive",
    person: "maria",
    question: "Why are we over on concrete at Riverbend?",
    how: "Snowflake numbers + the story behind them",
    howLogos: ["snowflake", "teams", "webex", "outlook"],
    title: "One answer with both halves",
    steps: [
      { cta: "Ask Glean", caption: "Maria asks **one question**.", ms: 4200 },
      { cta: "See the answer", caption: "Glean checks **Snowflake** and **everything else**.", ms: 5200 },
      { cta: "Why did it happen?", caption: "The numbers: **straight from Snowflake**.", ms: 5000 },
      { cta: "Find the money", caption: "The reasons: **RFIs, email, meetings**. All cited.", ms: 6500 },
      { cta: "Draft the owner update", caption: "Then it **finds $326K** to recover.", ms: 6000 },
      { cta: "See the outcome", caption: "And **drafts the owner email**.", ms: 6500 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
  {
    id: "field",
    before: "ServiceNow forms and 3 follow-ups",
    after: "1 Teams message. Request filed for him.",
    name: "Luis Romero",
    where: "Microsoft Teams",
    whereLogo: "teams",
    recap: "Work done in ServiceNow, from Teams",
    situation:
      "Luis is the superintendent at Riverbend. Priya, a new field engineer, starts Monday. Today that means a ServiceNow form, three follow-ups, and hoping her laptop arrives in time.",
    watch: [
      "Luis never leaves Teams",
      "Glean builds the request from Clayco's own onboarding standard",
      "Glean files the request in ServiceNow and routes the approval",
    ],
    slug: "superintendent",
    role: "Superintendent",
    person: "luis",
    question: "My new field engineer starts Monday. Get her set up.",
    how: "Acts in ServiceNow, from Teams",
    howLogos: ["teams", "servicenow", "okta", "snowflake"],
    title: "Fixed, not filed",
    steps: [
      { cta: "Send to Glean", caption: "Luis asks **right in Teams**.", ms: 4200 },
      { cta: "See the Day 1 kit", caption: "Glean checks **five systems** for him.", ms: 5000 },
      { cta: "File it in ServiceNow", caption: "The **full Day 1 kit**, from Clayco's own standard.", ms: 6000 },
      { cta: "Send Kim the approval", caption: "**One click.** Filed in ServiceNow.", ms: 5500 },
      { cta: "Finish up", caption: "Kim approves **right in Teams**.", ms: 5000 },
      { cta: "See the outcome", caption: "ServiceNow **updates itself**.", ms: 5000 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
  {
    id: "data",
    before: "The agent knows the numbers, not why",
    after: "Add Glean as one tool. Now it knows why.",
    name: "Kim Alvarez",
    where: "Snowflake Intelligence",
    whereLogo: "snowflake",
    recap: "Your Snowflake agents, now with context",
    situation:
      "Clayco's Data & AI team built a Concrete Pour Agent in Snowflake, and people love it for the numbers. Kim, a project manager, asks it why costs jumped. It can't say.",
    watch: [
      "Glean is added to the agent as one tool",
      "The agent answers as Kim, with Kim's permissions",
      "No pipelines or permission syncing to build",
    ],
    slug: "data-team",
    role: "Data & AI Team",
    person: "kim",
    personLabel: "Your Concrete Pour Agent",
    question: "Our agent knows the numbers. Can it know why?",
    how: "Glean inside Snowflake Intelligence",
    howLogos: ["snowflake", "glean"],
    title: "The concrete agent, upgraded",
    steps: [
      { cta: "Add Glean to the agent", caption: "Your agent knows the numbers. **Not why.**", ms: 5500 },
      { cta: "Ask the same question again", caption: "Add Glean as **one tool**. That's it.", ms: 5000 },
      { cta: "See the new answer", caption: "Snowflake for numbers. **Glean for context.**", ms: 5200 },
      { cta: "What did your team skip building?", caption: "Same agent. **Now it knows why.**", ms: 6500 },
      { cta: "See the outcome", caption: "**No pipelines.** Your team keeps building.", ms: 6000 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
  {
    id: "security",
    before: "Will AI leak what people shouldn't see?",
    after: "Each person sees only what they already can",
    name: "Security review",
    where: "Glean Assistant",
    whereLogo: "glean",
    recap: "The right answer for each person",
    situation:
      "Before anything goes live, security asks the hard question: what happens when someone asks about something they shouldn't see? Maria, Luis, and Priya all ask about a supplier dispute.",
    watch: [
      "Each person gets a different answer, and each answer is correct for them",
      "Glean applies the permissions already in M365 and Snowflake",
      "Every answer is logged",
    ],
    slug: "security",
    role: "CISO / IT Security",
    person: null,
    personLabel: "Security review",
    question: "Can AI leak the Northline dispute?",
    how: "Same question, the right answer for each person",
    howLogos: ["outlook", "teams", "snowflake", "sharepoint"],
    title: "Same question, the right answer for each person",
    steps: [
      { cta: "See Maria's answer", caption: "Three people. **Same sensitive question.**", ms: 4200 },
      { cta: "See Luis's answer", caption: "Maria leads the project: **sees everything**.", ms: 5200 },
      { cta: "See Priya's answer", caption: "Luis runs the field: **site details, costs summarized**.", ms: 5800 },
      { cta: "Why are they different?", caption: "Priya is new: **nothing about the dispute**.", ms: 5000 },
      { cta: "See the outcome", caption: "Permissions **checked at the source**. Every answer logged.", ms: 6500 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
];

export const SCENARIO =
  "Riverbend Data Center, Building 2: concrete is running over budget.";

export const CLOSE_SLUG = "next-step";
