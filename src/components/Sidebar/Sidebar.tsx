import * as React from 'react';
import glamorous from 'glamorous';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import bind from '../../utilities/bind';

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

class Sidebar extends React.Component<ApolloResponse<Data> & {update: any}, {}> {
  render() {
    const {data: {loading, allTodos}} = this.props;

    const todoMarkup = loading
      ? <SidebarLoading />
      : (
        allTodos.map(({title, id, markedAsDone}) => (
          <TodoPill
            title={title}
            onTodoButtonClick={this.handleTodoButtonClick}
            complete={markedAsDone}
            key={id}
            id={id}
          />
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

  @bind
  private handleTodoButtonClick(id: string, complete: boolean) {
    const {update} = this.props;

    update({id, markedAsDone: !complete});
  }
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

const UPDATE_MARKED_AS_DONE_MUTATION = gql`
  mutation updateTodo($id: ID!, $markedAsDone: Boolean!) {
    updateTodo(id: $id, markedAsDone: $markedAsDone) {
      id
      markedAsDone
    }
  }
`;

export default compose(
  graphql(ALL_TODOS_QUERY, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(UPDATE_MARKED_AS_DONE_MUTATION, {
    props: ({ownProps, mutate}: any) => ({
      update: ({id, markedAsDone}: {id: string, markedAsDone: boolean}) => mutate({
        variables: { id, markedAsDone },
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            __typename: 'Todo',
            id,
            markedAsDone,
          },
        },
      }),
    }),
  }),
)(Sidebar);
