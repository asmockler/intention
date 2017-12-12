import * as React from 'react';
import glamorous from 'glamorous';
import { compose } from 'react-apollo';
import bind from '../../utilities/bind';

import allTodosQueryDecorator, { AllTodosQueryProps } from './graphql/AllTodosQuery';
import updateMarkedAsDoneDecorator, { UpdateMarkedAsDoneMutationProps } from './graphql/UpdateMarkedAsDoneMutation';
import submitTodoDecorator, { SubmitTodoMutationProps } from './graphql/SubmitTodoMutation';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

type WrappedProps = AllTodosQueryProps
  & SubmitTodoMutationProps
  & UpdateMarkedAsDoneMutationProps;

const Container = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  paddingLeft: 20,
});

class Home extends React.Component<WrappedProps, {}> {
  render() {
    const {data: {loading, allTodos = [
      {id: '', title: 'Milk', startTime: null, markedAsDone: false, duration: 15}
    ]}} = this.props;

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
    const {updateMarkedAsDone} = this.props;

    updateMarkedAsDone(id, markedAsDone);
  }
}

export default compose(
  allTodosQueryDecorator,
  updateMarkedAsDoneDecorator,
  submitTodoDecorator,
)(Home);
