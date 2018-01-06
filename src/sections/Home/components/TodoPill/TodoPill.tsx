import React from 'react';
import glamorous from 'glamorous';
import bind from '../../../../utilities/bind';

interface Props {
  id: string;
  title: string;
  complete: boolean;
  offset: number;
  onTodoButtonClick(id: string, complete: boolean): void;
  onDragStart(id: string): void;
  onDragEnd(id: string): void;
  onDragEnter(id: string): void;
}

interface State {
  isDragging: boolean;
  complete: boolean;
}

interface ContainerProps {
  isDragging: boolean;
  optimistic: boolean;
  offset: number;
}

const Container = glamorous.div<ContainerProps>({
  borderRadius: 20,
  backgroundColor: 'salmon',
  color: 'white',
  display: 'flex',
  margin: '8px 0',
  padding: '5px 10px',
  transition: 'transform 0.25s, opacity 0.25s',
}, ({isDragging, optimistic, offset}) => ({
  cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
  opacity: isDragging ? 0 : optimistic ? 0.5 : 1,
  transform: isDragging ? 'scale(0.95)' : `scale(1) translate3d(0, ${offset}px, 0)`,
  zIndex: offset === 0 ? 0 : -1,
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
    this.props.onDragStart(this.props.id);
    this.setState({
      isDragging: true,
    });
  }

  @bind
  handleDragEnd() {
    this.props.onDragEnd(this.props.id);
    this.setState({
      isDragging: false,
    });
  }

  @bind
  handleDragEnter() {
    this.props.onDragEnter(this.props.id);
  }

  @bind
  handleDoneClick() {
    const {id, onTodoButtonClick, complete} = this.props;
    onTodoButtonClick(id, !complete);
  }

  render() {
    const {id, title, complete, offset} = this.props;
    const {isDragging} = this.state;

    return (
      <Container
        draggable={true}
        onDragEnter={this.handleDragEnter}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        isDragging={isDragging}
        optimistic={id === ''}
        offset={offset}
      >
        <Button onClick={this.handleDoneClick} complete={complete} />
        <Title>{title}</Title>
      </Container>
    );
  }
}
