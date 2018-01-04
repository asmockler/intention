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
      data: {loading, allTodos = [
        {id: '12345', title: 'Milk', markedAsDone: false, duration: 30, startTime: '2018-01-04 04:00:00'},
        {id: '12f45', title: 'Eggs', markedAsDone: false, duration: 30, startTime: '2018-01-04 04:30:00'},
        {id: '54321', title: 'Bread', markedAsDone: false, duration: 15, startTime: null},
      ]},
      createTodo,
      updateMarkedAsDone,
    } = this.props;

    const unscheduledTodos = allTodos.filter((todo) => todo.startTime == null);
    const scheduledTodos = allTodos.filter((todo) => todo.startTime != null);

    return (
      <Container>
        <Calendar
          loading={loading}
          onHourEnter={this.handleHourEnter}
          onHourLeave={this.handleHourLeave}
          events={scheduledTodos}
          onDrop={this.handleDrop}
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
    const {activeHourDropzone, idBeingDragged} = this.state;

    if (activeHourDropzone == null || idBeingDragged == null) {
      return;
    }

    this.setState({
      idBeingDragged: null,
    });

    this.props.updateTodoTime(idBeingDragged, activeHourDropzone);
  }

  @bind
  private handleDragStart(id: string) {
    this.setState({
      idBeingDragged: id,
    });
  }

  @bind
  private handleHourEnter(date: Date) {
    this.setState({activeHourDropzone: date});
  }

  @bind
  private handleHourLeave(date: Date) {
    this.setState((state: State) => {
      const {activeHourDropzone} = state;

      if (activeHourDropzone == null) {
        return state;
      }

      return {
        activeHourDropzone: activeHourDropzone.valueOf() === date.valueOf()
          ? null
          : activeHourDropzone,
      };
    });
  }

  @bind
  private handleDrop(date: Date) {
    console.log('dropped', date);
  }
}

export default compose(
  allTodosQueryDecorator,
  updateMarkedAsDoneDecorator,
  createTodoDecorator,
  updateTodoTimeDecorator,
)(Home);
