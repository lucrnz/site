import getReadingTime from "reading-time";
import { markdownToTxt } from "markdown-to-txt";

const wordsPerMinute = 170;

type ReadingTimeResult = {
  text: string;
  minutes: number;
};

const toString = (contents: string): string => {
  // removeMarkdown(contents, {
  //   listUnicodeChar: false,
  //   stripListLeaders: true,
  //   gfm: true,
  //   useImgAltText: false
  // });

  return markdownToTxt(contents);
};

const adaptResult = (result: ReadingTimeResult): ReadingTimeResult => {
  result.minutes = Math.ceil(result.minutes);
  return result;
};

const getPostReadingTime = (postContentsMarkdown: string): ReadingTimeResult =>
  adaptResult(
    getReadingTime(toString(postContentsMarkdown), { wordsPerMinute })
  );

export default getPostReadingTime;
