/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { RootStackParamList } from './src/routes'
import { LoginScreen, RoomSearchScreen } from './src/screens'

const RootStack = createStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="RoomSearch">
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen
          name="RoomSearch"
          component={RoomSearchScreen}
          options={{ title: 'Room Booking' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App
