/**
 * Tracks user responses to a Google Sheets webhook.
 *
 * Replace WEBHOOK_URL with your deployed Google Apps Script URL.
 * See README for setup instructions.
 */

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || '';

// Generate a unique session ID per visit
const SESSION_ID = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function trackResponse({ step, question, answer, category, emoji }) {
  if (!WEBHOOK_URL) return;

  const payload = {
    sessionId: SESSION_ID,
    timestamp: new Date().toISOString(),
    step,
    question,
    answer,
    category,
    emoji,
  };

  // Fire-and-forget — don't block the UI
  fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently fail — don't disrupt the experience
  });
}
