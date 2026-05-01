type Handler = (() => void) | undefined;

let handler: Handler;

export function setUnauthorizedHandler(next: Handler): void {
  handler = next;
}

export function notifyUnauthorized(): void {
  handler?.();
}
