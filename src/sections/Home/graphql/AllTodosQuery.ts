import gql from 'graphql-tag';

export const allTodosQuery = gql`
  query AllTodosQuery {
    allTodos: allTodoes(orderBy: createdAt_DESC) {
      id
      title
      markedAsDone
    }
  }
`;
