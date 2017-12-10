import * as React from 'react';
import glamorous from 'glamorous';
import bind from '../../../../utilities/bind';

interface Props {
  hour: number;
}

interface State {
  isActiveDropzone: boolean;
}

const Container = glamorous.div<{highlighted: boolean}>({
  display: 'flex',
  height: 60,
  position: 'relative',
}, ({highlighted}) => ({
  backgroundColor: highlighted ? '#FAFAFA' : '#FFFFFF',
}));

const Hour = glamorous.p({
  color: '#777',
  fontFeatureSettings: '"tnum"',
  fontSize: 9,
  fontWeight: 600,
  margin: '-7px 0 0',
  width: 30,
});

const ContentContainer = glamorous.div({
  borderTop: '1px solid #EAEAEA',
  flex: '1 0 auto',
});

export default class CalendarHour extends React.Component<Props, State> {
  state = {
    isActiveDropzone: false,
  };

  @bind
  handleDragEnter() {
    this.setState({isActiveDropzone: true});
  }

  @bind
  handleDragLeave() {
    this.setState({isActiveDropzone: false});
  }

  render() {
    const {hour} = this.props;
    const {isActiveDropzone} = this.state;

    const formattedHour = hour < 10 ? `0${hour}` : hour;

    return (
      <Container
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        highlighted={isActiveDropzone}
      >
        <Hour>{formattedHour}</Hour>
        <ContentContainer />
      </Container>
    );
  }
}
