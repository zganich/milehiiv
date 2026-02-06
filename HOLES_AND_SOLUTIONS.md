# MileHiiv: Holes & Solutions Analysis

**Problem:** Getting mileage data from gig companies is hard. They're closed systems, exports are poor, and drivers forget to track. Deadhead miles (driving without a fare) are key for taxes but hardest to capture.

---

## 🕳️ Current Holes

### 1. **PDF Parsing is Too Simple**
```javascript
// Current code - just regex
/(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d+)\s+(\d+)/g
```
- Won't work for most real gig exports
- Falls back to sample data if nothing matches
- No platform-specific handling

### 2. **No Gig Platform-Specific Parsers**
Each platform exports differently:
| Platform | Export Format | What's Included | What's Missing |
|----------|---------------|-----------------|----------------|
| **Uber** | CSV + tax summary PDF | Trips with miles | Deadhead miles |
| **Lyft** | CSV + tax summary | Trips with miles | Deadhead miles |
| **DoorDash** | Weekly summary PDF | Earnings, partial miles | Most mileage data |
| **Instacart** | Earnings only | $$ only | ALL mileage |
| **Amazon Flex** | Blocks/routes | Block earnings | Per-mile breakdown |
| **Spark (Walmart)** | Minimal | Earnings only | ALL mileage |

### 3. **Deadhead Miles Not Captured**
**This is the real tax goldmine.** IRS allows deduction for:
- Driving TO first pickup
- Driving BETWEEN deliveries
- Driving HOME after last delivery
- Driving while app is on but no ride/delivery

Gig companies ONLY report paid trip miles. Deadhead can be 30-50% of total driving.

### 4. **No Location/GPS Integration**
- Can't auto-track in background
- No Google Timeline import
- No way to fill gaps automatically

### 5. **Gap Detection is Naive**
- Only looks at date gaps
- Doesn't understand deadhead concept
- Doesn't correlate with earnings data

---

## 💡 Solutions (Ranked by Feasibility)

### 🥇 **1. Google Timeline Import (BEST OPTION)**

**Why it's gold:**
- Google already tracks EVERY drive (if location history is on)
- Drivers don't have to do anything extra
- Shows ALL miles, not just gig miles
- Can retroactively import past data

**How it works:**
1. User exports Google Timeline (takeout.google.com → Location History)
2. MileHiiv parses the JSON
3. Correlate with gig earnings to classify trips

**Implementation:**
```
Timeline JSON → Parse all driving segments → 
Match with gig trip times → 
Remaining segments = Deadhead/Personal
```

**Effort:** Medium (2-3 days to build parser)

---

### 🥈 **2. Screenshot/Photo OCR with AI Vision**

**Why it works:**
- Drivers already screenshot their earnings
- Works for ANY platform without API access
- GPT-4 Vision or Claude can parse screenshots

**How it works:**
1. Driver uploads screenshot of Uber/DoorDash earnings
2. AI Vision extracts: date, trips, miles, earnings
3. Import into MileHiiv

**Prompt example:**
```
Extract mileage data from this gig driver earnings screenshot.
Return JSON: { date, trips: [{start_time, end_time, miles, earnings}] }
```

**Effort:** Low-Medium (1-2 days, uses existing AI APIs)

---

### 🥉 **3. Platform-Specific CSV Parsers**

**Uber CSV columns:**
```
Trip Date, Trip Start Time, Trip End Time, Miles, Earnings, etc.
```

**Lyft CSV columns:**
```
Date, Ride Type, Distance (mi), Earnings, etc.
```

Build parsers for each:
- Uber Driver CSV
- Lyft Driver CSV  
- DoorDash (if available)
- Instacart (limited)

**Effort:** Medium (1 day per platform)

---

### 4. **Email Receipt Parsing**

**How it works:**
- Driver forwards trip receipts to receipts@milehiiv.com
- Parse email for: date, time, miles, pickup/dropoff
- Auto-create trips

**Or:** Connect via Gmail API (OAuth) to auto-scan.

**Challenges:**
- Need email infrastructure
- Email formats vary
- Privacy concerns

**Effort:** High (email infra + parsing)

---

### 5. **Bank Statement Gas Correlation**

**Idea:** Gas purchases prove driving. Cross-reference with gaps.

