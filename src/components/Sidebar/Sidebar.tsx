import * as React from 'react';
import glamorous from 'glamorous';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Heading from '../Heading';
import TodoPill from '../TodoPill';
import SidebarLoading from './components/SidebarLoading';

import { ApolloResponse, Todo } from '../../types';

interface Data {
  allTodos: Todo[];
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

function Sidebar({data: {loading, allTodos}}: ApolloResponse<Data>) {
  const todoMarkup = loading
    ? <SidebarLoading />
    : (
      allTodos.map(({title}) => (
        <TodoPill title={title} key={title} />
      ))
    );

  return (
    <Container>
      <StickyContainer>
        <Heading>Unscheduled</Heading>
        {todoMarkup}
      </StickyContainer>
    </Container>
  );
}

const ALL_TODOS_QUERY = gql`
  query AllTodosQuery {
    allTodos: allTodoes(orderBy: createdAt_DESC) {
      id
      title
      markedAsDone
    }
  }
`;

export default graphql(ALL_TODOS_QUERY, {
  options: {
    fetchPolicy: 'network-only',
  },
})(Sidebar);
