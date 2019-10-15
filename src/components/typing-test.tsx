import * as React from 'react';
import { WordsText } from './words-text';
// import { TypingTest } from '../shared/TypingTest';

interface IProps {
  textChunk: string[];
  textChunkId: number;
  getTextChunk: () => void;
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
  protected wordsText: React.RefObject<WordsText>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      wordCount: NaN,
      startTime: 0,
      currentWordTimeCounter: 0,
      timer: 0
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.userInput = React.createRef();
    this.wordsText = React.createRef();
  }

  public componentDidMount() {
    this.userInput.current.addEventListener('keydown', this.onKeyDown);
    this.userInput.current.focus();
  }

  public shouldComponentUpdate(nextProps: IProps) {
    if (nextProps.textChunkId !== this.props.textChunkId) {
      return true;
    }
    return false;
  }

  public start(): void {
    this.wordsText.current.element.current.children[0].children[0].setAttribute('class', 'word current');
    this.setState({
      startTime: Date.now(),
      wordCount: 0
    });
    this.timeIntervalStart();
    this.userInput.current.removeEventListener('keydown', this.onKeyDown);
  }

  public end(): void {
    for (let i = 0; i < this.state.wordCount; i++) {
      this.wordsText.current.element.current.children[i].children[0].setAttribute('class', 'word');
    }
    this.setState({
      startTime: 0,
      wordCount: 0,
      currentWordTimeCounter: 0,
      timer: 0
    });
    this.timeIntervalEnd();
    this.props.getTextChunk();

    this.userInput.current.addEventListener('keydown', this.onKeyDown);
    this.userInput.current.value = '';
  }

  // React.SyntheticEvent<HTMLInputElement>React.KeyboardEvent<HTMLInputElement>
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

    this.wordsText.current.element.current.children[this.state.wordCount].children[0].setAttribute('class', 'word done');
    this.wordsText.current.element.current.children[this.state.wordCount + 1].children[0].setAttribute('class', 'word current');
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
          ref={this.wordsText}
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

interface IWordsTextProps {
  textChunk: string[];
  textChunkId: number;
  currentWordIndex: number;
  ref: React.RefObject<HTMLInputElement>;
}

export const WordsTextSFC: React.SFC<IWordsTextProps> = (props) => {
  return (
    <div id='words'>
      {props.textChunk && renderWords(props)}
    </div>
  );
};

function renderWords(props: IWordsTextProps) {
  return (
    props.textChunk.map((row, index) => (
      <WordSFC key={index} word={row} index={index} currentWordIndex={props.currentWordIndex}/>
    )
    )
  );
}

interface IWordProps {
  word: string;
  index: number;
  currentWordIndex: number;
}

export const WordSFC: React.SFC<IWordProps> = (props) => {
  return (
    <span>
      <span className={'word'}>
        {props.word}{'\u00a0'}
      </span>
      {' '}
    </span>
  );
};

function addClassName(index: number, current: number) {
  if (index < current) {
    return ' done';
  } else if (index === current) {
    return ' current';
  } else {
    return '';
  }
}
