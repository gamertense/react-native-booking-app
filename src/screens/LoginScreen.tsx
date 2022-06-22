import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Button, Colors, Incubator, View } from 'react-native-ui-lib' //eslint-disable-line
import { RootStackParamList } from '../routes'
import { ErrorResponseBody } from '../types/error-response'

const { TextField } = Incubator

const baseUrl = 'http://localhost:8080/api'

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
    } catch (err: any) {
      console.error(err)

      if (axios.isAxiosError(err) && err.response) {
        const responseData = err?.response?.data as ErrorResponseBody
        console.debug(responseData)
        Alert.alert('Error!', responseData.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ])
      }
    }
    setIsLoading(false)
    navigation.navigate('Home')
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
