import React from "react"

import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

const pages = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>oi</Text>
    </View>
  )
}

export default pages
