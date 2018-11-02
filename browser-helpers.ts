import { Client, RawResult, Element } from 'webdriverio';

class BrowserHelpers {

    public log = () => {
        console.log(`${new Date().toISOString()} *** CURRENT URL : ${browser.getUrl()} ***`);
    }

    public get testData() { return browser.options['testData']; }

    public go = (url: string) => {
        console.log(`*** NAVIGATING TO : ${url} ***`);
        browser.url(url);
    }

    public click = (element: () => Client<RawResult<Element>> & RawResult<Element>) => {
        this.log();
        element().waitForExist();
        element().waitForEnabled();
        if (!element().isVisibleWithinViewport()) {
            element().scroll();
            browser.pause(500);
        }
        element().click();
    }

    public getText = (element: () => Client<RawResult<Element>> & RawResult<Element>) => {
        this.log();
        element().waitForVisible();
        element().waitForText();
        return element().getText();
    }

    public setValue = (element: () => Client<RawResult<Element>> & RawResult<Element>, value: string, postDelayMs?: number) => {
        this.log();
        element().waitForVisible();
        element().waitForEnabled();
        element().setValue(value);
        if (postDelayMs) {
            browser.pause(postDelayMs);
        }
    }

    public selectByText = (element: () => Client<RawResult<Element>> & RawResult<Element>, value: string) => {
        this.log();
        element().waitForVisible();
        element().waitForEnabled();
        element().selectByVisibleText(value);
    }

    public waitForVisible = (element: () => Client<RawResult<Element>> & RawResult<Element>) => {
        this.log();
        element().waitForVisible();
    }

    public waitForInvisible = (element: () => Client<RawResult<Element>> & RawResult<Element>) => {
        this.log();
        this.waitUntil(() => {
            if (element().isVisible() === true) {
                element().waitForVisible(browser.options.waitforTimeout, true);
                return false;
            }
            return true;
        });
    }

    public waitForMatchingText = (element: () => Client<RawResult<Element>> & RawResult<Element>, text: string) => {
        this.log();
        this.waitUntil(() => {
            return this.getText(element).indexOf(text) > -1;
        });
    }

    public waitForUrlPattern = (urlPattern: RegExp) => {
        this.log();
        this.waitUntil(() => {
            const currentUrl = browser.getUrl();
            this.log();
            return urlPattern.test(currentUrl);
        });
    }

    public refreshUntil = (condition: () => boolean, maxRefreshes: number = 10) => {
        this.log();
        let count = 0;
        while (count < maxRefreshes) {
            count++;
            try {
                if (condition()) {
                    return true;
                } else {
                    browser.refresh();
                }
            } catch (err) {
                browser.refresh();
            }
        }
    }

    public refreshUntilOrFail = (condition: () => boolean, failureCondition: () => boolean, maxRefreshes: number = 10) => {
        this.log();
        let count = 0;
        while (count < maxRefreshes) {
            count++;
            try {
                if (condition()) {
                    return true;
                } else if (failureCondition()) {
                    return false;
                } else {
                    browser.refresh();
                }
            } catch (err) {
                browser.refresh();
            }
        }
    }

    public waitUntil = (condition: () => boolean) => {
        this.log();
        browser.waitUntil(() => {
            try {
                return condition();
            } catch (err) {
                return false;
            }
        });
    }

    public withFrame = (id: string) => {
        this.log();
        return browser.frame(id);
    }
}

export default new BrowserHelpers();
