// @ts-check
const { test, expect } = require('@playwright/test');
import { auto } from "auto-playwright"

test('Título - teste', async ({ page }) => {
  await page.goto('https://clinica-maria-luiza-copia.vercel.app/');

    // Espera que o elemento com o ID "meu-id" esteja visível.
    const elemento = page.locator('#quem-somos');
    await expect(elemento).toBeVisible();

    // Expect a title "Clinica Maria Luiza" a substring.
    await expect(page).toHaveTitle(/Clinica Maria Luiza/);
});

test('Teste de link', async ({ page }) => {
  await page.goto('https://clinica-maria-luiza-copia.vercel.app/');

  // Click the get started link.
  await page.getByRole('link', { name: 'login' }).click();

});
test('Teste de login automático', async ({ page }) => {
  // Acessa a página de login
  await page.goto('https://clinica-maria-luiza-copia.vercel.app/login');

  // Preenche o campo de usuário
  await page.fill('input[name="email"]', 'admin@gmail.com');
  
  // Preenche o campo de senha
  await page.fill('input[name="password"]', 'password');

  // Clica no botão de login
  await page.click('button[type="submit"]');
});