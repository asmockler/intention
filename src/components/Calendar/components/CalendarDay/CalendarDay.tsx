import * as React from 'react';
import glamorous from 'glamorous';

import Heading from '../../../Heading';

import { getMonth } from '../../../../utilities/dates';

import CalendarHour from '../CalendarHour';

interface Props {
  date: Date;
}

const Container = glamorous.div({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'min-content',
});

const HeadingContainer = glamorous.div({
  paddingBottom: 15,
});

const HoursContainer = glamorous.div({
  padding: '10px 0 20px',
  overflowY: 'scroll',
});

export default function CalendarDay({date}: Props) {
  const hours = Array(24).fill(null).map((_, index) => <CalendarHour hour={index} key={index} />);

  return (
    <Container>
      <HeadingContainer>
        <Heading>{getMonth(date)}</Heading>
        <Heading>{date.getDate()}</Heading>
      </HeadingContainer>
      <HoursContainer>
        {hours}
      </HoursContainer>
    </Container>
  );
}
