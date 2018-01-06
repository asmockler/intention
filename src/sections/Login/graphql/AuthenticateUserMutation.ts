import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

export interface AuthenticateUserMutationProps {
  authenticateUser(email: string, password: string): any;
}

export const authenticateUserMutation = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(authenticateUserMutation, {
  props: ({mutate}): AuthenticateUserMutationProps => ({
    authenticateUser(email: string, password: string) {
      if (mutate == null) {
        return;
      }

      return mutate({
        variables: {email, password},
      });
    },
  }),
});
