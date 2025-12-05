import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test ('Test1', async({page}) =>{
await page.goto('https://www.mercadolibre.com.co/')
await page.locator('input[id=\'cb1-edit\']').fill('Iphone')
await page.keyboard.press('Enter')
//await expect (page.locator('//ol[contains(@class,\'ui-search-layout ui-search-layout--stack\')]')).toBeVisible()
await expect (page.locator('//ol[contains(@class,\'ui-search-layout ui-search-layout--grid\')]')).toBeVisible()
//await page.pause()
const titles = await page.locator('//ol[contains(@class, \'ui-search-layout ui-search-layout--stack\')]//li//h3').allInnerTexts()
console.log('The total number of result is:', titles.length)
for (let title of titles){
  console.log('The title is:', title)
}
//Formas de hacer screnshot durante los test
//-----Ej1 Creo un directorio llamado Sceenshots y le paso esa ubicacion y nombre de la imagen:
// await page.screenshot({path:'Screenshots/Mercado.png'})
//---- Ej2 Lo mismo pero que muestre la panatalla completa
// await page.screenshot({path:'Screenshots/MercadoFull.png', fullPage:true})
//----Ej3 Este caso es cuando quiero que la imagen se incluya en el reporte directamente. Desde arriba en la definicion del test agregar testInfo asi: test ('Test1', async({page}, testInfo) =>{  y despues agregar abajo esto:
    //await testInfo.attach('nombre',{
    //body: await page.screenshot(),
    //contentType: 'image/png'})
    //Para verla entro a playwright-report y abro index desde a carpeta / se abre en ele navegador y se ve la imagen
// Ej4 agregar en el archivo config, en uses la variable screenshot: 'on', o cualquiera de las otras opciones que aparece ahi


//Para ejecutar los tests desde consola o cuando estemos en un ambiente de integracion continua 
// npx playwright test ---  Ejecuta todos los test dentro de esa carpeta 
//npx playwright test example.spec.ts -g "get started link" --- Ubica carpeta, archivo y test especifico
//npx playwright test example.spec.ts -g "get started link" --repeat-each 5        ----- lo mismo pero con 5 repeticiones 
//npx playwright test example.spec.ts -g "get started link" --debug    (me saca una pantalla al lado de la ejecucion y puedo ir traceando paso a paso)
//Otra manera de debuguear es desde el propio Test, en la flecha de ejecutar, dar click derecho y seleccionar Debug Test, ademas puedes ponerles puntos de ruptura para avanzar a metodos especificos o entrar en detalle en estos m'etodos (te sale tambien una barrita flotante con las opciones) 
});

//https://platform.utest.com/