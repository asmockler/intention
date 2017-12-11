import * as React from 'react';
import glamorous from 'glamorous';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

const Container = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  paddingLeft: 20,
});

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Calendar />
        <Sidebar />
      </Container>
    );
  }
}
