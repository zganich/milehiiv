# 🚀 MileHiiv Launch Checklist

**Status:** Ready to launch  
**Build:** ✅ Passing  
**Vulnerabilities:** ✅ 0 found  

---

## 1️⃣ DNS Configuration (CRITICAL - Do First!)

**Current:** `milehiiv.com` → `192.64.119.233` (registrar parking page)  
**Needed:** `milehiiv.com` → `76.76.19.19` (Vercel)

### Steps:
1. Log into your domain registrar (likely where you bought milehiiv.com)
2. Find DNS settings / DNS Management
3. **Delete** existing A record for `@` or `milehiiv.com`
4. **Add new** A record:
   - Host: `@` (or leave blank)
   - Type: `A`
   - Value: `76.76.19.19`
   - TTL: 300 (or lowest available)
5. Add CNAME for www:
   - Host: `www`
   - Type: `CNAME`
   - Value: `cname.vercel-dns.com`
   - TTL: 300

**Propagation:** 5-30 minutes typically, up to 48 hours worst case.

**Verify:** `dig milehiiv.com A +short` should return `76.76.19.19`

---

## 2️⃣ Vercel Environment Variables

Go to: https://vercel.com/dashboard → milehiiv → Settings → Environment Variables

### Required Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres` | From Supabase |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[PROJECT].supabase.co` | From Supabase dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | From Supabase → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | From Supabase → API → service_role key (KEEP SECRET) |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` | Min 32 chars, random |
| `JWT_EXPIRES_IN` | `7d` | Token expiration |
| `NEXT_PUBLIC_APP_URL` | `https://milehiiv.com` | Your production URL |
| `NEXT_PUBLIC_API_URL` | `https://milehiiv.com` | Same as above |
| `OPENAI_API_KEY` | `sk-...` | For screenshot OCR feature |
| `MAX_FILE_SIZE` | `10485760` | 10MB in bytes |

### How to get Supabase values:
1. Go to https://supabase.com/dashboard
2. Select your MileHiiv project
3. Settings → API
4. Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
7. Settings → Database → Connection string → `DATABASE_URL`

---

## 3️⃣ Disable Vercel Deployment Protection

Without this, visitors get a login wall!

1. Go to: https://vercel.com/dashboard → milehiiv → Settings → Deployment Protection
2. **Standard Protection:** Set to `Disabled` for Production (or "Only Preview Deployments")
3. Save

---

## 4️⃣ Trigger a New Deployment

After setting env vars:

```bash
cd /Users/jamesknight/GitHub/milehiiv
git add -A
git commit -m "Add pricing page, fix vercel config"
git push origin main
```

Or from Vercel dashboard: Deployments → ⋮ → Redeploy

---

## 5️⃣ Verify Launch

Once DNS propagates and deployment is live:

- [ ] `curl -I https://milehiiv.com` returns 200
- [ ] Homepage loads with no errors
- [ ] `/pricing` page loads
- [ ] `/register` page works
- [ ] `/login` page works
- [ ] Test account creation
- [ ] Test PDF upload

---

## 6️⃣ Stripe Setup (For Paid Subscriptions)

**Not wired yet** — app is functional without it. Users can use free tier.

When ready to accept payments:

1. Create Stripe account at stripe.com
2. Get API keys from Dashboard → Developers → API keys
3. Add to Vercel:
   - `STRIPE_SECRET_KEY`: `sk_live_...`
   - `STRIPE_PUBLISHABLE_KEY`: `pk_live_...`
   - `STRIPE_WEBHOOK_SECRET`: Create webhook for `/api/webhooks/stripe`
4. Create Products in Stripe:
   - **Pro Monthly:** $9.99/month, recurring
   - **Pro Yearly:** $79/year, recurring (34% discount)
5. Wire up checkout API (not yet implemented)

---

## 🔥 Quick Launch Commands

```bash
# Check DNS
dig milehiiv.com A +short
# Expected: 76.76.19.19

# Check if site is up
curl -I https://milehiiv.com 2>/dev/null | head -1
# Expected: HTTP/2 200

# Deploy latest
cd /Users/jamesknight/GitHub/milehiiv && git add -A && git commit -m "Launch prep" && git push
```

---

## ⚠️ Known Limitations at Launch

1. **Stripe not wired** — Pricing page shows plans but checkout isn't connected
2. **Screenshot OCR** — Requires OPENAI_API_KEY to work
3. **Google Timeline import** — API endpoint exists but UI may need polish

These are fine for launch. Core functionality (account creation, manual trip logging, CSV import, dashboard) works.

---

## 📊 What's Working

✅ User registration & login  
✅ Dashboard  
✅ Manual trip logging  
✅ CSV import  
✅ PDF upload  
✅ Mileage summary  
✅ Gap detection  
✅ Pricing page  

---

## 🎯 Post-Launch Priority

1. Wire Stripe checkout
2. Add Google OAuth for easier signup
3. Polish mobile experience
4. Add email verification

---

**Created:** 2026-02-06  
**Last Updated:** 2026-02-06
