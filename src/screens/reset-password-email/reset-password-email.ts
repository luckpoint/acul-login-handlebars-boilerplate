import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import { renderWithLayout } from '../../renderTemplate';
import compiledTemplate from './reset-password-email.hbs?compiled';

export function render(container: HTMLElement): void {
  const manager = new ResetPasswordEmail();
  const templateHtml = renderWithLayout(compiledTemplate, manager);
  container.innerHTML = templateHtml;

  const resendButton = container.querySelector("#resendEmailButton") as HTMLButtonElement;

  if (resendButton) {
    resendButton.addEventListener("click", () => {
      manager.resendEmail();
    });
  }
}
