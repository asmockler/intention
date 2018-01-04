import React from 'react';
import glamorous from 'glamorous';
import { Todo } from '../../../../../../../../../../types';

interface Props {
  event: Todo;
}

const EVENT_PADDING = 2;

const Container = glamorous.div<{hour: number, duration: number}>({
  background: 'salmon',
  color: 'white',
  left: 22,
  padding: 3,
  position: 'absolute',
  width: 'calc(100% - 24px)',
}, ({hour, duration}) => ({
  height: duration - EVENT_PADDING,
  top: hour * 60 + EVENT_PADDING,
}));

const Title = glamorous.p({
  fontSize: 12,
  fontWeight: 'bold',
  margin: 0,
});

export default function Event({event}: Props) {
  if (event.startTime == null) {
    console.warn(`Event with id ${event.id} tried to render on calendar despite not having a start time`);
    return null;
  }

  const startTime = new Date(event.startTime);

  return (
    <Container
      hour={startTime.getHours() + (startTime.getMinutes() / 60)}
      duration={event.duration}
    >
      <Title>{event.title}</Title>
    </Container>
  );
}
