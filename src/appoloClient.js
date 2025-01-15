import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

// Настраиваем HTTP-ссылку
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql", // HTTP URI вашего GraphQL-сервера
});

// Настраиваем WebSocket-ссылку
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql`, // WebSocket URI
  options: {
    reconnect: true,
  },
});

// Логика переключения между WebSocket и HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Создаем ApolloClient
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
