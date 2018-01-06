import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

export interface SignupUserMutationProps {
  signupUser(email: string, password: string): any;
}

export const signupUserMutation = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default graphql(signupUserMutation, {
  props: ({mutate}): SignupUserMutationProps => ({
    signupUser(email: string, password: string) {
      if (mutate == null) {
        return;
      }

      return mutate({
        variables: {email, password},
      });
    },
  }),
});
