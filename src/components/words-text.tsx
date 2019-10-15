import React from 'react';

interface IWordsTextProps {
  textChunk: string[];
  currentWordIndex: number;
}

interface IWordProps {
  word: string;
  index: number;
  currentWordIndex: number;
}

export const WordsText: React.SFC<IWordsTextProps> = (props) => {
  return (
    <div id='words'>
      {props.textChunk && renderWords(props)}
    </div>
  );
};

function renderWords(props: IWordsTextProps) {
  return (
    props.textChunk.map((row, index) => (
      <Word key={index} word={row} index={index} currentWordIndex={props.currentWordIndex}/>
    )
    )
  );
}

const Word: React.SFC<IWordProps> = (props) => {
  return (
    <span>
      <span className={'word' + addClassName(props.index, props.currentWordIndex)}>
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
