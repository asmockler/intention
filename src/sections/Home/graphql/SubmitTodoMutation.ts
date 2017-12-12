import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { allTodosQuery, ResponseData } from './AllTodosQuery';

export interface CreateTodoMutationProps {
  createTodo(title: string, duration?: number): void;
}

export const createTodoMutation = gql`
  mutation CreateTodoMutation($title: String!, $duration: Int) {
    createTodo(title: $title, duration: $duration) {
      id
      title
      duration
      markedAsDone
    }
  }
`;

export default graphql(createTodoMutation, {
  props: ({mutate}): CreateTodoMutationProps => ({
    createTodo(title: string, duration?: number) {
      if (mutate == null) { return; }

      return mutate({
        variables: {title, duration},
        optimisticResponse: {
          __typename: 'Mutation',
          createTodo: {
            __typename: 'Todo',
            id: '',
            title,
            duration: duration == null ? 15 : duration,
            markedAsDone: false,
          },
        },
        update: (proxy, result) => {
          const {data: {createTodo}} = result as any;
          const dataProxy = proxy.readQuery<ResponseData>({query: allTodosQuery});

          if (dataProxy == null) { return; }

          dataProxy.allTodos.unshift(createTodo);

          proxy.writeQuery({query: allTodosQuery, data: dataProxy});
        },
      });
    },
  }),
});
