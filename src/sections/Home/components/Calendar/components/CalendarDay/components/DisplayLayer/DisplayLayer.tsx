import * as React from 'react';
import glamorous from 'glamorous';

const HourContainer = glamorous.div({
  borderTop: '1px solid #EAEAEA',
  display: 'flex',
  height: 60,
  position: 'relative',
});

const Hour = glamorous.p({
  background: 'white',
  color: '#777',
  fontFeatureSettings: '"tnum"',
  fontSize: 9,
  fontWeight: 600,
  margin: '-7px 0 0',
  width: 20,
});

export default function DisplayLayer() {
  const hours = Array(24).fill(null).map((_, index) => (
    <HourContainer key={index}>
      <Hour>{index < 10 ? `0${index}` : index}</Hour>
    </HourContainer>
  ));

  return (
    <div>
      {hours}
    </div>
  );
}
