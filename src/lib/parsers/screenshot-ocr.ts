/**
 * Screenshot OCR Parser
 * Uses AI Vision (GPT-4 Vision or Claude) to extract mileage data from gig app screenshots
 * 
 * Supports:
 * - Uber driver earnings screenshots
 * - Lyft driver earnings screenshots
 * - DoorDash earnings screenshots
 * - Instacart earnings screenshots
 * - Any other gig platform screenshot
 */

export interface ExtractedTrip {
  date: string;
  startTime?: string;
  endTime?: string;
  miles?: number;
  earnings?: number;
  platform?: string;
  tripType?: string; // 'delivery', 'ride', 'batch', etc.
  pickupLocation?: string;
  dropoffLocation?: string;
}

export interface ScreenshotParseResult {
  success: boolean;
  platform: string | null;
  date: string | null;
  trips: ExtractedTrip[];
  totalMiles: number;
  totalEarnings: number;
  rawText?: string;
  error?: string;
}

const EXTRACTION_PROMPT = `You are an expert at extracting mileage and earnings data from gig driver app screenshots.

Analyze this screenshot and extract ALL mileage/trip data you can find.

Return a JSON object with this exact structure:
{
  "platform": "uber" | "lyft" | "doordash" | "instacart" | "amazon_flex" | "spark" | "grubhub" | "unknown",
  "date": "YYYY-MM-DD" (the date shown, or null if not visible),
  "trips": [
    {
      "date": "YYYY-MM-DD",
      "startTime": "HH:MM" (24h format, if shown),
      "endTime": "HH:MM" (if shown),
      "miles": number (decimal, if shown),
      "earnings": number (decimal, if shown),
      "tripType": "ride" | "delivery" | "batch" | "block" | "unknown",
      "pickupLocation": "string" (if shown),
      "dropoffLocation": "string" (if shown)
    }
  ],
  "totalMiles": number (sum of all miles, or total shown),
  "totalEarnings": number (sum of all earnings, or total shown),
  "rawText": "any relevant text you extracted"
}

Rules:
- Extract EVERY trip you can see
- If miles aren't shown but distance is (e.g., "5.2 mi"), convert to miles
- If only total miles are shown (not per-trip), put that in totalMiles
- If you can't determine something, use null
- For dates, use the format YYYY-MM-DD
- For money, extract just the number (no $ sign)
- If the screenshot shows a summary/total, extract that too

Be thorough - drivers need this for taxes.`;

/**
 * Extract mileage data from a screenshot using AI Vision
 */
export async function parseScreenshot(
  imageBase64: string,
  apiKey: string,
  model: 'gpt-4-vision-preview' | 'gpt-4o' | 'claude-3-opus' = 'gpt-4o'
): Promise<ScreenshotParseResult> {
  try {
    if (model.startsWith('gpt')) {
      return await parseWithOpenAI(imageBase64, apiKey, model);
    } else {
      return await parseWithClaude(imageBase64, apiKey);
    }
  } catch (error) {
    return {
      success: false,
      platform: null,
      date: null,
      trips: [],
      totalMiles: 0,
      totalEarnings: 0,
      error: `Screenshot parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function parseWithOpenAI(
  imageBase64: string,
  apiKey: string,
  model: string
): Promise<ScreenshotParseResult> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: EXTRACTION_PROMPT },
            {
              type: 'image_url',
              image_url: {
                url: imageBase64.startsWith('data:') 
                  ? imageBase64 
                  : `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content in OpenAI response');
  }

  const parsed = JSON.parse(content);
  
  return {
    success: true,
    platform: parsed.platform || null,
    date: parsed.date || null,
    trips: (parsed.trips || []).map((t: any) => ({
      date: t.date || parsed.date,
      startTime: t.startTime,
      endTime: t.endTime,
      miles: t.miles ? parseFloat(t.miles) : undefined,
      earnings: t.earnings ? parseFloat(t.earnings) : undefined,
      platform: parsed.platform,
      tripType: t.tripType,
      pickupLocation: t.pickupLocation,
      dropoffLocation: t.dropoffLocation
    })),
    totalMiles: parsed.totalMiles ? parseFloat(parsed.totalMiles) : 0,
    totalEarnings: parsed.totalEarnings ? parseFloat(parsed.totalEarnings) : 0,
    rawText: parsed.rawText
  };
}

async function parseWithClaude(
  imageBase64: string,
  apiKey: string
): Promise<ScreenshotParseResult> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
              }
            },
            {
              type: 'text',
              text: EXTRACTION_PROMPT + '\n\nRespond with ONLY the JSON object, no other text.'
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Claude API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;
  
  if (!content) {
    throw new Error('No content in Claude response');
  }

  // Extract JSON from response (Claude might include extra text)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in Claude response');
  }

  const parsed = JSON.parse(jsonMatch[0]);
  
  return {
    success: true,
    platform: parsed.platform || null,
    date: parsed.date || null,
    trips: (parsed.trips || []).map((t: any) => ({
      date: t.date || parsed.date,
      startTime: t.startTime,
      endTime: t.endTime,
      miles: t.miles ? parseFloat(t.miles) : undefined,
      earnings: t.earnings ? parseFloat(t.earnings) : undefined,
      platform: parsed.platform,
      tripType: t.tripType,
      pickupLocation: t.pickupLocation,
      dropoffLocation: t.dropoffLocation
    })),
    totalMiles: parsed.totalMiles ? parseFloat(parsed.totalMiles) : 0,
    totalEarnings: parsed.totalEarnings ? parseFloat(parsed.totalEarnings) : 0,
    rawText: parsed.rawText
  };
}

/**
 * Validate and clean extracted data
 */
export function validateExtraction(result: ScreenshotParseResult): ScreenshotParseResult {
  // Filter out trips with no useful data
  const validTrips = result.trips.filter(trip => 
    trip.miles !== undefined || trip.earnings !== undefined
  );

  // Recalculate totals if we have trip data
  let totalMiles = result.totalMiles;
  let totalEarnings = result.totalEarnings;
  
  if (validTrips.length > 0) {
    const tripMilesSum = validTrips.reduce((sum, t) => sum + (t.miles || 0), 0);
    const tripEarningsSum = validTrips.reduce((sum, t) => sum + (t.earnings || 0), 0);
    
    // Use the higher of calculated sum or reported total
    totalMiles = Math.max(totalMiles, tripMilesSum);
    totalEarnings = Math.max(totalEarnings, tripEarningsSum);
  }

  return {
    ...result,
    trips: validTrips,
    totalMiles,
    totalEarnings
  };
}
