import * as React from 'react';
import glamorous from 'glamorous';
import bind from '../../../../utilities/bind';

interface Props {
  id: string;
  title: string;
  complete: boolean;
  onTodoButtonClick(id: string, complete: boolean): void;
}

interface State {
  isDragging: boolean;
  complete: boolean;
}

const Container = glamorous.div<{isDragging: boolean, optimistic: boolean}>({
  borderRadius: 20,
  backgroundColor: 'salmon',
  color: 'white',
  display: 'flex',
  margin: '8px 0',
  padding: '5px 10px',
  transition: 'transform 0.25s, opacity 0.25s',
}, ({isDragging, optimistic}) => ({
  cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
  opacity: isDragging ? 0 : optimistic ? 0.5 : 1,
  transform: isDragging ? 'scale(0.95)' : 'scale(1)',
}));

const Button = glamorous.button({
  border: '2px solid white',
  borderRadius: '100%',
  height: 16,
  marginRight: 8,
  padding: 0,
  width: 16,
}, ({complete}: {complete: boolean}) => ({
  background: complete ? 'white' : 'transparent',
}));

const Title = glamorous.p({
  fontSize: 14,
  margin: 0,
});

export default class TodoPill extends React.Component<Props, State> {
  state = {
    isDragging: false,
    complete: false,
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

  @bind
  handleDoneClick() {
    const {id, onTodoButtonClick, complete} = this.props;
    onTodoButtonClick(id, !complete);
  }

  render() {
    const {id, title, complete} = this.props;
    const {isDragging} = this.state;

    return (
      <Container
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        isDragging={isDragging}
        optimistic={id === ''}
      >
        <Button onClick={this.handleDoneClick} complete={complete} />
        <Title>{title}</Title>
      </Container>
    );
  }
}
