import { isTodo } from '@/content/todo';

/** Renders an outstanding owner-supplied value so it is impossible to miss. */
export function Todo({ value }: { value: string }) {
  if (!isTodo(value)) return <>{value}</>;
  return <span className="todo">{value}</span>;
}
