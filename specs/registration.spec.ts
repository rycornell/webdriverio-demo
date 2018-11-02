import config from '../browser-helpers';
import registration from '../pages/registration';

describe('Registration', () => {

  let user = config.testData.user;

  beforeAll(() => {
    registration.go();
  });

  it('should be able to enter username', () => {
    registration.enterUsername(user.username);
  });

  it('should be able to enter password', () => {
    registration.enterPassword(user.password);
  });
});
