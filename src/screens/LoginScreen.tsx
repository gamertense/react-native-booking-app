import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Colors, Incubator, View } from 'react-native-ui-lib' //eslint-disable-line
import { RootStackParamList } from '../routes'

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const { TextField } = Incubator

function LoginScreen({ navigation }: LoginScreenProps) {
  function handleLogin() {
    navigation.navigate('Home')
  }

  return (
    <View flex padding-s5>
      <TextField
        placeholder={'Email'}
        floatingPlaceholder
        onChangeText={() => console.log('changed')}
        enableErrors
        validate={['required', 'email']}
        validationMessage={['Field is required', 'Email is invalid']}
      />
      <TextField
        placeholder={'Password'}
        floatingPlaceholder
        onChangeText={() => console.log('changed')}
        enableErrors
        validate={['required', 'email']}
        validationMessage={['Field is required', 'Email is invalid']}
      />
      <View paddingT-s5></View>
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
