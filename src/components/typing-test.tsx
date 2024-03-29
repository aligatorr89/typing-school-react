import * as React from 'react';
import { WordsText } from './words-text';
// import { TypingTest } from '../shared/TypingTest';

interface IProps {
  textChunk: string[];
  textChunkId: number;
}

interface IState {
  wordCount: number;
  startTime: number;
  currentWordTimeCounter: number;
  timer: number;
}

export class TypingTestComponent extends React.Component<IProps, IState> {
  protected timerIntervalId: number;
  protected userInput: React.RefObject<HTMLInputElement>;
  private allStates: IState[] = [];
  constructor(props: IProps) {
    super(props);
    this.state = {
      wordCount: 0,
      startTime: 0,
      currentWordTimeCounter: 0,
      timer: 0
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.userInput = React.createRef();
  }

  public componentDidMount() {
    this.userInput.current.addEventListener('keydown', this.onKeyDown);
    this.userInput.current.focus();
  }

  public start(): void {
    this.setState({
      startTime: Date.now()
    });
    this.timeIntervalStart();
    this.userInput.current.removeEventListener('keydown', this.onKeyDown);
    this.allStates.push(this.state);
  }

  public end(): void {
    this.setState({
      startTime: 0,
      wordCount: 0,
      currentWordTimeCounter: 0,
      timer: 0
    });
    this.timeIntervalEnd();
    this.userInput.current.addEventListener('keydown', this.onKeyDown);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.keyCode !== 27) {
      this.start();
    }
  }

  public onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 32) {
      this.nextWord();
    } else if (event.keyCode === 27) {
      this.end();
    }
  }

  public nextWord() {
    this.userInput.current.value = '';
    const newDate = Date.now();
    this.setState({
      wordCount: this.state.wordCount + 1,
      startTime: newDate,
      currentWordTimeCounter: newDate - this.state.startTime
    });
    this.allStates.push(this.state);
  }

  public timeIntervalStart() {
    this.timerIntervalId = setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
  }

  public timeIntervalEnd() {
    clearInterval(this.timerIntervalId);
  }

  public render() {
    return (
      <div>
        <WordsText
          textChunk={this.props.textChunk}
          textChunkId={this.props.textChunkId}
          currentWordIndex={this.state.wordCount}
        />
        <input id='typing' ref={this.userInput} onKeyUp={this.onKeyUp} />
        <span id='timer'>{this.state.timer}</span>
      </div>
    );
  }
}
