import dayjs from 'dayjs'

const { device } = require('detox')

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'

const tomorrowDate = dayjs().add(2, 'day').set('hour', 4)

const isIOS = () => device.getPlatform() === 'ios'
// const getDateTimePickerIOS = (id) =>
//   element(by.type('UIDatePicker').withAncestor(by.id(id)))
const getDateTimePickerIOS = (id) => element(by.id(id))

describe('Booking flow', () => {
  beforeEach(async () => {
    if (isIOS()) {
      await device.reloadReactNative()
    }
  })

  it('should fill in details for room search', async () => {
    await element(by.id('numPeopleInput')).typeText('5')

    if (isIOS()) {
      const dateInputElement = getDateTimePickerIOS('dateInput')
      await dateInputElement.setDatePickerDate(
        tomorrowDate.format(DATE_FORMAT),
        'yyyy-MM-dd'
      )

      // Input not set
      console.log('Start time: ', tomorrowDate.format(TIME_FORMAT))
      await getDateTimePickerIOS('startTimeInput').setDatePickerDate(
        tomorrowDate.format(TIME_FORMAT),
        TIME_FORMAT
      )
      await getDateTimePickerIOS('endTimeInput').setDatePickerDate(
        tomorrowDate.add(1, 'hour').format(TIME_FORMAT),
        TIME_FORMAT
      )
      //
      await element(by.id('findRoomBtn')).tap()
      await waitFor(element(by.text('Booking screen')))
        .toBeVisible()
        .withTimeout(2000)
    }
  })
})
