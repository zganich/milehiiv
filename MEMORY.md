# Long-Term Memory

MileHiiv is the current priority for code and payment work. Stripe CLI is authenticated for the `careerswarm` account, and local webhook forwarding to `/api/stripe/webhook` has been verified in test mode.
The live monthly Stripe price ID for MileHiiv is `price_1T7ihbRGBj1peK9YyLjUOqtZ`, and the live one-time report price ID is `price_1TIpRKRGBj1peK9Y0EmqwiEm`. Production Vercel Stripe env vars are now set, and a bad newline in `NEXT_PUBLIC_APP_URL` once caused Stripe checkout to reject the `success_url` until it was corrected.

For multi-tool work, keep the lanes aligned: Codex handles code, shell, git, and browser verification; Claude handles Notion, strategy, and handoff; OpenClaw handles autonomous tasks and scheduled delivery; Firecrawl handles web research and scraping. Keep the active task, project, and next step synchronized before moving between tools.

When a Codex session ends, always hand back a concise shipped-summary plus any blockers so Claude can update Notion and keep the shared task state current.

James always wants clear next steps and best practices. Default to SOP-style guidance when possible: state the goal, the recommended sequence, the decision points, the risks, and the next action. Avoid vague summaries when a concrete operating procedure would help.

When transferring work to Claude, include everything needed for continuity: what was changed, what was verified, what is blocked, what the next step is, and any relevant setup or coordination details. Do not trim handoffs down to a minimal summary if it risks losing context.

If a legacy feature path is getting expensive to untangle, prefer a clean rebuild when it is the faster and more token-efficient option. Start fresh rather than forcing old structure to fit if that reduces risk and churn.
- Shared Personal OS bootstrap: global files first, then `~/.personal_os/REGISTRY.toml`, `~/.personal_os/STATE.md`, and `~/.personal_os/MEMORY.md`, then this project's local files.
- The project root is authoritative even if another LLM worked here first.
