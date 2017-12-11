import * as React from 'react';
import glamorous from 'glamorous';
import { graphql, compose } from 'react-apollo';
import bind from '../../utilities/bind';

import { allTodosQuery } from './graphql/AllTodosQuery';
import { updateMarkedAsDoneMutation } from './graphql/UpdateMarkedAsDoneMutation';
import { ApolloResponse, Todo } from '../../types';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

interface ResponseData {
  allTodos: Todo[];
}

const Container = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  paddingLeft: 20,
});

class Home extends React.Component<ApolloResponse<ResponseData> & {update: any}, {}> {
  render() {
    const {data: {loading, allTodos = []}} = this.props;

    const unscheduledTodos = allTodos.filter(({startTime}) => startTime == null);

    return (
      <Container>
        <Calendar loading={loading} />
        <Sidebar
          loading={loading}
          todos={unscheduledTodos}
          updateTodo={this.updateTodo}
        />
      </Container>
    );
  }

  @bind
  private updateTodo(id: string, markedAsDone: boolean) {
    const {update} = this.props;

    update({id, markedAsDone});
  }
}

export default compose(
  graphql(allTodosQuery),
  graphql(updateMarkedAsDoneMutation, {
    props: ({mutate}: any) => ({
      update: ({id, markedAsDone}: {id: string, markedAsDone: boolean}) => mutate({
        variables: {id, markedAsDone},
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
)(Home);
