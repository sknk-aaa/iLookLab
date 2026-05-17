import { MAX_LABEL_CHARS } from "@/lib/constants";

export function truncateName(name: string, maxChars: number = MAX_LABEL_CHARS): string {
  if (!name) return "";
  const chars = Array.from(name);
  if (chars.length <= maxChars) return name;
  return chars.slice(0, maxChars).join("") + "…";
}
