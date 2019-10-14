import * as React from 'react';
import { WordsText } from './words-text';

interface IProps {
  textChunk: string[];
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
      startTime: Date.now(),
      currentWordTimeCounter: this.state.startTime
    });
    this.timeIntervalStart();
    this.userInput.current.removeEventListener('keydown', this.onKeyDown);
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

  // React.SyntheticEvent<HTMLInputElement>React.KeyboardEvent<HTMLInputElement>
  public onKeyDown(event: KeyboardEvent): void {
    if (event.keyCode !== 27) {
      this.start();
    }
  }

  public onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.keyCode === 32) {
      this.userInput.current.value = '';
    } else if (event.keyCode === 27) {
      this.end();
    }
  }

  public timeIntervalStart(): void {
    this.timerIntervalId = setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
  }

  public timeIntervalEnd(): void {
    clearInterval(this.timerIntervalId);
  }

  public render() {
    return (
      <div>
        <WordsText textChunk={this.props.textChunk} />
        <input id='typing' ref={this.userInput} onKeyUp={this.onKeyUp} />
        <span id='timer'>{this.state.timer}</span>
      </div>
    );
  }
}
