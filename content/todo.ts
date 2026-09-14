/**
 * Placeholders for details only the owner can supply.
 *
 * Every one is prefixed `TODO_` so the whole outstanding list is one command:
 *
 *     pnpm check:todos
 *
 * They render in the copper/sun accent with a dashed underline, so nobody can
 * ship the site without noticing them.
 */
export const TODO_PREFIX = 'TODO_';

export function isTodo(value: string): boolean {
  return value.startsWith(TODO_PREFIX);
}
