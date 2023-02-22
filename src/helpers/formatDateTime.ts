export enum DateTimeFormatIntention {
  Resume,
  BlogPost
}

type IntentionConfig = {
  [key in DateTimeFormatIntention]: {
    locale: string;
    options: Intl.DateTimeFormatOptions;
    replacer?: (arg1: string) => string;
  };
};

const config: IntentionConfig = {
  [DateTimeFormatIntention.Resume]: {
    locale: "en-US",
    options: {
      month: "short",
      year: "numeric"
    }
  },
  [DateTimeFormatIntention.BlogPost]: {
    locale: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric"
    },
    replacer: (dateString) => dateString.replace(",", " ")
  }
};

export const formatDateTime = (
  date: Date,
  intention: DateTimeFormatIntention
) => {
  const { locale, options, replacer } = config[intention];
  let result = date.toLocaleDateString(locale, options);

  if (replacer) {
    result = replacer(result);
  }

  return result;
};
