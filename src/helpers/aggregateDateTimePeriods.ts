import type { DateTimeDifference } from "./DateDifference";

type TimePeriod = { startDate: Date; endDate?: Date };

export const aggregateDateTimePeriods = (periods: TimePeriod[]) => {
  // Aggregate time in hours.
  let totalTimeHs = 0;

  for (const { startDate, endDate: providedEndDate } of periods) {
    const endDate = providedEndDate ?? new Date();
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    totalTimeHs += diffInHours;
  }

  // Convert totalTimeHs to years, months, and days.
  const totalTimeDays = totalTimeHs / 24;
  const years = Math.floor(totalTimeDays / 365);
  const remainingDaysAfterYears = totalTimeDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = Math.floor(remainingDaysAfterYears % 30);

  // Return time in Years, Months, and Days.
  return {
    years,
    months,
    days
  } as DateTimeDifference;
};
