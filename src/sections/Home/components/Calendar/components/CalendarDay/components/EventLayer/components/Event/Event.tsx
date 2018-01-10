import React from 'react';
import glamorous from 'glamorous';
import bind from 'utilities/bind';
import {Todo} from 'types';

import OuterContainer from './components/OuterContainer';
import InnerContainer from './components/InnerContainer';

interface Props {
  event: Todo;
  onDragStart(id: string): void;
  onDragEnd(id: string): void;
  onTodoCheckboxClick(id: string, markedAsDone: boolean): void;
}

interface State {
  isDragging: boolean;
}

const Content = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
});

const Button = glamorous.button(
  {
    border: '2px solid white',
    borderRadius: '100%',
    height: 16,
    marginRight: 8,
    padding: 0,
    width: 16,
  },
  ({complete}: {complete: boolean}) => ({
    background: complete ? 'white' : 'transparent',
  })
);

const Title = glamorous.p({
  fontSize: 12,
  fontWeight: 'bold',
  lineHeight: 0,
  margin: 0,
});

interface DragHandleProps {
  location: 'top' | 'bottom';
}
const DragHandle = glamorous.div<DragHandleProps>(
  {
    background: 'transparent',
    cursor: 'ns-resize',
    height: 5,
    position: 'absolute',
    width: '100%',
  },
  ({location}) => ({
    bottom: location === 'bottom' ? 1 : 'auto',
    top: location === 'top' ? 1 : 'auto',
  })
);

export default class Event extends React.Component<Props, State> {
  state: State = {
    isDragging: false,
  };

  render() {
    const {event} = this.props;
    const {isDragging} = this.state;

    if (event.startTime == null) {
      // eslint-disable-next-line no-console
      console.warn(
        `Event with id ${
          event.id
        } tried to render on calendar despite not having a start time`
      );
      return null;
    }

    const startTime = new Date(event.startTime);

    return (
      <OuterContainer
        isDragging={isDragging}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        duration={event.duration}
        hour={startTime.getHours() + startTime.getMinutes() / 60}
      >
        <InnerContainer slim={event.duration < 30}>
          <DragHandle location="top" />
          <Content>
            <Button
              complete={event.markedAsDone}
              onClick={this.handleTodoCheckboxClick}
            />
            <Title>{event.title}</Title>
          </Content>
          <DragHandle location="bottom" />
        </InnerContainer>
      </OuterContainer>
    );
  }

  @bind
  private handleTodoCheckboxClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const {event, onTodoCheckboxClick} = this.props;

    onTodoCheckboxClick(event.id, !event.markedAsDone);
  }

  @bind
  private handleDragStart() {
    this.props.onDragStart(this.props.event.id);
    this.setState({isDragging: true});
  }

  @bind
  private handleDragEnd() {
    this.props.onDragEnd(this.props.event.id);
    this.setState({isDragging: false});
  }
}
