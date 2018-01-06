import React from 'react';
import glamorous from 'glamorous';
import {withRouter, RouteComponentProps} from 'react-router';
import bind from '../../../../utilities/bind';

import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import TodoPill from '../TodoPill';
import SidebarLoading from './components/SidebarLoading';
import NewTodoInput from './components/NewTodoInput';

import {Todo} from '../../../../types';

export interface Props {
  todos: Todo[];
  loading: boolean;
  updateTodo(id: string, markedAsDone: boolean): void;
  onNewTodoSubmit(title: string): void;
  onDragStart(id: string): void;
  onDragEnd(): void;
}

type ComposedProps = Props & RouteComponentProps<any>;

export interface State {
  newTodoTitle: string;
  dragOverIndex: number | null;
  indexBeingDragged: number | null;
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

class Sidebar extends React.Component<ComposedProps, State> {
  constructor(props: ComposedProps) {
    super(props);

    this.state = {
      newTodoTitle: '',
      dragOverIndex: null,
      indexBeingDragged: null,
    };
  }

  render() {
    const {loading, todos, updateTodo} = this.props;
    const {newTodoTitle, dragOverIndex, indexBeingDragged} = this.state;

    const todoMarkup = loading ? (
      <SidebarLoading />
    ) : (
      todos.map(({title, id, markedAsDone}, index) => {
        let offset = 0;

        if (dragOverIndex == null || indexBeingDragged == null) {
          offset = 0;
        } else if (index > indexBeingDragged && index <= dragOverIndex) {
          offset = -42;
        } else if (index < indexBeingDragged && index >= dragOverIndex) {
          offset = 42;
        }

        return (
          <TodoPill
            title={title}
            onTodoButtonClick={updateTodo}
            complete={markedAsDone}
            key={id}
            id={id}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            onDragEnter={this.swapTodos}
            offset={offset}
          />
        );
      })
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
        <div style={{position: 'fixed', bottom: 10, right: 10}}>
          <Button onClick={this.logout}>Log out</Button>
        </div>
      </Container>
    );
  }

  @bind
  private logout() {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  @bind
  private handleDragStart(idBeingDragged: string) {
    this.props.onDragStart(idBeingDragged);
    this.setState({
      indexBeingDragged: this.props.todos.findIndex(
        ({id}) => id === idBeingDragged
      ),
    });
  }

  @bind
  private handleDragEnd() {
    this.setState({
      indexBeingDragged: null,
    });

    this.props.onDragEnd();
  }

  @bind
  private swapTodos(enteredTodoId: string) {
    const {todos} = this.props;
    const enteredTodoIndex = todos.findIndex(({id}) => id === enteredTodoId);

    // Instead of doing this state dance, just use translate3d to move them around - maybe keep an array of offsets
    // You can use the following garbage to get the amount of the offset:
    //
    // parseInt(window.getComputedStyle($0).marginTop, 10) +
    //   parseInt(window.getComputedStyle($0).marginBottom, 10) + parseInt($0.clientHeight, 10)

    this.setState({
      dragOverIndex: enteredTodoIndex,
    });
  }

  @bind
  private handleNewTodoSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
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

export default withRouter<ComposedProps>(Sidebar);
