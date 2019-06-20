import React from "react"
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import Card from "~/components/Card"

import colors from "~/styles"

import api from "~/services/api"

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center"
  },

  titleContainer: {
    margin: 10,
    width: "80%",
    alignItems: "center"
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },

  subTitleContainer: {
    marginTop: 10
  },

  subTitle: {
    fontSize: 16,
    textAlign: "center"
  },

  buttonContainer: {
    margin: 10,
    width: "60%"
  },

  button: {
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    alignItems: "center",
    padding: 8
  },

  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },

  inputContainer: {
    margin: 10,
    width: "60%",
    alignItems: "center"
  },

  input: {
    borderRadius: 5,
    fontSize: 16,
    padding: 5,
    borderWidth: 0.5,
    borderColor: colors.primaryColor,
    width: "100%"
  }
})

const IdSearch = () => {
  const [apiData, setApiData] = React.useState([])
  const [dataLoading, setDataLoading] = React.useState(false)
  const [beerId, setBeerId] = React.useState()

  const handleSearch = () => {
    setDataLoading(true)

    api
      .get(`/${beerId}`)
      .then(({ data }) => {
        setApiData(data)

        setDataLoading(false)
      })
      .catch(() => setDataLoading(false))
  }

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Buscar por ID</Text>

          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Digite o ID da cerveja abaixo.</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            type="numeric"
            value={beerId}
            onChangeText={setBeerId}
            placeholder="ID da cerveja"
          />
        </View>

        <View style={styles.buttonContainer}>
          {dataLoading ? (
            <ActivityIndicator size="large" color={colors.primaryColor} />
          ) : (
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Buscar Cerveja</Text>
            </TouchableOpacity>
          )}
        </View>

        {apiData.length > 0
          && apiData.map(card => <Card data={card} key={card.id} />)}
      </View>
    </ScrollView>
  )
}

IdSearch.navigationOptions = {
  tabBarLabel: "Pelo ID"
}

export default IdSearch
