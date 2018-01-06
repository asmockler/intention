import React from 'react';
import glamorous from 'glamorous';
import {compose} from 'react-apollo';
import {withRouter, RouteComponentProps} from 'react-router';
import bind from '../../utilities/bind';

import signupUserMutationDecorator, {
  SignupUserMutationProps,
} from './graphql/SignupUserMutation';

import Button from '../../components/Button';
import Heading from '../../components/Heading';
import TextField from '../../components/TextField';

interface State {
  email: string;
  password: string;
}

type ComposedProps = SignupUserMutationProps & RouteComponentProps<any>;

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  maxWidth: 500,
  padding: '100px 10px 10px',
});

class Signup extends React.Component<ComposedProps, State> {
  state: State = {
    email: '',
    password: '',
  };

  render() {
    const {email, password} = this.state;

    return (
      <Container>
        <Heading>Sign up</Heading>

        <TextField
          label="Email"
          onChange={this.handleEmailChange}
          value={email}
        />

        <TextField
          label="Password"
          onChange={this.handlePasswordChange}
          type="password"
          value={password}
        />

        <div style={{padding: 10}} />

        <Button color="green" onClick={this.handleSubmitClick}>
          Submit
        </Button>
      </Container>
    );
  }

  @bind
  private handleSubmitClick() {
    const {email, password} = this.state;

    this.props.signupUser(email, password).then(({data}: any) => {
      localStorage.setItem('token', data.signupUser.token);
      this.props.history.push('/');
    });
  }

  @bind
  private handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;

    this.setState({
      email: newValue,
    });
  }

  @bind
  private handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;

    this.setState({
      password: newValue,
    });
  }
}

export default compose(signupUserMutationDecorator, withRouter)(Signup);
