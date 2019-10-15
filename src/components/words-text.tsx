import React from 'react';
import { Word } from './word-span';

interface IWordsTextProps {
  textChunk: string[];
  textChunkId: number;
  currentWordIndex: number;
}

export class WordsText extends React.Component<IWordsTextProps> {
  shouldComponentUpdate(nextProps: IWordsTextProps) {
    if (nextProps.textChunkId !== this.props.textChunkId) {
      return true;
    }

    if (nextProps.currentWordIndex === this.props.currentWordIndex) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div id='words'>
        {this.props.textChunk && renderWords(this.props)}
      </div>
    );
  }
};

function renderWords(props: IWordsTextProps) {
  return (
    props.textChunk.map((row, index) => (
      <Word key={index} word={row} index={index} currentWordIndex={props.currentWordIndex}/>
    ))
  );
}
