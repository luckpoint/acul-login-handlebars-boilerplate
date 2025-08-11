// src/screens/login-password/login-password.ts

import LoginPassword from '@auth0/auth0-acul-js/login-password';
import { renderWithLayout } from '../../renderTemplate';
import { initAllPasswordToggles, destroyAllPasswordToggles } from '../../shared/password-toggle';
import compiledTemplate from './login-password.hbs?compiled';

let form: HTMLFormElement | null = null;
let submitListener: ((e: SubmitEvent) => void) | null = null;

export function render(container: HTMLElement): void {
  // Clean up previous password toggles
  destroyAllPasswordToggles();
  
  const manager = new LoginPassword();
  const { screen, transaction } = manager;
  
  const templateData = {
    screen: screen,
    transaction: transaction
  };
  
  const templateHtml = renderWithLayout(compiledTemplate, templateData);
  container.innerHTML = templateHtml;

  // Initialize password visibility toggles
  initAllPasswordToggles(container);

  form = container.querySelector("#loginForm");
  if (form) {
    submitListener = (e: SubmitEvent) => {
      e.preventDefault();
      const password = (container.querySelector("#loginPassword") as HTMLInputElement)?.value;
      const username = screen.data?.username || "";
      try {
        manager.login({ username, password });
      } catch (error) {
        console.error('Login failed:', error);
        // Re-render to show updated errors
        render(container);
      }
    };
    form.addEventListener("submit", submitListener);
  }
}
