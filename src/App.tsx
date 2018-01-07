import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {RouteProps} from 'react-router';
import {compose} from 'react-apollo';
import bind from 'utilities/bind';

import loggedInUserQueryDecorator, {
  LoggedInUserQueryResponse,
} from 'graphql/LoggedInUserQuery';

import Home from 'sections/Home';
import Login from 'sections/Login';
import Signup from 'sections/Signup';
import TodosNew from 'sections/TodosNew';

const PrivateRoute = ({
  component: Component,
  loggedIn,
  ...rest
}: RouteProps & {loggedIn: boolean}) => (
  <Route
    render={(props) =>
      Component == null || !loggedIn ? (
        <Redirect to={{pathname: '/login'}} />
      ) : (
        <Component {...props} />
      )
    }
    {...rest}
  />
);

class App extends React.Component<LoggedInUserQueryResponse, never> {
  render() {
    const {loggedInUserQuery} = this.props;

    if (loggedInUserQuery.loading) {
      return <p>Loading...</p>;
    }

    return (
      <Router>
        <Switch>
          <PrivateRoute
            loggedIn={this.isLoggedIn()}
            exact
            path="/"
            component={Home}
          />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/login"
            render={() => <Login onAuthSuccess={this.forceUpdate} />}
          />
          <PrivateRoute
            loggedIn={this.isLoggedIn()}
            exact
            path="/todos/new"
            component={TodosNew}
          />
        </Switch>
      </Router>
    );
  }

  @bind
  private isLoggedIn() {
    const {loggedInUserQuery: {loggedInUser}} = this.props;

    return (
      loggedInUser != null && loggedInUser.id != null && loggedInUser.id !== ''
    );
  }
}

export default compose(loggedInUserQueryDecorator)(App);
