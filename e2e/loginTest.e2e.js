describe('Login', () => {
  beforeEach(async () => {
    await device.launchApp()
  })

  it('should login successfully', async () => {
    await element(by.id('email')).typeText('a@a.com')
    await element(by.id('password')).typeText('123')
    await element(by.id('loginButton')).tap()
    await expect(element(by.text('Home Screen'))).toBeVisible()
  })
})
