import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

export interface UpdateMarkedAsDoneMutationProps {
  updateMarkedAsDone(id: string, markedAsDone: boolean): any;
}

export const updateMarkedAsDoneMutation = gql`
  mutation UpdateMarkedAsDoneMutation($id: ID!, $markedAsDone: Boolean!) {
    updateTodo(id: $id, markedAsDone: $markedAsDone) {
      id
      markedAsDone
    }
  }
`;

export default graphql(updateMarkedAsDoneMutation, {
  props: ({mutate}): UpdateMarkedAsDoneMutationProps => ({
    updateMarkedAsDone(id: string, markedAsDone: boolean) {
      if (mutate == null) {
        return;
      }

      return mutate({
        variables: {id, markedAsDone},
        optimisticResponse: {
          __typename: 'Mutation',
          updateTodo: {
            __typename: 'Todo',
            id,
            markedAsDone,
          },
        },
      });
    },
  }),
});
