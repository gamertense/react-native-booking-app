import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Alert } from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'
import {
  Button,
  Colors,
  DateTimePicker,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib' //eslint-disable-line
import { DATE_TIME_FORMAT } from '../constants/datetime'
import { BASE_URL } from '../constants/url'
import { RootStackParamList } from '../routes'
import { ErrorResponseBody } from '../types/error-response'

const { TextField } = Incubator

interface AvailableRoomResponse {
  id: string
}

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

function HomeScreen({ navigation }: HomeScreenProps) {
  const [numPeople, setNumPeople] = useState(0)
  const [date, setDate] = useState<Date>()
  const [startDateTime, setStartDateTime] = useState<Date>()
  const [endDateTime, setEndDateTime] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    setIsLoading(true)

    try {
      console.debug({ date, startDateTime, endDateTime })

      const selectedDateFormat = dayjs(date).format('YYYY-MM-DD')
      const startHours = startDateTime?.getHours()
      const startMins = startDateTime?.getMinutes()
      const endHours = endDateTime?.getHours()
      const endMins = startDateTime?.getMinutes()

      const startDateStr = dayjs(
        `${selectedDateFormat} ${startHours}:${startMins}`
      ).format(DATE_TIME_FORMAT)
      const endDateStr = dayjs(
        `${selectedDateFormat} ${endHours}:${endMins}`
      ).format(DATE_TIME_FORMAT)

      console.debug({ numPeople, startDateStr, endDateStr })

      const { data: responseData } = await axios.get<AvailableRoomResponse[]>(
        `${BASE_URL}/rooms?numPeople=${numPeople}&startDatetime=${startDateStr}&endDatetime=${endDateStr}`
      )
      if (responseData.length === 0)
        Alert.alert('Sorry', 'There is no available room as of now', [
          { text: 'OK' },
        ])
      console.debug('response data', responseData)
      // navigation.navigate('')
    } catch (err: any) {
      console.error(err)

      if (axios.isAxiosError(err) && err.response) {
        const responseData = err?.response?.data as ErrorResponseBody
        console.debug(responseData)
        Alert.alert('Error!', responseData.message, [{ text: 'OK' }])
      }
    }
    setIsLoading(false)
    navigation.navigate('Home')
  }

  return (
    <View padding-s5>
      {isLoading && <Spinner visible={isLoading} />}

      <Text text60>Fill in details</Text>

      <View paddingT-s5></View>

      <TextField
        testID="numPeopleInput"
        placeholder={'Enter number of people'}
        floatingPlaceholder
        keyboardType="number-pad"
        onChangeText={(value) => setNumPeople(parseInt(value))}
        enableErrors
        validate={['required']}
        validationMessage={['Field is required']}
        autoCapitalize="none"
      />
      <DateTimePicker
        testID="dateInput"
        // @ts-expect-error
        containerStyle={{ marginVertical: 20 }}
        title={'Date'}
        placeholder={'Select a date'}
        onChange={(value: Date) => setDate(value)}
        // dateFormat={'MMM D, YYYY'}
        // value={new Date('October 13, 2014')}
      />
      <DateTimePicker
        testID="startTime"
        mode={'time'}
        // @ts-expect-error
        title={'Start Time'}
        placeholder={'Select start time'}
        onChange={(value: Date) => setStartDateTime(value)}
        // timeFormat={'h:mm A'}
        // value={new Date('2015-03-25T12:00:00-06:30')}
      />
      <DateTimePicker
        testID="endTime"
        mode={'time'}
        // @ts-expect-error
        title={'End Time'}
        placeholder={'Select end time'}
        onChange={(value: Date) => setEndDateTime(value)}
        // timeFormat={'h:mm A'}
        // value={new Date('2015-03-25T12:00:00-06:30')}
      />
      <Button
        testID="findRoomBtn"
        label={'Find'}
        size={Button.sizes.medium}
        backgroundColor={Colors.green30}
        onPress={handleLogin}
      />
    </View>
  )
}

export default HomeScreen
