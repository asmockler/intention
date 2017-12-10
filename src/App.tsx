import * as React from 'react';
import glamorous from 'glamorous';
import { Sortable, Plugins } from '@shopify/draggable';

import { DRAG_CLASS } from './utilities/make-draggable';

import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

const Container = glamorous.div({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  paddingLeft: 20,
});

export default class App extends React.Component {
  sortableInstance: Sortable;

  componentDidMount() {
    const root = document.getElementById('root');

    if (root == null) {
      throw new Error(`Could not find #root.`);
    }

    this.sortableInstance = new Sortable(root, {
      draggable: `.${DRAG_CLASS}`,
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [Plugins.SwapAnimation],
    });
  }

  render() {
    return (
      <Container>
        <Calendar />
        <Sidebar todos={[{title: '🥛 Milk'}, {title: '🍳 Eggs'}, {title: '🍞 Bread'}]} />
      </Container>
    );
  }
}
