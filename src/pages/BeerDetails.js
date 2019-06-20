import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NavigationEvents } from "react-navigation"

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center"
  },

  titleContainer: {
    margin: 10,
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  descriptionContainer: {
    width: "80%",
    margin: 10,
    alignItems: 'center'
  },

  description: {
    fontSize: 16
  }
})

const BeerDetails = ({ navigation }) => {
  const [beerData, setBeerData] = React.useState({})

  return (
    <View style={styles.pageContainer}>
      <NavigationEvents
        onWillFocus={() => {
          setBeerData(navigation.getParam("beerData"))
        }}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{beerData.name}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{beerData.description}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>PH: {beerData.ph}</Text>
      </View>
    </View>
  )
}

BeerDetails.navigationOptions = {
  title: "Detalhes da Cerveja"
}

export default BeerDetails
