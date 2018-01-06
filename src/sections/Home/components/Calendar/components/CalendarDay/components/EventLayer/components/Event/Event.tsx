import React from 'react';
import glamorous from 'glamorous';
import bind from '../../../../../../../../../../utilities/bind';
import { Todo } from '../../../../../../../../../../types';

interface Props {
  event: Todo;
  onDragStart(id: string): void;
  onDragEnd(id: string): void;
}

interface State {
  isDragging: boolean;
}

const EVENT_PADDING = 2;

const Container = glamorous.div<{hour: number, duration: number, isDragging: boolean}>({
  background: 'salmon',
  color: 'white',
  left: 22,
  padding: 3,
  pointerEvents: 'visible',
  position: 'absolute',
  width: 'calc(100% - 24px)',
}, ({hour, duration, isDragging}) => ({
  height: duration - EVENT_PADDING,
  opacity: isDragging ? 0 : 1,
  transform: isDragging ? 'scale(0.95)' : 'scale(1)',
  transition: isDragging ? 'opacity 0.15s, transform 0.15s' : 'opacity 0.15s',
  top: hour * 60 + EVENT_PADDING,
}));

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
      console.warn(`Event with id ${event.id} tried to render on calendar despite not having a start time`);
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
        hour={startTime.getHours() + (startTime.getMinutes() / 60)}
      >
        <Title>{event.title}</Title>
      </Container>
    );
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
