/**
 * Returns `next` only when it is a same-site path, so `?next=` can't be used
 * to bounce a freshly signed-in user to another site.
 */
export function safeNext(next: string | null, fallback = "/counters"): string {
  if (
    !next ||
    !next.startsWith("/") ||
    next.startsWith("//") ||
    next.startsWith("/\\")
  ) {
    return fallback;
  }
  return next;
}
