import { ApolloServer } from 'apollo-server'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from 'apollo-server-core'

const port = 4000

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'Posts', url: 'http://localhost:4002' }
    ]
  })
})

const server = new ApolloServer({
  gateway,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: 'plaid-gufzoj@current'
      })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true })
  ]
})

async function start() {
  try {
    const { url } = await server.listen({ port })
    console.log(url)
  } catch (e) {
    console.log(e)
  }
}

start()
