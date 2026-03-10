import { getHistory } from "@/lib/historyStore";
import { ActivityCard } from "./ActivityCard";
import { ScreenWrapper } from "./ScreenWrapper";
import { PrimaryButton } from "./PrimaryButton";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface HistoryTabProps {
  onBack: () => void;
}

export function HistoryTab({ onBack }: HistoryTabProps) {
  const { t } = useTranslation();
  const history = getHistory();

  return (
    <ScreenWrapper>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-6">📋 {t('history_title')}</h1>
      {history.length === 0 ? (
        <ActivityCard>
          <p className="text-muted-foreground text-center text-justify-all">{t('history_empty')}</p>
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
                <span className="font-medium">{t('label_thought')}</span> "{entry.thought}"
              </p>
              {entry.reflection && (
                <p className="text-sm text-muted-foreground text-justify-all">
                  <span className="font-medium">{t('label_reflection')}</span> "{entry.reflection}"
                </p>
              )}
            </ActivityCard>
          ))}
        </div>
      )}
      <div className="mt-6">
        <PrimaryButton variant="outline" onClick={onBack}>{t('btn_back_to_home')}</PrimaryButton>
      </div>
    </ScreenWrapper>
  );
}
