import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import { renderWithLayout } from '../../renderTemplate';
import { initAllPasswordToggles, destroyAllPasswordToggles } from '../../shared/password-toggle';
import compiledTemplate from './reset-password.hbs?compiled';

export function render(container: HTMLElement): void {
  destroyAllPasswordToggles();
  const manager = new ResetPassword();
  const templateHtml = renderWithLayout(compiledTemplate, manager);
  container.innerHTML = templateHtml;

  initAllPasswordToggles(container);

  const form = container.querySelector("#resetPasswordForm") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      const password = (container.querySelector("#password") as HTMLInputElement)?.value;
      const reEnterPassword = (container.querySelector("#re-enter-password") as HTMLInputElement)?.value;

      manager.resetPassword({
        'password-reset': password,
        're-enter-password': reEnterPassword,
      });
    });
  }
}
