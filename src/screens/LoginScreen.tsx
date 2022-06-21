import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { Button, Colors, Incubator, View } from 'react-native-ui-lib' //eslint-disable-line
import { RootStackParamList } from '../routes'

const { TextField } = Incubator

const baseUrl = 'http://192.168.1.38:8080/api'

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    setIsLoading(true)

    try {
      await axios.post(`${baseUrl}/login`, {
        email,
        password,
      })
      navigation.navigate('Home')
    } catch (error) {
      console.error(error)
      setEmail('')
      setPassword('')
    }
    setIsLoading(false)
  }

  return (
    <View flex padding-s5>
      <TextField
        testID="email"
        placeholder={'Email'}
        floatingPlaceholder
        onChangeText={(value) => setEmail(value)}
        enableErrors
        validate={['required', 'email']}
        validationMessage={['Field is required', 'Email is invalid']}
        autoCapitalize="none"
      />
      <TextField
        testID="password"
        placeholder={'Password'}
        floatingPlaceholder
        onChangeText={(value) => setPassword(value)}
        enableErrors
        validate={['required', 'email']}
        validationMessage={['Field is required', 'Email is invalid']}
        secureTextEntry
      />
      <View paddingT-s5></View>

      {isLoading && <Spinner visible={isLoading} />}

      <Button
        testID="loginButton"
        label={'Login'}
        size={Button.sizes.medium}
        backgroundColor={Colors.green30}
        onPress={handleLogin}
      />
    </View>
  )
}

export default LoginScreen
