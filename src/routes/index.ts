type Room = {
  id: string
  capacity: number
}
export type BookingScreenParams = {
  startDate: string
  endDate: string
  rooms: Room[]
}

export type RootStackParamList = {
  Login: undefined
  RoomSearch: undefined
  Booking: BookingScreenParams
}
