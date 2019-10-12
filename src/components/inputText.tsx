import * as React from 'react';

export default class InputText extends React.Component {
  constructor(props: any) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event: React.SyntheticEvent<HTMLInputElement>): void {
    console.log('value from event', event.currentTarget.value);
    // event.currentTarget.value.
  }

  render() {
    return (
      <div>
        <input onKeyDown={this.onKeyDown} />
      </div>
    )
  }
}
