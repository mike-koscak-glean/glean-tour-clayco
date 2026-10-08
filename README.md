# Clayco × Glean × Snowflake: Vision Demo (v2)

A guided, click-through "what it would be like to use Glean" asset for Clayco.
The theme: **Snowflake holds the numbers. Glean brings the context. Together, answers that act.**

All four stories share one fictional project: Riverbend Data Center, Building 2, where concrete is running over budget.

| # | Persona | Story | What it shows |
|---|---------|-------|---------------|
| 1 | Project Executive | "Why are we over on concrete at Riverbend?" | Snowflake numbers + reasons from RFIs, email, and WebEx in one cited answer; finds recoverable $; drafts the owner email |
| 2 | Superintendent | "My new field engineer starts Monday. Get her set up." | Glean in Teams builds the kit, files the ServiceNow request, routes approval in Teams |
| 3 | Data & AI Team | "Our agent knows the numbers. Can it know why?" | Snowflake Intelligence agent adds Glean as a tool; no pipelines or ACL rebuild |
| 4 | CISO / IT Security | "Can AI leak the Northline dispute?" | Same question, three people, three correct answers; permission matrix |

All people, projects, suppliers, and numbers are fictional. There is no Procore on screen.

## Routes

- `/`: landing page
- `/project-executive`, `/superintendent`, `/data-team`, `/security`: stories
- `/next-step`: close and the proposed 30-day side-by-side

## Recording the video

- `?autoplay=1` plays every story back to back, then the close.
- `?clean=1` hides the player controls. Captions stay.
- Keyboard: `→` / `Space` next, `←` back, `P` play/pause, `Esc` home.

Example: `/?autoplay=1&clean=1`

## Develop

```bash
npm install
npm run dev
```

Story script and captions: `src/data/stories.js`. Story screens: `src/v2/stories/`.

---

*Prepared for Clayco by the Glean team*
