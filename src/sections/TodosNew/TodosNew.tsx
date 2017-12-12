import * as React from 'react';
import bind from '../../utilities/bind';

import Heading from '../../components/Heading';
import FormContainer from '../../components/FormContainer';
import TextField from '../../components/TextField';

interface Props {}
interface State {
  title: string;
}

export default class TodosNew extends React.Component<Props, State> {
  state = {
    title: '',
  };

  render() {
    const {title} = this.state;

    return (
      <FormContainer>
        <Heading>New todo</Heading>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleTitleChange}
        />
        <TextField
          label="Duration"
          value={title}
          onChange={this.handleTitleChange}
        />
      </FormContainer>
    );
  }

  @bind
  private handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: event.target.value,
    });
  }
}
