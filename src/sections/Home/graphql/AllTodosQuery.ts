import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Todo, ApolloResponse} from '../../../types';

export interface ResponseData {
  user: {
    todos: Todo[];
  };
}

export type AllTodosQueryResult = ApolloResponse<ResponseData, 'allTodosQuery'>;

export const allTodosQuery = gql`
  query AllTodosQuery {
    user {
      todos(orderBy: createdAt_DESC) {
        id
        title
        markedAsDone
        startTime
        duration
      }
    }
  }
`;

export default graphql(allTodosQuery, {name: 'allTodosQuery'});
