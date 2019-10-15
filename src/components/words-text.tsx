import React from 'react';
import { Word } from './word-span';

interface IProps {
  textChunk: string[];
  textChunkId: number;
  currentWordIndex: number;
}

export class WordsText extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public shouldComponentUpdate(nextProps: IProps) {
    if (nextProps.currentWordIndex !== this.props.currentWordIndex) {
      return true;
    }

    if (nextProps.textChunkId !== this.props.textChunkId) {
      return true;
    }

    return false;
  }

  public render() {
    return (
      <div id='words'>
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
