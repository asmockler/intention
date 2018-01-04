import React from 'react';
import bind from '../../../../../../../../../../utilities/bind';

interface Props {
  date: Date;
  onDrop(date: Date): void;
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
          background: isHighlighted ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
          height: 15,
        }}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
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
  private handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  @bind
  private handleDrop() {
    this.props.onDrop(this.props.date);
    this.setState({
      isHighlighted: false,
    });
  }
}
