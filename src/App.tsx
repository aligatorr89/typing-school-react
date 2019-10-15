import React from 'react';

import './App.css';
import { TypingTestComponent } from './components/typing-test';
import { getTypingTests } from './shared/Api';

interface IState {
  textChunk: string[];
  textChunkId: number;
}

class App extends React.Component<{}, IState> {
  protected currentChunkIndex: number;
  protected typingTests: string[];
  constructor(props: {}) {
    super(props);
    this.state = {
      textChunk: [],
      textChunkId: -1
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
        <TypingTestComponent textChunk={this.state.textChunk} textChunkId={this.state.textChunkId} getTextChunk={this.setNewTextChunk} />
      </div>
    );
  }

  private setNewTextChunk() {
    const currentChunkIndex = Math.round(Math.random() * 1000);
    this.setState({
      textChunk: this.typingTests[currentChunkIndex].split('|'),
      textChunkId: currentChunkIndex
    });
  }
}

export default App;
