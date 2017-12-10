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
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '20px 15px',
});

export default function Sidebar({todos}: Props) {
  const todoMarkup = todos.map(({title}) => (
    <TodoPill title={title} key={title} />
  ));

  return (
    <Container>
      <Heading>Unscheduled</Heading>
      {todoMarkup}
    </Container>
  );
}
