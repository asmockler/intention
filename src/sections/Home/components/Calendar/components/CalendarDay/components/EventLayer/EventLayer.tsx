import React from 'react';
import glamorous from 'glamorous';
import { Todo } from '../../../../../../../../types';

import Event from './components/Event';

interface Props {
  events: Todo[];
}

const Container = glamorous.div({
  height: '100%',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 1,
});

export default function EventLayer({events}: Props) {
  const eventsMarkup = events.map((event) => (
    <Event event={event} key={event.id} />
  ));

  return (
    <Container>
      {eventsMarkup}
    </Container>
  );
}
