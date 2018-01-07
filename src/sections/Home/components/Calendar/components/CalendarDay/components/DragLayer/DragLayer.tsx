import React from 'react';
import glamorous from 'glamorous';
import Dropzone from './components/Dropzone';

interface Props {
  date: Date;
  onDrop(date: Date): void;
}

const Container = glamorous.div({
  height: '100%',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 2,
});

export default class DragLayer extends React.Component<Props, never> {
  render() {
    const {date, onDrop} = this.props;

    const hours = Array(24 * 4)
      .fill(null)
      .map((_, index) => (
        <Dropzone
          key={index}
          date={new Date(date.valueOf() + index * 15 * 60000)}
          onDrop={onDrop}
        />
      ));

    return <Container>{hours}</Container>;
  }
}
