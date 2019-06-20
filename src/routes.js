import React from "react"
import { Button, Alert } from "react-native"

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation"

import LoginPage from "~/pages/LoginPage"
import SignUpPage from "~/pages/SignUpPage"
import HomePage from "~/pages/HomePage"

import BeerDetails from "~/pages/BeerDetails"
import AsyncStorage from "@react-native-community/async-storage"

const Routes = createAppContainer(
  createSwitchNavigator({
    LoginPage,
    SignUpPage,
    HomePage: createStackNavigator(
      { HomePage, BeerDetails },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          title: "Página Inicial",
          headerBackTitle: "Voltar",
          headerRight: (
            <Button
              onPress={() => {
                Alert.alert("Confirmação", "Tem certeza que deseja sair?", [
                  {
                    text: "Cancelar",
                    style: "cancel"
                  },
                  {
                    text: "Sair",
                    onPress: async () => {
                      await AsyncStorage.removeItem("@token")

                      navigation.navigate("LoginPage")
                    },
                    style: "destructive"
                  }
                ])
              }}
              title="Sair"
            />
          )
        })
      }
    )
  })
)

export default Routes
