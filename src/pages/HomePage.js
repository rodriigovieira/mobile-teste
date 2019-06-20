import React from "react"
import { createMaterialTopTabNavigator } from "react-navigation"

import {
  View, Text, StyleSheet, SafeAreaView
} from "react-native"

import colors from "~/styles"

import RandomSearch from "~/components/RandomSearch"
import IdSearch from "~/components/IdSearch"
import AllSearch from "~/components/AllSearch"

const pages = createMaterialTopTabNavigator(
  {
    AllSearch,
    RandomSearch,
    IdSearch
  },
  {
    initialRouteName: "AllSearch",
    tabBarOptions: {
      tabStyle: { backgroundColor: colors.primaryColor },
      indicatorStyle: { backgroundColor: "red" }
    }
  }
)

export default pages
