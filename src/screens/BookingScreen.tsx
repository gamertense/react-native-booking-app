import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native-ui-lib' //eslint-disable-line
import { RootStackParamList } from '../routes'

type BookingScreenProps = NativeStackScreenProps<RootStackParamList, 'Booking'>

function BookingScreen({ navigation }: BookingScreenProps) {
  return (
    <View flex padding-s5>
      <View paddingT-s5></View>
      <Text text60>Booking screen</Text>
    </View>
  )
}

export default BookingScreen
