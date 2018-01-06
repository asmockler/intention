import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/normalize.css';
import './styles/global.css';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjc2ulzxj0um101846p5zzcmw',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
