import * as React from 'react';
import glamorous from 'glamorous';

import Heading from '../../../../components/Heading';
import TodoPill from '../TodoPill';
import SidebarLoading from './components/SidebarLoading';

import { Todo } from '../../../../types';

export interface Props {
  todos: Todo[];
  loading: boolean;
  updateTodo(id: string, markedAsDone: boolean): void;
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

export default class Sidebar extends React.Component<Props, {}> {
  render() {
    const {loading, todos, updateTodo} = this.props;

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
          {todoMarkup}
        </StickyContainer>
      </Container>
    );
  }
}
