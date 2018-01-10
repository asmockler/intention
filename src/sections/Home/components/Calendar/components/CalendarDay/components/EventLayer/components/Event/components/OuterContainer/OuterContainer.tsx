import React from 'react';
import glamorous from 'glamorous';

interface Props {
  children: React.ReactNode;
  hour: number;
  duration: number;
  isDragging: boolean;
  onDragStart(): void;
  onDragEnd(): void;
}

const OuterContainer = glamorous.div<Props>(
  {
    left: 22,
    right: 0,
    padding: '1px 0',
    pointerEvents: 'visible',
    position: 'absolute',
  },
  ({isDragging, duration, hour}) => ({
    height: duration,
    opacity: isDragging ? 0 : 1,
    transform: isDragging ? 'scale(0.95)' : 'scale(1)',
    transition: isDragging ? 'opacity 0.15s, transform 0.15s' : 'opacity 0.15s',
    top: hour * 60,
  })
);

export default ({
  children,
  hour,
  duration,
  isDragging,
  onDragStart,
  onDragEnd,
}: Props) => (
  <OuterContainer
    draggable={true}
    hour={hour}
    duration={duration}
    isDragging={isDragging}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
  >
    {children}
  </OuterContainer>
);
