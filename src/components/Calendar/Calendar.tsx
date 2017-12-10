import * as React from 'react';
import glamorous from 'glamorous';

import Heading from '../Heading';

const Container = glamorous.div({
  height: '100vh',
  padding: '20px 15px',
});

export default function Calendar() {
  return (
    <Container>
      <Heading>December</Heading>
      <Heading>10</Heading>
    </Container>
  );
}
