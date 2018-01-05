import * as React from 'react';
import glamorous from 'glamorous';

import { Todo } from '../../../../../../types';

import Heading from '../../../../../../components/Heading';

import { getMonth } from '../../../../../../utilities/dates';

// import CalendarHour from '../CalendarHour';

import DisplayLayer from './components/DisplayLayer';
import EventLayer from './components/EventLayer';
import DragLayer from './components/DragLayer';

interface Props {
  date: Date;
  events: Todo[];
  showMonth: boolean;
  droppable: boolean;
  onDrop(date: Date): void;
}

const Container = glamorous.div({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'min-content',
});

const HeadingContainer = glamorous.div({
  background: '#fff',
  padding: '15px 0',
  position: 'sticky',
  top: 0,
  zIndex: 10,
});

const HoursContainer = glamorous.div({
  position: 'relative',
});

export default function CalendarDay({date, showMonth, events, onDrop, droppable}: Props) {
  const title = showMonth ? getMonth(date) : <span>&nbsp;</span>;

  return (
    <Container>
      <HeadingContainer>
        <Heading>{title}</Heading>
        <Heading>{date.getDate()}</Heading>
      </HeadingContainer>

      <div style={{padding: '10px 30px 20px 0'}}>
        <HoursContainer>
          <DisplayLayer />
          <EventLayer events={events} />
          {
            droppable
              ? <DragLayer date={date} onDrop={onDrop} />
              : null
          }
        </HoursContainer>
      </div>
    </Container>
  );
}
