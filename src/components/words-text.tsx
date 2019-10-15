import React from 'react';
import { Word } from './word-span';

interface IProps {
  textChunk: string[];
  textChunkId: number;
  currentWordIndex: number;
  // ref: React.RefObject<HTMLInputElement>;
}

export class WordsText extends React.Component<IProps> {
  public element: React.RefObject<HTMLDivElement> = React.createRef();
  public shouldComponentUpdate(nextProps: IProps) {
    if (nextProps.currentWordIndex !== 0) {
      return false;
    }

    return true;
  }

  public render() {
    return (
      <div id='words' ref={this.element}>
        {this.props.textChunk && renderWords(this.props)}
      </div>
    );
  }
}

function renderWords(props: IProps) {
  return (
    props.textChunk.map((row, index) => (
      <Word key={index} word={row} index={index} currentWordIndex={props.currentWordIndex}/>
    )
    )
  );
}
