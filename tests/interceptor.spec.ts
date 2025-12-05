import{test, expect} from '@playwright/test'
import { LoginPage } from './pageobject/LoginPage';

test ('purchase an item2', async ({ page }) => {
    
    await page.on("request", (req) =>{
        console.log(req.url());
    });
    
  /* con esto estoy diciendo que no vargue esas imagenes (la url se accede desde el inspector/Network/Image) 
   await page.route("https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b09a7d77409d63.jpg",
    (route)=>route.abort()
        );
         await page.route("https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg",
    (route)=>route.abort()
        );
        */
//lo mismo pero isando una expresion regular para varias imagenes 
   await page.route("**/*.{png,jpg,jpeg,svg}",
    (route)=>route.abort()
        );
        
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

   await page.screenshot({path:'loging1.png', fullPage:true})

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
//import { LoginPage } from "./pageobjects/LoginPage";
//import dataConfig from "./util/data.config";
test("interceptor test", async ({ page }) => {

    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `

            {
                "books": [
                    {
                        "isbn": "9781449325862",
                        "title": "El libro que jUlian nunca escribio",
                        "subTitle": "A Working Introduction",
                        "author": "Richard E. Silverman",
                        "publish_date": "2020-06-04T08:48:39.000Z",
                        "publisher": "O'Reilly Media",
                        "pages": 500,
                        "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                        "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                    }
                ]
            }
            `
            });
        }
    );


    await page.goto('https://demoqa.com/books');

    //await page.pause()
    await page.screenshot({ path: 'books.png', fullPage: true });
});
