import { TScheduleFrequency } from "models/schdeule";

type CRecord<T extends { name: string }> = Record<T["name"], T>;

export const scheduleFrequency: CRecord<TScheduleFrequency> = {
  WEEKLY: { name: "WEEKLY", displayName: "Weekly" },
  "BI-WEEKLY": { name: "BI-WEEKLY", displayName: "Bi-weekly" },
  MONTHLY: { name: "MONTHLY", displayName: "Monthly" },
} as const;
