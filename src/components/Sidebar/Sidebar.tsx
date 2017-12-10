import * as React from 'react';
import glamorous from 'glamorous';

import Heading from '../Heading';
import TodoPill from '../TodoPill';

import { Todo } from '../../types';

interface Props {
  todos: Todo[];
}

const Container = glamorous.div({
  background: '#FAFAFA',
});

const StickyContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 15px',
  position: 'sticky',
  top: 0,
});

export default function Sidebar({todos}: Props) {
  const todoMarkup = todos.map(({title}) => (
    <TodoPill title={title} key={title} />
  ));

  return (
    <Container>
      <StickyContainer>
        <Heading>Unscheduled</Heading>
        {todoMarkup}
      </StickyContainer>
    </Container>
  );
}
