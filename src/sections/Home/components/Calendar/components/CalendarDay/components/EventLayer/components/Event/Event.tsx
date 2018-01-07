import React from 'react';
import glamorous from 'glamorous';
import bind from '../../../../../../../../../../utilities/bind';
import {Todo} from '../../../../../../../../../../types';

import {GRADIENTS} from '../../../../../../../../../../styles';

interface Props {
  event: Todo;
  onDragStart(id: string): void;
  onDragEnd(id: string): void;
  onTodoCheckboxClick(id: string, markedAsDone: boolean): void;
}

interface State {
  isDragging: boolean;
}

const EVENT_PADDING = 2;

const Container = glamorous.div<{
  hour: number;
  duration: number;
  isDragging: boolean;
}>(
  {
    backgroundImage: GRADIENTS.blue,
    borderRadius: 4,
    color: 'white',
    cursor: '-webkit-grab',
    display: 'flex',
    left: 22,
    padding: 8,
    pointerEvents: 'visible',
    position: 'absolute',
    width: 'calc(100% - 24px)',
  },
  ({hour, duration, isDragging}) => ({
    height: duration - EVENT_PADDING,
    opacity: isDragging ? 0 : 1,
    transform: isDragging ? 'scale(0.95)' : 'scale(1)',
    transition: isDragging ? 'opacity 0.15s, transform 0.15s' : 'opacity 0.15s',
    top: hour * 60 + EVENT_PADDING,
  })
);

const Button = glamorous.button(
  {
    border: '2px solid white',
    borderRadius: '100%',
    height: 16,
    marginRight: 8,
    padding: 0,
    width: 16,
  },
  ({complete}: {complete: boolean}) => ({
    background: complete ? 'white' : 'transparent',
  })
);

const Title = glamorous.p({
  fontSize: 12,
  fontWeight: 'bold',
  margin: 0,
});

export default class Event extends React.Component<Props, State> {
  state: State = {
    isDragging: false,
  };

  render() {
    const {event} = this.props;
    const {isDragging} = this.state;

    if (event.startTime == null) {
      // eslint-disable-next-line no-console
      console.warn(
        `Event with id ${
          event.id
        } tried to render on calendar despite not having a start time`
      );
      return null;
    }

    const startTime = new Date(event.startTime);

    return (
      <Container
        isDragging={isDragging}
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        duration={event.duration}
        hour={startTime.getHours() + startTime.getMinutes() / 60}
      >
        <Button
          complete={event.markedAsDone}
          onClick={this.handleTodoCheckboxClick}
        />
        <Title>{event.title}</Title>
      </Container>
    );
  }

  @bind
  private handleTodoCheckboxClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const {event, onTodoCheckboxClick} = this.props;

    onTodoCheckboxClick(event.id, !event.markedAsDone);
  }

  @bind
  private handleDragStart() {
    this.props.onDragStart(this.props.event.id);
    this.setState({isDragging: true});
  }

  @bind
  private handleDragEnd() {
    this.props.onDragEnd(this.props.event.id);
    this.setState({isDragging: false});
  }
}
