export interface IAnalytics {
  data: IAnalyticsData[];
  prevChunkStart: number;
  prevChunkEnd: number;
  insert(word: string, correctWord: string, timeNeeded: number): void;
}

export interface IAnalyticsData {
  textId?: number,
  word: string;
  correctWord: string;
  timeNeeded: number;
}

export interface IAnalyticsResult {
  textId: number,
  words: number;
  timeNeeded: number;
  mistakes: number;
  failedWords: IAnalyticsResultFailedWords[];
  correctWordCharacters: number;
  allWordCharacters: number;
  wpm: number;
  wpm_standard: number;
}
export class AnalyticsResult implements IAnalyticsResult {
  textId: number;
  words: number;
  timeNeeded: number;
  mistakes: number;
  failedWords: IAnalyticsResultFailedWords[];
  correctWordCharacters: number;
  allWordCharacters: number;
  wpm: number;
  wpm_standard: number;
  constructor() {
    this.textId = 0,
    this.words = 0;
    this.timeNeeded = 0;
    this.mistakes = 0;
    this.failedWords = [];
    this.correctWordCharacters = 0;
    this.allWordCharacters = 0;
    this.wpm = 0;
    this.wpm_standard = 0;
  }
}

export type IAnalyticsResultFailedWords = {
  correct: string,
  actual: string
};

export class Analytics implements IAnalytics {
  data: IAnalyticsData[];
  prevChunkEnd: number;
  prevChunkStart: number;

  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
    // this.dbConnection = new indexedDb();
  }

  insert(word: string, correctWord: string, timeNeeded: number): void {
    word = word.replace(' ', '');
    this.data.push({
      word, correctWord, timeNeeded
    });
  }

  analyzePrevious() {
    this.prevChunkEnd = this.data.length;
    const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);
    return this.analyze(previous);
  }

  analyzeAll() {
    return this.analyze(this.data);
  }

  private analyze(dataChunk: IAnalyticsData[]) {
    const result = new AnalyticsResult();
    for(let i = 0; i < dataChunk.length; i++) {
      const current = dataChunk[i];
      result.words += 1;
      result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;
      if(current.word !== current.correctWord && current.word) {
        result.failedWords.push({
          correct: current.correctWord,
          actual: current.word
        });
        result.mistakes += 1;
      }
      else {
        result.correctWordCharacters += current.word.length + 1;
      }
      result.allWordCharacters += current.word.length + 1;
    }
    this.prevChunkStart = this.prevChunkEnd;

    result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);
    result.wpm_standard = Math.round(result.correctWordCharacters / 5
      * (100 * 60000 / result.timeNeeded) / 100);
    // this.dbConnection.insertData('analytics', result);
    return result;
  }
}
