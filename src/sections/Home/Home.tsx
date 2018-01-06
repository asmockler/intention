import * as React from 'react';
import glamorous from 'glamorous';
import { compose } from 'react-apollo';
import bind from '../../utilities/bind';

import allTodosQueryDecorator, { AllTodosQueryProps } from './graphql/AllTodosQuery';
import updateMarkedAsDoneDecorator, { UpdateMarkedAsDoneMutationProps } from './graphql/UpdateMarkedAsDoneMutation';
import createTodoDecorator, { CreateTodoMutationProps } from './graphql/SubmitTodoMutation';
import updateTodoTimeDecorator, { UpdateTodoTimeMutationProps } from './graphql/UpdateTodoTimeMutation';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

type WrappedProps = AllTodosQueryProps
  & CreateTodoMutationProps
  & UpdateMarkedAsDoneMutationProps
  & UpdateTodoTimeMutationProps;

interface State {
  activeHourDropzone: Date | null;
  idBeingDragged: string | null;
}

const Container = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  paddingLeft: 20,
});

class Home extends React.Component<WrappedProps, State> {
  state: State = {
    activeHourDropzone: null,
    idBeingDragged: null,
  };

  render() {
    const {
      data: {loading, allTodos = []},
      createTodo,
      updateMarkedAsDone,
    } = this.props;

    const unscheduledTodos = allTodos.filter((todo) => todo.startTime == null);
    const scheduledTodos = allTodos.filter((todo) => todo.startTime != null);

    return (
      <Container>
        <Calendar
          loading={loading}
          events={scheduledTodos}
          onDrop={this.handleDrop}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        />
        <Sidebar
          loading={loading}
          todos={unscheduledTodos}
          updateTodo={updateMarkedAsDone}
          onNewTodoSubmit={createTodo}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        />
      </Container>
    );
  }

  @bind
  private handleDragEnd() {
    const {idBeingDragged} = this.state;

    if (idBeingDragged == null) {
      return;
    }

    this.setState({
      idBeingDragged: null,
    });
  }

  @bind
  private handleDragStart(id: string) {
    this.setState({
      idBeingDragged: id,
    });
  }

  @bind
  private handleDrop(date: Date) {
    const {idBeingDragged} = this.state;

    if (idBeingDragged == null) {
      return;
    }

    this.props.updateTodoTime(idBeingDragged, date);

    this.setState({
      idBeingDragged: null,
    });
  }
}

export default compose(
  allTodosQueryDecorator,
  updateMarkedAsDoneDecorator,
  createTodoDecorator,
  updateTodoTimeDecorator,
)(Home);
