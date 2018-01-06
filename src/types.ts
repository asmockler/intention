import {QueryProps} from 'react-apollo';

export type ApolloResponse<Data, QueryName extends string = 'data'> = {
  [name in QueryName]: QueryProps & Data
};

export interface Todo {
  id: string;
  title: string;
  markedAsDone: boolean;
  duration: number;
  startTime: string | null;
}
