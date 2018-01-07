import React from 'react';
import glamorous from 'glamorous';
import {compose} from 'react-apollo';
import bind from '../../utilities/bind';

import loggedInUserQueryDecorator, {
  LoggedInUserQueryResponse,
} from '../../graphql/LoggedInUserQuery';
import allTodosQueryDecorator, {
  AllTodosQueryResult,
} from './graphql/AllTodosQuery';
import updateMarkedAsDoneDecorator, {
  UpdateMarkedAsDoneMutationProps,
} from './graphql/UpdateMarkedAsDoneMutation';
import createTodoDecorator, {
  CreateTodoMutationProps,
} from './graphql/SubmitTodoMutation';
import updateTodoTimeDecorator, {
  UpdateTodoTimeMutationProps,
} from './graphql/UpdateTodoTimeMutation';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

type WrappedProps = AllTodosQueryResult &
  CreateTodoMutationProps &
  UpdateMarkedAsDoneMutationProps &
  UpdateTodoTimeMutationProps &
  LoggedInUserQueryResponse;

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

  componentDidMount() {
    const currentHour = new Date().getHours();

    window.setTimeout(() => {
      window.scrollTo(0, currentHour * 60);
    }, 0);
  }

  render() {
    const {loggedInUserQuery, allTodosQuery, updateMarkedAsDone} = this.props;

    const loading = loggedInUserQuery.loading || allTodosQuery.loading;

    const {user: {todos = []} = {}} = allTodosQuery;

    const unscheduledTodos = todos.filter((todo) => todo.startTime == null);
    const scheduledTodos = todos.filter((todo) => todo.startTime != null);

    return (
      <Container>
        <Calendar
          loading={loading}
          events={scheduledTodos}
          onDrop={this.handleDrop}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          onTodoCheckboxClick={updateMarkedAsDone}
        />
        <Sidebar
          loading={loading}
          todos={unscheduledTodos}
          updateTodo={updateMarkedAsDone}
          onNewTodoSubmit={this.handleNewTodoSubmit}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        />
      </Container>
    );
  }

  @bind
  private handleNewTodoSubmit(title: string) {
    const {loggedInUserQuery: {loggedInUser}, createTodo} = this.props;

    if (loggedInUser == null || loggedInUser.id == null) {
      throw new Error('User not logged in');
    }

    createTodo(loggedInUser.id, title);
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
  loggedInUserQueryDecorator,
  updateMarkedAsDoneDecorator,
  createTodoDecorator,
  updateTodoTimeDecorator
)(Home);
