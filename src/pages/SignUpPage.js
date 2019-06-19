import React from "react"
import PropTypes from "prop-types"
import { Mutation } from "react-apollo"

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator
} from "react-native"

import createUserMutation from "~/services/operations/createUser"

import colors from "~/styles"
import AsyncStorage from "@react-native-community/async-storage"

const styles = StyleSheet.create({
  pageContainer: {
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

  nameContainer: {
    width: "100%",
    margin: 10
  },

  emailContainer: {
    width: "100%",
    margin: 10
  },

  passwordContainer: {
    width: "100%",
    margin: 10
  },

  passwordConfirmContainer: {
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

  loginButtonContainer: {
    width: "100%",
    alignItems: "center"
  },

  loginButton: {
    alignItems: "center"
  },

  loginButtonText: {
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

const SignUpPage = ({ navigation }) => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")

  const [errorEmpty, setErrorEmpty] = React.useState(false)
  const [errorLength, setErrorLength] = React.useState(false)
  const [errorConfirm, setErrorConfirm] = React.useState(false)
  const [errorLogin, setErrorLogin] = React.useState(false)

  const isError = errorEmpty || errorLength || errorLogin || errorConfirm

  const getMessage = () => {
    if (errorEmpty) return "Você precisa preencher todos os campos."
    if (errorLength) return "Sua senha precisa de ao menos 8 caracteres."
    if (errorLogin) return "E-mail ou senha incorretos."
    if (errorConfirm) return "As duas senhas precisam estar iguais."

    return "Digite abaixo os seus dados de acesso."
  }

  const handleCreate = (createUserFunction) => {
    setErrorEmpty(false)
    setErrorLength(false)
    setErrorLogin(false)
    setErrorConfirm(false)

    if (!name || !email || !password || !passwordConfirm) {
      setErrorEmpty(true)

      return
    }

    if (password.length < 8) {
      setErrorLength(true)

      return
    }

    if (password !== passwordConfirm) {
      setErrorConfirm(true)

      return
    }

    createUserFunction({
      variables: { name: name.trim(), email: email.toLowerCase().trim(), password }
    })
      .then(async (res) => {
        const { token } = res.data.createUser

        if (!res.data.createUser.token) return

        await AsyncStorage.setItem("@token", token)

        navigation.navigate("HomePage")
      })
      .catch(() => setErrorLogin(true))
  }

  return (
    <Mutation mutation={createUserMutation}>
      {(createUserFunction, { loading }) => (
        <View style={styles.pageContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                color: isError ? "red" : "black"
              }}
            >
              {getMessage()}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.emailContainer}>
              <TextInput
                autoCompleteType="name"
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.textInput}
              />
            </View>

            <View style={styles.nameContainer}>
              <TextInput
                autoCompleteType="email"
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
                textContentType="none"
                value={password}
                onChangeText={setPassword}
                style={styles.textInput}
              />
            </View>

            <View style={styles.passwordConfirmContainer}>
              <TextInput
                secureTextEntry
                placeholder="Confirmação de Senha"
                textContentType="none"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                style={styles.textInput}
              />
            </View>

            {loading ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleCreate(createUserFunction)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.loginButtonContainer}>
              <TouchableHighlight
                onPress={() => navigation.navigate("LoginPage")}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Efetuar Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )}
    </Mutation>
  )
}

SignUpPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default SignUpPage
