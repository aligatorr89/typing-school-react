import React from 'react';

interface IInputTextProps {
  onKeyDown(event: KeyboardEvent): void;
  onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void;
}

const inputText: React.SFC<IInputTextProps> = (props) => {
  return (
    <input onKeyUp={props.onKeyUp} />
  );
};
