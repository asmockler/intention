import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './sections/Home';
import TodosNew from './sections/TodosNew';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/todos/new" component={TodosNew} />
        </Switch>
      </Router>
    );
  }
}
