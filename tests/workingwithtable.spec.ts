import {test, expect} from '@playwright/test';

test('test webtable', async({page})=> {
await page.goto('https://cosmocode.io/automation-practice-webtable/')

const tableContainer = await page.locator("xpath=//table[@id='countries']") //inicio en el contenedor table
const rows = await tableContainer.locator("xpath=.//tr").all() // recupero todos los componentes que empiezan con tr , o sea todas las filas y las almaceno en la variable rows
console.log(rows.length) // imprime el total de filas 


const countries: Country[] = []


/* ejemplo1
for(let row of rows){ // por cada fila dentro de la variable rows, imprimir el contenido
    console.log(await row.innerText())
}*/

/*ejemplo2
const row1 = rows.at(1) // aca estoy accediendo al contenido de la fila una, cada columna por separado 
const countryName = await row1?.locator('xpath=.//td[2]').innerText()
const countryCapital = await row1?.locator('xpath=.//td[3]').innerText()
const countryCurrency = await row1?.locator('xpath=.//td[4]').innerText()
const countryLanguages = await row1?.locator('xpath=.//td[5]').innerText()

console.log(countryName, countryCapital, countryCurrency, countryLanguages)*/

//ejemplo3

 for(let row of rows){ 
    let country: Country={
        name: await row.locator('xpath=.//td[2]').innerText(),
        capital: await row.locator('xpath=.//td[3]').innerText(),
        currency: await row.locator('xpath=.//td[4]').innerText(),
        primaryLanguage: await row.locator('xpath=.//td[5]').innerText(),
    }
    countries.push(country)
}

/* for(let country of countries){
    console.log(country) 
}
*/
const countryWherePortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese')
console.log('Countries where people speak Portuguese',countryWherePortuguese)


interface Country{
    name: string
    capital: string
    currency: string
    primaryLanguage:string
}

})

/* element container: //table[@id="countries"]
tr filas
td columnas 

//table[@id="countries"]//tr[2]//td[1] es Check
//table[@id="countries"]//tr[2]//td[2] es Country
//table[@id="countries"]//tr[2]//td[3] es Capital
//table[@id="countries"]//tr[2]//td[4] es Currency
//table[@id="countries"]//tr[2]//td[5] es Pimary Language

*/