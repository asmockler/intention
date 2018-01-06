import React from 'react';
import glamorous from 'glamorous';
import { Todo } from '../../../../../../../../types';

import Event from './components/Event';

interface Props {
  events: Todo[];
  onDragStart(id: string): void;
  onDragEnd(id: string): void;
  onTodoCheckboxClick(id: string, markedAsDone: boolean): void;
}

const Container = glamorous.div({
  height: '100%',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 3,
});

export default function EventLayer({events, onDragEnd, onDragStart, onTodoCheckboxClick}: Props) {
  const eventsMarkup = events.map((event) => (
    <Event
      key={event.id}
      event={event}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onTodoCheckboxClick={onTodoCheckboxClick}
    />
  ));

  return (
    <Container>
      {eventsMarkup}
    </Container>
  );
}
