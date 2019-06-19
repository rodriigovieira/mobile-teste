import React from "react"
import PropTypes from "prop-types"
import AsyncStorage from "@react-native-community/async-storage"
import { Mutation, Query, withApollo } from "react-apollo"

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator
} from "react-native"

import loginUserMutation from "~/services/operations/loginUser"
import meQuery from "~/services/operations/me"

import colors from "~/styles"

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  titleContainer: {
    width: "100%",
    margin: 10,
    alignItems: "center"
  },

  formContainer: {
    width: "80%",
    alignItems: "center"
  },

  emailContainer: {
    width: "100%",
    margin: 10
  },

  passwordContainer: {
    width: "100%",
    margin: 10
  },

  buttonContainer: {
    width: "100%",
    margin: 10
  },

  button: {
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    padding: 8
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },

  signUpButtonContainer: {
    width: "100%"
  },

  signUpButton: {
    alignItems: "center"
  },

  signUpButtonText: {
    color: colors.primaryColor,
    textAlign: "center"
  },

  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    padding: 8
  }
})

const LoginPage = ({ navigation, client }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [errorEmpty, setErrorEmpty] = React.useState(false)
  const [errorLength, setErrorLength] = React.useState(false)
  const [errorLogin, setErrorLogin] = React.useState(false)
  const [loadingQuery, setLoadingQuery] = React.useState(true)

  const isError = errorEmpty || errorLength || errorLogin

  React.useEffect(() => {
    client
      .query({ query: meQuery })
      .then((res) => {
        if (res.data.me.id) {
          navigation.navigate("HomePage")

          return
        }

        setLoadingQuery(false)
      })
      .catch(() => setLoadingQuery(false))
  }, [])

  const getMessage = () => {
    if (errorEmpty) return "Você precisa preencher todos os campos."
    if (errorLength) return "Sua senha precisa de ao menos 8 caracteres."
    if (errorLogin) return "E-mail ou senha incorretos."

    return "Digite abaixo os seus dados de acesso."
  }

  const handleLogin = (loginFunction) => {
    setErrorEmpty(false)
    setErrorLength(false)
    setErrorLogin(false)

    if (!email || !password) {
      setErrorEmpty(true)

      return
    }

    if (password.length < 8) {
      setErrorLength(true)

      return
    }

    loginFunction({
      variables: { email: email.toLowerCase().trim(), password }
    })
      .then(async (res) => {
        const { token } = res.data.loginUser

        if (!token) return

        await AsyncStorage.setItem("@token", token)

        navigation.navigate("HomePage")
      })
      .catch(() => setErrorLogin(true))
  }

  if (loadingQuery) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
      </View>
    )
  }

  return (
    <Mutation mutation={loginUserMutation}>
      {(loginFunction, { loading }) => (
        <View style={styles.pageContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                color: isError ? "red" : "black"
              }}
            >
              {getMessage()}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.emailContainer}>
              <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
              />
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.textInput}
              />
            </View>

            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity onPress={() => handleLogin(loginFunction)} style={styles.button}>
                  <Text style={styles.buttonText}>Efetuar Login</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.signUpButtonContainer}>
              <TouchableHighlight
                onPress={() => navigation.navigate("SignUpPage")}
                style={styles.signUpButton}
              >
                <Text style={styles.signUpButtonText}>Criar conta</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )}
    </Mutation>
  )
}

LoginPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default withApollo(LoginPage)
