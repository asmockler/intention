import React from 'react';
import glamorous from 'glamorous';
import bind from 'utilities/bind';

interface State {
  currentTime: Date;
}

const HourContainer = glamorous.div({
  borderTop: '1px solid #EAEAEA',
  display: 'flex',
  height: 60,
  position: 'relative',
});

const Hour = glamorous.p({
  background: 'white',
  color: '#777',
  fontFeatureSettings: '"tnum"',
  fontSize: 9,
  fontWeight: 600,
  margin: '-7px 0 0',
  width: 20,
});

const TimeIndicator = glamorous.div<{top: number}>(
  {
    background: 'salmon',
    height: '2px',
    position: 'absolute',
    width: '100%',
  },
  ({top}) => ({
    top,
  })
);

export default class DisplayLayer extends React.Component<{}, State> {
  state: State = {
    currentTime: new Date(),
  };
  private updateTimeInterval: number | null = null;

  componentDidMount() {
    this.updateTimeInterval = window.setInterval(this.updateTime, 60000);
  }

  componentWillUnmount() {
    if (this.updateTimeInterval == null) {
      return;
    }

    window.clearInterval(this.updateTimeInterval);
  }

  render() {
    const {currentTime} = this.state;
    const currentMinute =
      currentTime.getMinutes() + currentTime.getHours() * 60;

    const hours = Array(24)
      .fill(null)
      .map((_, index) => (
        <HourContainer key={index}>
          <Hour>{index < 10 ? `0${index}` : index}</Hour>
        </HourContainer>
      ));

    return (
      <div>
        {hours}
        <TimeIndicator top={currentMinute} />
      </div>
    );
  }

  @bind
  private updateTime() {
    this.setState({
      currentTime: new Date(),
    });
  }
}
