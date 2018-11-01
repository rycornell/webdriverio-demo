import login from '../pages/login';
import registration from '../pages/registration';

describe('Login', () => {

  beforeAll(() => {
    login.go();
  });

  it('should be able to navigate to account creation page', () => {            
    login.createAccount();
    expect(browser.getUrl()).toMatch(registration.urlMatchingPattern);
  });
});
