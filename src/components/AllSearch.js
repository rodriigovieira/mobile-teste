import React from "react"

import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native"

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
  }
})

let page = 0

const AllSearch = () => {
  const [apiData, setApiData] = React.useState([])
  const [dataLoading, setDataLoading] = React.useState(false)

  console.trom(apiData)

  const handleSearch = (reset = false) => {
    page += 1

    if (reset) page = 1

    setDataLoading(true)

    api
      .get(`/?per_page=10&page=${page}`)
      .then(({ data }) => {
        if (reset) {
          setApiData(data)
        } else {
          const newData = apiData.concat(data)

          setApiData(newData)
        }

        setDataLoading(false)
      })
      .catch(() => setDataLoading(false))
  }

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Buscar Todas Cervejas</Text>

          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>
              Mostrando {apiData.length > 0 ? apiData.length : 0} cervejas. Para
              acessar os detalhes, basta clicar na cerveja.
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {dataLoading ? (
            <ActivityIndicator size="large" color={colors.primaryColor} />
          ) : (
            <TouchableOpacity
              onPress={() => handleSearch(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Buscar Cervejas</Text>
            </TouchableOpacity>
          )}
        </View>

        {apiData.length > 0
          && apiData.map(card => <Card data={card} key={card.id} />)}

        <View style={styles.buttonContainer}>
          {apiData.length > 0
            && (dataLoading ? (
              <ActivityIndicator size="large" color={colors.primaryColor} />
            ) : (
              <TouchableOpacity onPress={() => handleSearch(false)} style={styles.button}>
                <Text style={styles.buttonText}>Mostrar Mais</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </ScrollView>
  )
}

AllSearch.navigationOptions = {
  tabBarLabel: "Tudo"
}

export default AllSearch
