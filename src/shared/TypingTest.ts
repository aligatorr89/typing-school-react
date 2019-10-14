export interface ITypingTest {
  wordCount: number;
  text: string[];
  startTime: number;
  currentWordTimeCounter: number;
}

export class TypingTest {
  protected wordCount: number;
  private text: string[];
  protected startTime: number;
  protected currentWordTimeCounter: number;

  constructor(textChunk: string[]) {
    this.wordCount = 0;
    this.text = textChunk;
  }

  public start() {
    this.setStartTime();
  }

  public pause() {
    console.log('pausing...');
  }

  public setStartTime() {
    this.startTime = Date.now();
    this.currentWordTimeCounter = this.startTime;
  }

  public getTimePassed() {
    return Date.now() - this.startTime;
  }

  public getCurrentWord() {
    return this.text[this.wordCount];
  }

  public getCurrentWordCount() {
    return this.wordCount;
  }

  public nextWord(typedWord: string) {
    const newDate = Date.now();
    // analytics.insert(typedWord, this.text[this.wordCount], newDate - this.currentWordTimeCounter);
    this.currentWordTimeCounter = newDate;
    this.wordCount++;
  }

  public analyze() {
    // return analytics.analyzePrevious();
  }

  public getLast100Results() {
    // return analytics.getLast100Results();
  }
}
