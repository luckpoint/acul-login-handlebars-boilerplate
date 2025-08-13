import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import { renderWithLayout } from '../../renderTemplate';
import compiledTemplate from './reset-password-request.hbs?compiled';

export function render(container: HTMLElement): void {
  const manager = new ResetPasswordRequest();
  const templateHtml = renderWithLayout(compiledTemplate, manager);
  container.innerHTML = templateHtml;

  const form = container.querySelector("#resetPasswordRequestForm") as HTMLFormElement;
  const backButton = container.querySelector("#backToLoginLink") as HTMLAnchorElement;

  if (form) {
    form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      const username = (container.querySelector("#email") as HTMLInputElement)?.value;
      manager.resetPassword({ username });
    });
  }

  if (backButton) {
    backButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      // manager.backToLogin(); // Method might not exist in this version
      console.log("Back to login clicked");
    });
  }
}
