const {addAttach} = require("jest-html-reporters");
Login = require('../pageObjects/login');  // to get variables from other file
data = require('../testData/data.json') // to get static variables


describe('Post', () => {

    const login = new Login()  //to make variable which contains all variables from file              

    beforeAll(async () => {
        await page.goto(data.url)
    })


    test.jestPlaywrightSkip({browsers:['webkit']},'Sign In' ,async () => {
        //await page.goto('https://react-redux.realworld.io/#/login')
        const title = await page.title()
        expect(title).toBe('Conduit')

        const email = await login.email()            //to get email from login variable
        await email.fill(data.email)
        await email.press('Tab')
        await login.password_fill(data.password)        //we don't need to create variable "password" because we have function password_fill in pageObjects.js file. Better to do like this

        await Promise.all([
            page.waitForNavigation(),
            await page.click('form >> "Sign in"')
        ])
    })
    // afterEach(async () => {
    //     const data = await page.screenshot()     //this is the way how to add screenshots to HTML Report
    //     await addAttach(data)
    // })


    afterAll(async () => {
        await browser.close()
    })
})
