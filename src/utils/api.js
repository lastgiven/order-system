import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev',
});

export default client;