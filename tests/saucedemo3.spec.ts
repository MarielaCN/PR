import{test, expect} from '@playwright/test'
import { LoginPage } from './pageobject/LoginPage';

test ('nombreTest1', async ({ page }) => {

    await page.goto('https://www.saucedemo.com')
    //await page.goto(process.env.URL)
    //await page.pause()
    
    //V1 Este codigo identifica el localizador y realiza la accion correspondiente
   /* await page.getByRole ('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole ('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole ('button', {name:'Login'}).click()*/

    //V2 Lo verde de arriba se traslada a otra pagina usando POM y con este codigo de abajo llamo a los metodos que permiten interactuar con la UI
  /*const pepito = new LoginPage(page)
  await pepito.fillUsername('standard_user')
  await pepito.fillPassword('secret_sauce')
  await pepito.clickOnLogin()*/

  //V3 se agrega un metodo en la otra pagina que convina las acciones anteriores, entonces desde aca solo llamo a ese metodo pasandole los parametros de usuario y password
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user','secret_sauce')

   
    const itemsContainer =  await page.locator('#inventory_container .inventory_item').all()
    const randomIndex = Math.floor(Math.random()* itemsContainer.length)
    const randomItem = itemsContainer[randomIndex]

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name ').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Price: ${expectedPrice} Name:${expectedName} Description:${expectedDescription}`)

    await randomItem.getByRole('button', {name: 'Add to cart'}).click()

    await page.locator('a.shopping_cart_link').click()

   
    expect (page.getByRole('button', {name: 'Checkout'})).toBeVisible()
    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDesc = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect (actualName).toEqual(expectedName)
    expect (actualDesc).toEqual(expectedDescription)
    expect (actualPrice).toEqual(expectedPrice)

  //  await page.pause()

  await page.locator('button#checkout').click()

  await page.getByPlaceholder('First Name').fill('Maria')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('Crespo')
  await page.locator('input#postal-code').fill('94597')

  await page.getByRole('button', {name: 'Continue'}).click()
  await page.getByRole('button', {name: 'Finish'}).click()

  await expect (page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible()





});