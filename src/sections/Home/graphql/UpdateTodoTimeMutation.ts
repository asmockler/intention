import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {allTodosQuery, ResponseData} from './AllTodosQuery';

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
      if (mutate == null) {
        return;
      }

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
        update: (proxy, result) => {
          const {data: {updateTodo}} = result as any;

          // console.log('data', data);
          // console.log('proxy', proxy);

          const dataProxy = proxy.readQuery<ResponseData>({
            query: allTodosQuery,
          });

          if (dataProxy == null) {
            return;
          }

          const mutatedTodo = dataProxy.user.todos.find(
            (id) => id === updateTodo.id
          );

          if (mutatedTodo != null) {
            mutatedTodo.startTime = updateTodo.startTime;

            proxy.writeQuery({query: allTodosQuery, data: dataProxy});
          }
        },
      });
    },
  }),
});