**How:**
- Import bank/CC statement (Plaid or CSV)
- Find gas purchases
- Estimate miles (gallons × MPG)
- Fill gaps with estimated deadhead

**Effort:** Medium-High (Plaid integration)

---

### 6. **Smart Manual Logging**

Make manual tracking FAST:
- "Quick log" button: "I drove today"
- Voice input: "Log 45 miles for DoorDash"
- Widget on phone home screen
- End-of-day reminder: "You earned $X today. How many total miles?"

**Key insight:** If you can get drivers to enter TOTAL daily miles, you can calculate deadhead from:
```
Deadhead = Total miles - Gig-reported miles
```

**Effort:** Low (UI work)

---

## 🎯 Recommended Build Order

### Phase 1: Quick Wins (This Week)
1. **Screenshot OCR** — Use GPT-4 Vision to parse earnings screenshots
2. **Smart manual logging** — "Total miles today" quick entry
3. **Better CSV parsers** — Uber + Lyft specific

### Phase 2: Game Changer (Next 2 Weeks)
4. **Google Timeline import** — This is the killer feature
5. **Auto deadhead calculation** — Timeline miles - Gig miles = Deadhead

### Phase 3: Polish (Month 2)
6. **Email receipt parsing** — For power users
7. **Bank correlation** — As validation/backup

---

## 🧮 Deadhead Calculation Logic

```
For each day:
  total_miles = Google Timeline driving distance
  gig_miles = Sum of gig platform reported miles
  
  deadhead_miles = total_miles - gig_miles
  
  If deadhead_miles > 0:
    → These are deductible business miles!
    
  If deadhead_miles < 0:
    → Data error, flag for review
```

**Tax implication:**
- IRS rate 2024: $0.67/mile
- Average gig driver: 20,000 miles/year
- If 40% is deadhead: 8,000 unreported miles
- **Tax savings: $5,360** (at 25% bracket: **$1,340 refund**)

---

## 📱 UX Flow for Data Acquisition

```
┌─────────────────────────────────────┐
│  How do you want to add miles?      │
├─────────────────────────────────────┤
│                                     │
│  📸 Upload Screenshot               │
│     Take a pic of your earnings     │
│                                     │
│  📄 Import CSV/PDF                  │
│     From Uber, Lyft, DoorDash       │
│                                     │
│  🗺️ Import Google Timeline          │
│     Auto-import all your drives     │
│                                     │
│  ✏️ Quick Log                        │
│     "I drove 45 miles today"        │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔧 Technical Implementation Notes

### Google Timeline Parser

Google Takeout Location History is JSON:
```json
{
  "timelineObjects": [
    {
      "activitySegment": {
        "startLocation": {...},
        "endLocation": {...},
        "duration": {"startTimestamp": "...", "endTimestamp": "..."},
        "distance": 12345,  // meters
        "activityType": "IN_VEHICLE"
      }
    }
  ]
}
```

Filter for `activityType: "IN_VEHICLE"` → sum distances → convert to miles.

### Screenshot OCR (GPT-4 Vision)

```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [{
    role: "user",
    content: [
      { type: "text", text: "Extract mileage data from this gig driver screenshot. Return JSON with date, platform, trips (with miles), and total earnings." },
      { type: "image_url", image_url: { url: base64Image } }
    ]
  }]
});
```

---

## 💰 Monetization Angle

**Free tier:**
- Manual logging
- Basic CSV import
- 100 trips/year

**Pro tier ($9.99/mo or $79/year):**
- Unlimited trips
- Screenshot OCR
- Google Timeline import
- Deadhead auto-calculation
- Tax report export

**Tax season upsell ($29 one-time):**
- Full year IRS-ready report
- Audit protection documentation
- CPA-ready export

---

## 🚀 Next Steps

1. [ ] Build Google Timeline parser (biggest impact)
2. [ ] Add GPT-4 Vision screenshot upload
3. [ ] Improve Uber/Lyft CSV parsers
4. [ ] Add "Quick log total miles" feature
5. [ ] Build deadhead calculation: Timeline - Gig = Deadhead
6. [ ] Tax report generator

---

*The driver who tracks deadhead miles gets 30-50% more deductions than one who only uses gig company reports. MileHiiv's job is to make capturing those miles effortless.*
