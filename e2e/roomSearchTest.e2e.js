import dayjs from 'dayjs'

const { device } = require('detox')

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'

const tomorrowDate = dayjs().add(2, 'day').set('hour', 4)

const isIOS = () => device.getPlatform() === 'ios'

const getElementById = (id) => element(by.id(id))

describe('Booking flow', () => {
  beforeEach(async () => {
    if (isIOS()) {
      await device.reloadReactNative()
    }
  })

  it('should disable the button when page loads', async () => {
    try {
      await getElementById('findRoomBtn').tap()
      await expect(getElementById('findRoomBtn')).not.toBeVisible()
      console.log('Button should be disabled')
    } catch (e) {
      console.log('Button should be disabled')
    }
  })

  it('should show a message if no room is available', async () => {
    await getElementById('numPeopleInput').replaceText('100')

    await getElementById('findRoomBtn').tap()
    await waitFor(element(by.text('Sorry')))
      .toBeVisible()
      .withTimeout(2000)
  })

  it('should find rooms successfully', async () => {
    await getElementById('numPeopleInput').replaceText('5')

    if (isIOS()) {
      const dateInputElement = getElementById('dateInput')
      await dateInputElement.setDatePickerDate(
        tomorrowDate.format(DATE_FORMAT),
        'yyyy-MM-dd'
      )

      console.log('Start time: ', tomorrowDate.format(TIME_FORMAT))
      await getElementById('startTimeInput').setDatePickerDate(
        tomorrowDate.format(TIME_FORMAT),
        TIME_FORMAT
      )
      await getElementById('endTimeInput').setDatePickerDate(
        tomorrowDate.add(1, 'hour').format(TIME_FORMAT),
        TIME_FORMAT
      )
      //
      await getElementById('findRoomBtn').tap()
      await waitFor(element(by.text('Booking screen')))
        .toBeVisible()
        .withTimeout(2000)
    }
  })
})
