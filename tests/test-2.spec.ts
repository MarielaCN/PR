import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mercadolibre.com/');
  await page.getByRole('link', { name: 'Colombia' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('Iphone');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).press('Enter');
  await page.getByRole('link', { name: 'Apple iPhone 16 (128 GB) - Negro - Distribuidor Autorizado' }).click();
  await page.getByRole('heading', { name: 'Apple iPhone 16 (128 GB) -' }).click();
  
})
