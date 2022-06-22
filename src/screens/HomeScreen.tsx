import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import {
  Button,
  Colors,
  DateTimePicker,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib' //eslint-disable-line
import { RootStackParamList } from '../routes'
import { ErrorResponseBody } from '../types/error-response'

const { TextField } = Incubator

const baseUrl = 'http://localhost:8080/api'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

function HomeScreen({ navigation }: HomeScreenProps) {
  const [numPeople, setNumPeople] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    setIsLoading(true)

    try {
      await axios.post(`${baseUrl}/login`, {})
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
    <View padding-s5>
      <Text text60>Fill in details</Text>

      <View paddingT-s5></View>

      <TextField
        testID="numPeopleInput"
        placeholder={'Number of people'}
        floatingPlaceholder
        keyboardType="number-pad"
        onChangeText={(value) => setNumPeople(parseInt(value))}
        enableErrors
        validate={['required']}
        validationMessage={['Field is required']}
        autoCapitalize="none"
      />
      <DateTimePicker
        // @ts-expect-error
        containerStyle={{ marginVertical: 20 }}
        title={'Date'}
        placeholder={'Select a date'}
        // dateFormat={'MMM D, YYYY'}
        // value={new Date('October 13, 2014')}
      />
      <DateTimePicker
        mode={'time'}
        // @ts-expect-error
        title={'Time'}
        placeholder={'Select time'}
        // timeFormat={'h:mm A'}
        // value={new Date('2015-03-25T12:00:00-06:30')}
      />
      <Button
        testID="findRooms"
        label={'Find'}
        size={Button.sizes.medium}
        backgroundColor={Colors.green30}
        onPress={handleLogin}
      />
    </View>
  )
}

export default HomeScreen
