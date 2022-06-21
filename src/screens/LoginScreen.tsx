import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useState } from 'react'
import {
  Button,
  Colors,
  Incubator,
  LoaderScreen,
  View,
} from 'react-native-ui-lib' //eslint-disable-line
import { RootStackParamList } from '../routes'

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const { TextField } = Incubator

const baseUrl = 'http://localhost:8080/api'

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
        placeholder={'Email'}
        floatingPlaceholder
        onChangeText={(value) => setEmail(value)}
        enableErrors
        validate={['required', 'email']}
        validationMessage={['Field is required', 'Email is invalid']}
        autoCapitalize="none"
      />
      <TextField
        placeholder={'Password'}
        floatingPlaceholder
        onChangeText={(value) => setPassword(value)}
        enableErrors
        validate={['required', 'email']}
        validationMessage={['Field is required', 'Email is invalid']}
        secureTextEntry
      />
      <View paddingT-s5></View>
      {isLoading && <LoaderScreen color={Colors.grey40} />}
      <Button
        label={'Login'}
        size={Button.sizes.medium}
        backgroundColor={Colors.green30}
        onPress={handleLogin}
      />
    </View>
  )
}

export default LoginScreen
