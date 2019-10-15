import React from 'react';

interface IWordProps {
  word: string;
  index: number;
  currentWordIndex: number;
}

export class Word extends React.Component<IWordProps> {

  public shouldComponentUpdate(nextProps: IWordProps) {
    if (nextProps.currentWordIndex === 0) {
      return true;
    }
    if (nextProps.currentWordIndex === this.props.index || nextProps.currentWordIndex - 1 === this.props.index) {
      return true;
    }
    return false;
  }

  public render() {
    return (
      <span>
        <span className='word'>
          {this.props.word}{'\u00a0'}
        </span>
        {' '}
      </span>
    );
  }
}

function addClassName(index: number, current: number) {
  if (index < current) {
    return ' done';
  } else if (index === current) {
    return ' current';
  } else {
    return '';
  }
}
