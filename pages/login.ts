import then from '../browser-helpers';

class LoginPage {    
    
    public get createAccountButton() { return () => browser.element('span*=Create account'); }

    public go = () => {
        const url = browser.options.baseUrl;
        return then.go(url);
    }

    public createAccount = () => {
        then.click(this.createAccountButton);
    }
}

export default new LoginPage();
