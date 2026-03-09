import { getHistory } from "@/lib/historyStore";
import { ActivityCard } from "./ActivityCard";
import { ScreenWrapper } from "./ScreenWrapper";
import { PrimaryButton } from "./PrimaryButton";
import { format } from "date-fns";

interface HistoryTabProps {
  onBack: () => void;
}

export function HistoryTab({ onBack }: HistoryTabProps) {
  const history = getHistory();

  return (
    <ScreenWrapper>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-6">📋 History</h1>
      {history.length === 0 ? (
        <ActivityCard>
          <p className="text-muted-foreground text-center text-justify-all">No activities completed yet. Try a technique to see your history here.</p>
        </ActivityCard>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <ActivityCard key={entry.id}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-foreground">{entry.technique}</span>
                <span className="text-sm text-muted-foreground">{format(new Date(entry.date), "MMMM d")}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1 text-justify-all">
                <span className="font-medium">Thought:</span> "{entry.thought}"
              </p>
              {entry.reflection && (
                <p className="text-sm text-muted-foreground text-justify-all">
                  <span className="font-medium">Reflection:</span> "{entry.reflection}"
                </p>
              )}
            </ActivityCard>
          ))}
        </div>
      )}
      <div className="mt-6">
        <PrimaryButton variant="outline" onClick={onBack}>Back to Home</PrimaryButton>
      </div>
    </ScreenWrapper>
  );
}
