export interface HistoryEntry {
  id: string;
  date: string;
  technique: string;
  thought: string;
  reflection: string;
}

const STORAGE_KEY = "diffusion-history";

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistory(entry: Omit<HistoryEntry, "id" | "date">): void {
  const history = getHistory();
  history.unshift({
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
