import * as React from 'react';

interface Props {
  textChunk: string[]
}

interface State {
  wordCount: number;
  startTime: number;
  currentWordTimeCounter: number;
  timer: number
}

interface InputTextProps {
  onKeyDown(event: KeyboardEvent): void;
  onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void;
}

const inputText: React.SFC<InputTextProps> = (props) => {
  return (
    <input onKeyUp={props.onKeyUp} />
  );
};

export class TypingTest extends React.Component<Props, State> {
  private timerIntervalId: number = NaN;
  // private userInput: React.RefObject<HTMLInputElement>;// HTMLInputElement;//
  private userInput: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
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

  componentDidMount() {
    this.userInput.current.addEventListener('keydown', this.onKeyDown);
    this.userInput.current.focus();
  }

  start(): void {
    this.setState({
      startTime: Date.now(),
      currentWordTimeCounter: this.state.startTime
    });
    this.timeIntervalStart();
    this.userInput.current.removeEventListener('keydown', this.onKeyDown);
  }

  end(): void {
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
  onKeyDown(event: KeyboardEvent): void {
    if(event.keyCode !== 27) {
      this.start();
    }
  }

  onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.keyCode === 32) {

      this.userInput.current.value = '';
    }
    else if(event.keyCode === 27) {
      this.end();
    }
  }

  timeIntervalStart(): void {
    this.timerIntervalId = setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
  }

  timeIntervalEnd(): void {
    clearInterval(this.timerIntervalId);
  }

  render() {
    return (
      <div>
        <input ref={this.userInput} onKeyUp={this.onKeyUp} />
        <span>{this.state.timer}</span>
      </div>
    );
  }
}
