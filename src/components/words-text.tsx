import React from 'react';

interface IProps {
  textChunk: string[];
}

export const WordsText: React.SFC<IProps> = (props) => {
  return (
    <div id='words'>
      {props.textChunk ? renderWords(props) : <div />}
    </div>
  );
}

function renderWords(props: IProps) {
  return (
    props.textChunk.map((row, index) =>
      (<span
        key={index}
        className='words'>
          {row}{' '}
      </span>
      )
    )
  );
}

function addClassName(index: number, current: number) {
  if (index > current) {
    return 'word';
  } else if (index === current) {
    return 'word current';
  } else {
    return 'word done';
  }
}
