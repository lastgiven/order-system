import { WebSocketLink } from "apollo-link-ws";
import { ApolloClient } from 'apollo-client';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

const subClient = new SubscriptionClient('wss://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev', {
	reconnect: true
});

const wsLink = new WebSocketLink(subClient);
const httpLink = new HttpLink({
	uri: 'https://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev ',
});


let link = ApolloLink.from([
	httpLink,
	wsLink,
]);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

export default client;