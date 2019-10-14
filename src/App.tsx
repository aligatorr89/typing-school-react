import React from 'react';

import './App.css';
import { TypingTestComponent } from './components/typing-test';
import { getTypingTests } from './shared/Api';

interface IState {
  textChunk: string[];
}

class App extends React.Component<{}, IState> {
  protected currentChunkIndex: number;
  protected typingTests: string[];
  constructor(props: {}) {
    super(props);
    this.state = {
      textChunk: []
    };
    getTypingTests()
    .then((res) => {
      this.typingTests = res.split('\n');
      this.setNewTextChunk();
    })
    .catch((error) => alert(error));
  }

  public render() {
    return (
      <div className='App'>
        <TypingTestComponent textChunk={this.state.textChunk} />
      </div>
    );
  }

  private setNewTextChunk() {
    this.currentChunkIndex = Math.round(Math.random() * 1000);
    this.setState({
      textChunk: this.typingTests[this.currentChunkIndex].split('|')
    });
  }
}

export default App;
