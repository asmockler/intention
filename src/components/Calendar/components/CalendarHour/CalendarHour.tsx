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
  color: '#777',
  fontFeatureSettings: '"tnum"',
  fontSize: 9,
  fontWeight: 600,
  margin: '-7px 0 0',
  width: 30,
});

const ContentContainer = glamorous.div({
  borderTop: '1px solid #EAEAEA',
  flex: '1 0 auto',
});

export default function CalendarHour({hour}: Props) {
  const formattedHour = hour < 10 ? `0${hour}` : hour;

  return (
    <Container>
      <Hour>{formattedHour}</Hour>
      <ContentContainer />
    </Container>
  );
}
