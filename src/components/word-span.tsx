import React from 'react';

interface IWordProps {
  word: string;
  index: number;
  currentWordIndex: number;
}

export class Word extends React.Component<IWordProps> {
  private updateCounter: number = 0;
  public shouldComponentUpdate(nextProps: IWordProps) {
    if(nextProps.currentWordIndex === 0) {
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
        <span className={'word' + addClassName(this.props.index, this.props.currentWordIndex)}>
          {this.props.word}{'\u00a0'}
        </span>
        {' '}
      </span>
    );
  }
}

function addClassName(index: number, current: number) {
  // console.log('addClassName', index)
  if (index < current) {
    return ' done';
  } else if (index === current) {
    return ' current';
  } else {
    return '';
  }
}
