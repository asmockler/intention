import * as React from 'react';
import glamorous from 'glamorous';
import bind from '../../../../utilities/bind';

import Heading from '../../../../components/Heading';
import TodoPill from '../TodoPill';
import SidebarLoading from './components/SidebarLoading';
import NewTodoInput from './components/NewTodoInput';

import { Todo } from '../../../../types';

export interface Props {
  todos: Todo[];
  loading: boolean;
  updateTodo(id: string, markedAsDone: boolean): void;
  onNewTodoSubmit(title: string): void;
}

export interface State {
  newTodoTitle: string;
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

export default class Sidebar extends React.Component<Props, State> {
  state = {
    newTodoTitle: '',
  };

  render() {
    const {loading, todos, updateTodo} = this.props;
    const {newTodoTitle} = this.state;

    const todoMarkup = loading
      ? <SidebarLoading />
      : todos.map(({title, id, markedAsDone}) => (
          <TodoPill
            title={title}
            onTodoButtonClick={updateTodo}
            complete={markedAsDone}
            key={id}
            id={id}
          />
        )
      );

    return (
      <Container>
        <StickyContainer>
          <Heading>Unscheduled</Heading>
          <div>
            <NewTodoInput
              value={newTodoTitle}
              onChange={this.handleNewTodoInputChange}
              onSubmit={this.handleNewTodoSubmit}
            />
          </div>
          {todoMarkup}
        </StickyContainer>
      </Container>
    );
  }

  @bind
  private handleNewTodoSubmit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const {newTodoTitle} = this.state;
    const {onNewTodoSubmit} = this.props;

    onNewTodoSubmit(newTodoTitle);

    this.setState({newTodoTitle: ''});
  }

  @bind
  private handleNewTodoInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({newTodoTitle: event.currentTarget.value});
  }
}
