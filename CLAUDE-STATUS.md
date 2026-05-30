# Sprint 2 Status

Stripe Checkout is complete for MileHiiv.

## Shipped

- Wired hosted Stripe Checkout for the existing pricing page.
- Added shared Stripe plan config and checkout helpers.
- Added webhook handling for `checkout.session.completed` and `invoice.paid`.
- Documented required Stripe env vars and setup steps.
- Updated the pricing page to show success, cancel, and error states.

## Verified

- `npx tsc --noEmit` passes.
- Stripe CLI is authenticated for the `careerswarm` account.
- Local webhook forwarding works.
- A real browser checkout in Stripe test mode completed successfully.
- The app redirected to `/pricing?checkout=success`.
- The webhook returned `200` and logged the completed checkout event.

## Notes

- I removed an unnecessary `STRIPE_SECRET_KEY` dependency from the webhook route so signature verification only depends on `STRIPE_WEBHOOK_SECRET`.
- Production still needs the real Stripe secret, webhook secret, and both price IDs.

## Next

- Set production Stripe env vars.
- Run one live smoke test in production after the envs are live.
