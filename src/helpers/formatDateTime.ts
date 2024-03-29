export enum DateTimeFormattingConfig {
  MonthYearOnly,
  DayShortMonthYear
}

type DateTimeFormattingOptions = {
  locale: string;
  options: Intl.DateTimeFormatOptions;
  replacer?: (arg1: string) => string;
};

const ConfigMonthYearOnly: DateTimeFormattingOptions = {
  locale: "en-US",
  options: {
    month: "short",
    year: "numeric"
  }
};

const ConfigDayShortMonthYear: DateTimeFormattingOptions = {
  locale: "en-US",
  options: {
    day: "numeric",
    month: "short",
    year: "numeric"
  },
  replacer: (dateString: string) => dateString.replace(",", " ")
};

const configEnumMap: {
  [key in DateTimeFormattingConfig]: DateTimeFormattingOptions;
} = {
  [DateTimeFormattingConfig.MonthYearOnly]: ConfigMonthYearOnly,
  [DateTimeFormattingConfig.DayShortMonthYear]: ConfigDayShortMonthYear
};

const defaultConfig = ConfigDayShortMonthYear;

export const formatDateTime = (
  date: Date,
  config: DateTimeFormattingOptions | DateTimeFormattingConfig = defaultConfig
) => {
  // I HAVE NO IDEA WHY THIS BUG DOES NOT EXISTS ON GITHUB ACTIONS??
  // // @TODO: Figure out why Astro removes one day to dates??
  // let newDate = new Date(date);
  // newDate.setDate(newDate.getDate() + 1);

  const applyConfig = (config: DateTimeFormattingOptions) => {
    const { locale, options, replacer } = config;
    let result = date.toLocaleDateString(locale, options);

    if (replacer) {
      result = replacer(result);
    }

    return result;
  };

  if (typeof config === "number") {
    return applyConfig(configEnumMap[config]);
  }

  return applyConfig(config);
};
