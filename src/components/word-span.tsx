import React from 'react';

interface IWordProps {
  word: string;
  index: number;
  currentWordIndex: number;
}


export class Word extends React.Component<IWordProps> {
  shouldComponentUpdate(nextProps: IWordProps) {
    if (nextProps.currentWordIndex < nextProps.index) {
      return false;
    }

    if (nextProps.currentWordIndex -1 > nextProps.index) {
      return false;
    }

    return true;
  }
  render() {
    return (
      <span>
        <span className={'word' + addClassName(this.props.index, this.props.currentWordIndex)}>
          {this.props.word}{'\u00a0'}
        </span>
        {' '}
      </span>
    );
  }
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
