import React from "react"
import {
  View, Text, StyleSheet, Image
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { withNavigation } from "react-navigation"

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 200,
    minWidth: "60%",
    margin: 10,
    padding: 10,
    backgroundColor: "rgba(240,240,240, 1)",
    borderRadius: 5,
    alignItems: "center"
  },

  imageContainer: {
    margin: 10
  },

  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: "contain"
  },

  title: {
    fontWeight: "bold",
    fontSize: 16
  }
})

const Card = ({ data, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BeerDetails", {
        beerData: data
      })
      }
      style={styles.cardContainer}
    >
      <Text style={styles.title}>{data.name}</Text>

      <View style={styles.imageContainer}>
        {data.image_url ? (
          <Image style={styles.imageStyle} source={{ uri: data.image_url }} />
        ) : (
          <Text>Essa cerveja não tem imagem :(</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default withNavigation(Card)
