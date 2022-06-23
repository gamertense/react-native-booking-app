import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import Spinner from 'react-native-loading-spinner-overlay'
import { Button, TextInput } from 'react-native-paper'
import { DATE_TIME_FORMAT } from '../constants/datetime'
import { BASE_URL } from '../constants/url'
import { BookingScreenParams, RootStackParamList } from '../routes'
import { ErrorResponseBody } from '../types/error-response'

interface AvailableRoomResponse {
  id: string
  capacity: number
}

type RoomSearchProps = NativeStackScreenProps<RootStackParamList, 'RoomSearch'>

function RoomSearch({ navigation }: RoomSearchProps) {
  const [numPeople, setNumPeople] = useState('0')
  const [date, setDate] = useState<Date>(new Date())
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0))
    } else {
      setDate(currentDate)
    }
  }

  const handleLogin = async () => {
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
      if (responseData.length === 0) {
        Alert.alert('Sorry', 'There is no available room as of now', [
          { text: 'OK' },
        ])
        setIsLoading(false)
        return
      }
      console.debug('response data', responseData)

      const navParams: BookingScreenParams = {
        startDate: startDateStr,
        endDate: endDateStr,
        rooms: responseData.map((data) => {
          return { id: data.id, capacity: data.capacity }
        }),
      }
      console.debug('navigate to booking with params', navParams)

      navigation.navigate('Booking', navParams)
    } catch (err: any) {
      console.error(err)

      if (axios.isAxiosError(err) && err.response) {
        const responseData = err?.response?.data as ErrorResponseBody
        console.debug(responseData)
        Alert.alert('Error!', responseData.message, [{ text: 'OK' }])
      }
    }
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      {isLoading && <Spinner visible={isLoading} />}

      <View style={styles.row}>
        <Text>Number of people</Text>
        <TextInput
          testID="numPeopleInput"
          value={numPeople}
          onChangeText={(text) => setNumPeople(text)}
          keyboardType="number-pad"
          dense
        />
      </View>

      <View style={styles.space}></View>

      <View style={styles.row}>
        <Text style={{ flex: 1 }}>Date</Text>
        <DateTimePicker
          testID="dateInput"
          value={date}
          onChange={onDateChange}
          placeholderText="Select a date"
          style={{ flex: 4 }}
        />
      </View>

      <View style={styles.space}></View>

      <View style={styles.row}>
        <Text style={{ flex: 1 }}>Start time</Text>
        <DateTimePicker
          testID="startTimeInput"
          mode={'time'}
          value={startDateTime}
          onChange={(event: any, newTime?: Date) =>
            setStartDateTime(newTime || startDateTime)
          }
          placeholderText="Select start time"
          style={{ flex: 4 }}
        />
      </View>

      <View style={styles.space}></View>

      <View style={styles.row}>
        <Text>End time</Text>
        <DateTimePicker
          testID="endTimeInput"
          mode={'time'}
          value={endDateTime}
          onChange={(event: any, newTime?: Date) =>
            setEndDateTime(newTime || endDateTime)
          }
          placeholderText="Select end time"
          style={{ flex: 4 }}
        />
      </View>

      <View style={styles.space}></View>
      <View style={styles.space}></View>

      <Button
        testID="findRoomBtn"
        mode="contained"
        onPress={handleLogin}
        color="green"
        disabled={parseInt(numPeople) === 0}
      >
        Find Room
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  space: {
    marginTop: 16,
  },
})

export default RoomSearch
