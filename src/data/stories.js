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
      { cta: "Ask Glean", caption: "Maria asks one question, in plain English.", ms: 4200 },
      { cta: "See the answer", caption: "Glean gets the numbers from Snowflake and the reasons from everywhere else.", ms: 5200 },
      { cta: "Why did it happen?", caption: "The numbers come from the semantic view your team built.", ms: 5000 },
      { cta: "Find the money", caption: "The reasons come from RFIs, emails, and meeting transcripts. Every line is cited.", ms: 6500 },
      { cta: "Draft the owner update", caption: "Then it finds the money worth recovering.", ms: 6000 },
      { cta: "See the outcome", caption: "And it drafts the owner update, ready to send.", ms: 6500 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
  {
    id: "field",
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
      { cta: "Send to Glean", caption: "Luis asks Glean in Teams, where he already works.", ms: 4200 },
      { cta: "See the Day 1 kit", caption: "Glean checks Clayco's onboarding standard, Okta, Intune, and Snowflake.", ms: 5000 },
      { cta: "File it in ServiceNow", caption: "It builds the complete Day 1 kit and flags the one approval needed.", ms: 6000 },
      { cta: "Send Kim the approval", caption: "One click, and Glean files the request in ServiceNow for him.", ms: 5500 },
      { cta: "Finish up", caption: "The approval goes to Kim in Teams. She approves it right there.", ms: 5000 },
      { cta: "See the outcome", caption: "ServiceNow updates itself. Luis gets one message back.", ms: 5000 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
  {
    id: "data",
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
      { cta: "Add Glean to the agent", caption: "Your Concrete Pour Agent handles the numbers well. It can't see why they changed.", ms: 5500 },
      { cta: "Ask the same question again", caption: "Your team adds Glean as a tool. That is the whole integration.", ms: 5000 },
      { cta: "See the new answer", caption: "The agent asks Snowflake for the numbers and Glean for the context, as Kim.", ms: 5200 },
      { cta: "What did your team skip building?", caption: "Same agent, same question. Now it explains why.", ms: 6500 },
      { cta: "See the outcome", caption: "Your team skips the plumbing and keeps building semantic views.", ms: 6000 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
  {
    id: "security",
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
      { cta: "See Maria's answer", caption: "Three people ask Glean the same sensitive question.", ms: 4200 },
      { cta: "See Luis's answer", caption: "Maria leads the project. She sees the legal thread and the full costs.", ms: 5200 },
      { cta: "See Priya's answer", caption: "Luis runs the field. He sees what happened on site. His Snowflake role summarizes the costs.", ms: 5800 },
      { cta: "Why are they different?", caption: "Priya starts Monday. Nothing about the dispute appears for her.", ms: 5000 },
      { cta: "See the outcome", caption: "Glean checks permissions at the source for every question, and logs every answer.", ms: 6500 },
      { caption: "", ms: 5000, outcome: true },
    ],
  },
];

export const SCENARIO =
  "Riverbend Data Center, Building 2: concrete is running over budget.";

export const CLOSE_SLUG = "next-step";
