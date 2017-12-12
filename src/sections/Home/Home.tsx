import * as React from 'react';
import glamorous from 'glamorous';
import { compose } from 'react-apollo';

import allTodosQueryDecorator, { AllTodosQueryProps } from './graphql/AllTodosQuery';
import updateMarkedAsDoneDecorator, { UpdateMarkedAsDoneMutationProps } from './graphql/UpdateMarkedAsDoneMutation';
import createTodoDecorator, { CreateTodoMutationProps } from './graphql/SubmitTodoMutation';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

type WrappedProps = AllTodosQueryProps
  & CreateTodoMutationProps
  & UpdateMarkedAsDoneMutationProps;

const Container = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  paddingLeft: 20,
});

class Home extends React.Component<WrappedProps, {}> {
  render() {
    const {
      data: {loading, allTodos = []},
      createTodo,
      updateMarkedAsDone,
    } = this.props;

    const unscheduledTodos = allTodos.filter(({startTime}) => startTime == null);

    return (
      <Container>
        <Calendar loading={loading} />
        <Sidebar
          loading={loading}
          todos={unscheduledTodos}
          updateTodo={updateMarkedAsDone}
          onNewTodoSubmit={createTodo}
        />
      </Container>
    );
  }
}

export default compose(
  allTodosQueryDecorator,
  updateMarkedAsDoneDecorator,
  createTodoDecorator,
)(Home);
