import {test as setup, expect} from "@playwright/test"
import {LoginPage} from "./pageobject/LoginPage";


/*const authFile = "playwright/.auth/user.json";

setup("authenticate", async({page}) =>{
    await page.goto('https://www.saucedemo.com')
    const login = new LoginPage(page)
    await login.loginWithCredentials("standard_user", "secret_sauce")
    await login.checkSuccessfulLogin()

    await page.context().storageState({path: authFile})

}); */

setup('login and save state', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.context().storageState({
    path: 'playwright/.auth/user.json'
  });
});