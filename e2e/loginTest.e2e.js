describe('Login flow', () => {
  it('should login successfully', async () => {
    await element(by.id('email')).typeText('a@a.com')
    await element(by.id('password')).typeText('123')
    await element(by.id('loginButton')).tap()
    await expect(element(by.text('Make My Booking'))).toBeVisible()
  })
})
