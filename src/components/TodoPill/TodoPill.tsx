import * as React from 'react';
import glamorous from 'glamorous';
import { makeDraggable } from '../../utilities/make-draggable';

interface Props {
  title: string;
}

const Container = glamorous.div({
  borderRadius: 20,
  backgroundColor: 'salmon',
  display: 'flex',
  margin: '8px 0',
  padding: '5px 10px',
});

const Title = glamorous.p({
  fontSize: 14,
  margin: 0,
});

function TodoPill({title}: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export default makeDraggable<Props>(TodoPill);
