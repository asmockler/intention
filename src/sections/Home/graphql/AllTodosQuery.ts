import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { ApolloResponse, Todo } from '../../../types';

export interface ResponseData {
  allTodos: Todo[];
}

export type AllTodosQueryProps = ApolloResponse<ResponseData>;

export const allTodosQuery = gql`
  query AllTodosQuery {
    allTodos: allTodoes(orderBy: createdAt_DESC) {
      id
      title
      markedAsDone
    }
  }
`;

export default graphql(allTodosQuery);
