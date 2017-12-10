import * as React from 'react';
import glamorous from 'glamorous';

import CalendarDay from './components/CalendarDay';

const NUM_DAYS_VISIBLE = 3;

interface State {
  visibleDays: Date[];
}

interface Props {}

const Container = glamorous.div({
  display: 'flex',
  minHeight: '100vh',
  padding: '0 20px',
});

const DayContainer = glamorous.div({
  flex: '1 1 auto',
});

export default class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const now = new Date();

    this.state = {
      visibleDays: Array(NUM_DAYS_VISIBLE).fill(null).map((_, index) => {
        return new Date(now.valueOf() + (86400000 * index));
      }),
    };
  }

  render() {
    const {visibleDays} = this.state;

    return (
      <Container>
        {visibleDays.map((date) => (
          <DayContainer key={date.toString()}>
            <CalendarDay date={date} />
          </DayContainer>
        ))}
      </Container>
    );
  }
}
