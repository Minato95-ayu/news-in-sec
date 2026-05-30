const BLOCKED_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions|prompts)/i,
  /you\s+are\s+now\s+/i,
  /system\s*:\s*/i,
  /\boverride\b.*\bprompt\b/i,
  /\brole\s*:\s*(system|admin|assistant)\b/i,
  /\bdo\s+not\s+follow\b/i,
  /\bforget\s+(everything|all|your)\b/i,
  /<\/?script/i,
  /javascript\s*:/i,
];

export function sanitizeUserInput(input: string): string {
  let sanitized = input.trim();

  // Block suspicious patterns (prompt injection)
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(sanitized)) {
      throw new Error('Input contains disallowed patterns. Please rephrase your topic.');
    }
  }

  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Limit length
  sanitized = sanitized.slice(0, 500);

  if (sanitized.length < 3) {
    throw new Error('Topic must be at least 3 characters long.');
  }

  return sanitized;
}
