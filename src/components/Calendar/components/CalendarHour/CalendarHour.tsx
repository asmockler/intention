import * as React from 'react';
import glamorous from 'glamorous';

interface Props {
  hour: number;
}

const Container = glamorous.div({
  display: 'flex',
  height: 60,
  position: 'relative',
});

const Hour = glamorous.p({
  fontSize: 12,
  fontWeight: 600,
  margin: '-7px 0 0',
});

const ContentContainer = glamorous.div({
  borderTop: '1px solid #EEE',
  flex: '1 0 auto',
  marginLeft: 15,
});

export default function CalendarHour({hour}: Props) {
  return (
    <Container>
      <Hour>{hour}</Hour>
      <ContentContainer />
    </Container>
  );
}
