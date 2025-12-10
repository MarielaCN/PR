import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobject/LoginPage';

test('purchaseOne', async({page}) =>{
await page.goto('https://www.saucedemo.com/inventory.html');
const itemsContainer = await page.locator("#inventory_container .inventory_item").all();

for(let container of itemsContainer){
    console.log(await container.allTextContents());
}

});

