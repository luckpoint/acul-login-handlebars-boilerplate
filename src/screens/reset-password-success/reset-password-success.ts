import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import { renderWithLayout } from '../../renderTemplate';
import compiledTemplate from './reset-password-success.hbs?compiled';

export function render(container: HTMLElement): void {
  const manager = new ResetPasswordSuccess();
  const templateHtml = renderWithLayout(compiledTemplate, manager);
  container.innerHTML = templateHtml;
}
