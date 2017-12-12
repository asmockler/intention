import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface SubmitTodoMutationProps {
  submitTodo(title: string, duration?: number): void;
}

export const submitTodoMutation = gql`
  mutation SubmitTodoMutation($title: String!, $duration: Int) {
    submitTodo(title: $title, duration: $duration) {
      id
      title
      duration
      markedAsDone
    }
  }
`;

export default graphql(submitTodoMutation, {
  props: ({mutate}): SubmitTodoMutationProps => ({
    submitTodo(title: string, duration?: number) {
      if (mutate == null) { return; }

      return mutate({
        variables: {title, duration},
        optimisticResponse: {
          __typename: 'Mutation',
          submitTodo: {
            __typename: 'Todo',
            markedAsDone: false,
            title,
            duration: duration == null ? 15 : duration,
          }
        },
      });
    },
  }),
});
