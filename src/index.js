import React from "react"
import { ApolloProvider } from "react-apollo"

import "~/config/ReactotronConfig"

import Routes from "~/routes"

import client from "~/services/apolloClient"

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

export default App
