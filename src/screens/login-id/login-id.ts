// src/screens/login-id/login-id.ts

import LoginId from '@auth0/auth0-acul-js/login-id';
import { renderWithLayout } from '../../renderTemplate';
import compiledTemplate from './login-id.hbs?compiled';

let form: HTMLFormElement | null = null;
let submitListener: ((e: SubmitEvent) => void) | null = null;
let passkeyButton: HTMLButtonElement | null = null;
let passkeyClickListener: ((e: Event) => void) | null = null;
let socialButtons: NodeListOf<HTMLButtonElement> | null = null;
let socialListeners: Map<HTMLButtonElement, (e: MouseEvent) => void> = new Map();

export function render(container: HTMLElement): void {
  const manager = new LoginId();
  const { screen, transaction } = manager;

  // Get required/optional identifiers and social connections
  const socialConnections = transaction.alternateConnections;

  // Get email value from submitted_form_data (direct access from manager object)
  const submittedEmail = manager.untrustedData.submittedFormData?.email || manager.untrustedData.submittedFormData?.username;
  const signupEnabled = manager.transaction.isSignupEnabled;
  const forgotPasswordEnabled = manager.transaction.isForgotPasswordEnabled;
  const loginHintEmail = manager.untrustedData.authorizationParams?.login_hint
  const isPasskeyEnabled = manager.transaction.isPasskeyEnabled;

  const templateData = {
    screen: screen,
    transaction: transaction,
    socialConnections,
    hasSocialConnections: socialConnections && socialConnections.length > 0,
    signupEnabled,
    forgotPasswordEnabled,
    isPasskeyEnabled
  };

  const templateHtml = renderWithLayout(compiledTemplate, templateData);
  container.innerHTML = templateHtml;

  // Set email field if email exists in submitted_form_data
  if (submittedEmail) {
    const emailInput = container.querySelector("#loginEmail") as HTMLInputElement;
    if (emailInput) {
      emailInput.value = submittedEmail as string;
    }
  }

  if (loginHintEmail) {
    const emailInput = container.querySelector("#loginEmail") as HTMLInputElement;
    if (emailInput) {
      emailInput.value = loginHintEmail
    }
  }

  form = container.querySelector("#loginForm");
  if (form) {
    submitListener = (e: SubmitEvent) => {
      e.preventDefault();
      const email = (container.querySelector("#loginEmail") as HTMLInputElement)?.value;
      try {
        manager.login({ username: email });
      } catch (error) {
        console.error('Login failed:', error);
        // Re-render to show updated errors
        render(container);
      }
    };
    form.addEventListener("submit", submitListener);
  }

  // Handle federated login buttons
  // Note: federatedLogin method (formerly socialLogin) is not available in current version
  socialButtons = container.querySelectorAll(".social-login-btn");
  socialButtons.forEach(button => {
    const connectionName = button.getAttribute('data-connection');
    if (connectionName) {
      const listener = (e: MouseEvent) => {
        e.preventDefault();
        console.warn('Federated login not supported in current Auth0 ACUL version');
        manager.federatedLogin({ connection: connectionName });
      };
      button.addEventListener('click', listener);
      socialListeners.set(button, listener);
    }
  });

  // Setup for the Passkey button
  passkeyButton = container.querySelector("#btnPasskey");
  const passkeyContainer = container.querySelector("#passkeyContainer") as HTMLElement;

  // Check if Passkey is available (displayed if WebAuthn API is available AND passkey is enabled)
  if (window.PublicKeyCredential && passkeyContainer && isPasskeyEnabled) {
    passkeyContainer.style.display = "flex";

    if (passkeyButton) {
      passkeyClickListener = (e: Event) => {
        e.preventDefault();
        manager.passkeyLogin();
      };
      passkeyButton.addEventListener("click", passkeyClickListener);
    }
  } else if (passkeyContainer) {
    // Hide the passkey container if passkey is not enabled
    passkeyContainer.style.display = "none";
  }

  console.log("LoginId screen rendered");
}
