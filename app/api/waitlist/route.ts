import { createHash } from "node:crypto";

/**
 * Waitlist signups.
 *
 * Mailchimp is enabled by setting these env vars (e.g. in .env.local):
 *   MAILCHIMP_API_KEY       e.g. "xxxxxxxx-us21" (the suffix after "-" is the data center)
 *   MAILCHIMP_AUDIENCE_ID   Audience → Settings → "Audience name and defaults" → Audience ID
 *   MAILCHIMP_SOURCE_FIELD  merge tag for "How did you hear about us?"   (default SOURCE)
 *   MAILCHIMP_MOTIVE_FIELD  merge tag for "What motivates you to join?"  (default MOTIVE)
 * Both merge fields must exist in the audience (Audience → Settings → Audience fields).
 * Until the keys are set, signups are only written to the server log.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = clean(body.email, 254).toLowerCase();
  const source = clean(body.source, 200);
  const motivation = clean(body.motivation, 1000);

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audience = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audience) {
    console.info("[waitlist] Mailchimp is not configured yet, signup:", { email, source, motivation });
    return Response.json({ ok: true });
  }

  const dc = apiKey.split("-").pop();
  const hash = createHash("md5").update(email).digest("hex");
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audience}/members/${hash}`;

  // PUT = add or update, so signing up twice is not an error
  const headers = {
    Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: {
        [process.env.MAILCHIMP_SOURCE_FIELD || "SOURCE"]: source,
        [process.env.MAILCHIMP_MOTIVE_FIELD || "MOTIVE"]: motivation,
      },
    }),
  });

  if (!res.ok) {
    console.error("[waitlist] Mailchimp error", res.status, await res.text());
    return Response.json({ error: "We couldn’t add you right now. Please try again later." }, { status: 502 });
  }

  // tag the contact so waitlist signups are easy to segment; a failure here is not fatal
  await fetch(`${url}/tags`, {
    method: "POST",
    headers,
    body: JSON.stringify({ tags: [{ name: "waitlist", status: "active" }] }),
  }).catch((err) => console.error("[waitlist] Mailchimp tag error", err));

  return Response.json({ ok: true });
}
