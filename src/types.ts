import { QueryProps } from 'react-apollo';

export interface ApolloResponse<T> {
  data: QueryProps & T;
}

export interface Todo {
  id: string;
  title: string;
  markedAsDone: boolean;
  duration: number;
  startTime: string | null;
}
