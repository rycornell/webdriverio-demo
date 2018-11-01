import then from '../browser-helpers';

class RegistrationPage {
    
    public readonly url = 'signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com&flowName=GlifWebSignIn&flowEntry=SignUp';
    public readonly urlMatchingPattern = /signup/i;
    public get usernameInput() { return () => browser.element('#username'); }
    public get passwordInput() { return () => browser.element('input[name=Passwd]'); }

    public go = () => {
        return then.go(this.url);
    }

    public enterUsername = (username: string) => {
        then.setValue(this.usernameInput, username);
    }

    public enterPassword = (password: string) => {
        then.setValue(this.passwordInput, password);
    }
}

export default new RegistrationPage();
