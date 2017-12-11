import gql from 'graphql-tag';

export const updateMarkedAsDoneMutation = gql`
  mutation UpdateMarkedAsDoneMutation($id: ID!, $markedAsDone: Boolean!) {
    updateTodo(id: $id, markedAsDone: $markedAsDone) {
      id
      markedAsDone
    }
  }
`;
