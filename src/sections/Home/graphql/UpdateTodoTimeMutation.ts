import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface UpdateTodoTimeMutationProps {
  updateTodoTime(id: string, date: Date): any;
}

export const updateTodoTimeMutation = gql`
  mutation UpdateTodoTimeMutation($id: ID!, $startTime: DateTime) {
    updateTodo(id: $id, startTime: $startTime) {
      id
      startTime
    }
  }
`;

export default graphql(updateTodoTimeMutation, {
  props: ({mutate}): UpdateTodoTimeMutationProps => ({
    updateTodoTime(id: string, startTime: Date) {
      if (mutate == null) { return; }

      return mutate({
        variables: {id, startTime},
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            __typename: 'Todo',
            id,
            startTime,
          },
        },
      });
    }
  }),
});
