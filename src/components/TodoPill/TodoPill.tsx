import * as React from 'react';
import glamorous from 'glamorous';
import bind from '../../utilities/bind';

interface Props {
  title: string;
}

interface State {
  isDragging: boolean;
}

const Container = glamorous.div<{isDragging: boolean}>({
  borderRadius: 20,
  backgroundColor: 'salmon',
  display: 'flex',
  margin: '8px 0',
  padding: '5px 10px',
  transition: 'transform 0.25s, opacity 0.25s',
}, ({isDragging}) => ({
  opacity: isDragging ? 0 : 1,
  transform: isDragging ? 'scale(0.95)' : 'scale(1)',
}));

const Title = glamorous.p({
  fontSize: 14,
  margin: 0,
});

export default class TodoPill extends React.Component<Props, State> {
  state = {
    isDragging: false,
  };

  @bind
  handleDragStart() {
    this.setState({
      isDragging: true,
    });
  }

  @bind
  handleDragEnd() {
    this.setState({
      isDragging: false,
    });
  }

  render() {
    const {title} = this.props;
    const {isDragging} = this.state;

    return (
      <Container
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDrag={() => 'foo'}
        onDragExit={console.log}
        isDragging={isDragging}
      >
        <Title>{title}</Title>
      </Container>
    );
  }
}
