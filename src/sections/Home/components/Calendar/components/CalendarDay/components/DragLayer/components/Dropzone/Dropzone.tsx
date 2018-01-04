import React from 'react';
import bind from '../../../../../../../../../../utilities/bind';

interface Props {
  date: Date;
  onDrop(): void;
}

interface State {
  isHighlighted: boolean;
}

export default class Dropzone extends React.Component<Props, State> {
  state: State = {
    isHighlighted: false,
  };

  render() {
    const {isHighlighted} = this.state;

    return (
      <div
        style={{
          background: isHighlighted ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          height: 15,
        }}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      />
    );
  }

  @bind
  private handleDragEnter() {
    this.setState({
      isHighlighted: true,
    });
  }

  @bind
  private handleDragLeave() {
    this.setState({
      isHighlighted: false,
    });
  }

  @bind
  private handleDrop() {
    this.props.onDrop();
    this.setState({
      isHighlighted: false,
    });
  }
}
