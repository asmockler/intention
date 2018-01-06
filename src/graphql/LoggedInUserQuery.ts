import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {ApolloResponse} from '../types';

interface Response {
  loggedInUser: {
    id: string | null;
  } | null;
}

export type LoggedInUserQueryResponse = ApolloResponse<
  Response,
  'loggedInUserQuery'
>;

export const loggedInUserQuery = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`;

export default graphql(loggedInUserQuery, {
  options: {fetchPolicy: 'network-only'},
  name: 'loggedInUserQuery',
});
