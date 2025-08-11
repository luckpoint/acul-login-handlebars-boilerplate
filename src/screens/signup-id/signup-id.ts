// src/screens/signup-id/signup-id.ts

import SignupId, { SignupOptions } from '@auth0/auth0-acul-js/signup-id';
import { renderWithLayout } from '../../renderTemplate';
import compiledTemplate from './signup-id.hbs?compiled';

let form: HTMLFormElement | null = null;
let submitListener: ((e: SubmitEvent) => void) | null = null;
let socialButtons: NodeListOf<HTMLButtonElement> | null = null;
let socialListeners: Map<HTMLButtonElement, (e: MouseEvent) => void> = new Map();

export function render(container: HTMLElement): void {
  const manager = new SignupId();
  const { transaction } = manager;

  // Get required/optional identifiers and social connections
  const mandatoryIdentifiers = transaction.requiredIdentifiers || [];
  const optionalIdentifiers = transaction.optionalIdentifiers;
  const socialConnections = transaction.alternateConnections;
  //  const isPasskeyEnabled = transaction.isPasskeyEnabled;

  // Get email value from submitted_form_data (direct access from manager object)
  const submittedEmail = manager.untrustedData.submittedFormData?.email;
  const loginHintEmail = manager.untrustedData.authorizationParams?.login_hint;

  // Combine all identifier types
  const allIdentifierTypes = [
    ...(mandatoryIdentifiers || []),
    ...(optionalIdentifiers || [])
  ];

  // Prepare field information according to identifier types
  const identifierFields = allIdentifierTypes.map(type => {
    switch(type) {
      case 'email':
        return {
          type: 'email',
          id: 'email',
          name: 'email',
          label: 'Email Address',
          inputType: 'email',
          autocomplete: 'email',
          placeholder: manager.screen?.texts?.emailPlaceholder || 'Enter your email'
        };
      case 'phone':
        return {
          type: 'phone',
          id: 'phoneNumber',
          name: 'phoneNumber',
          label: 'Phone Number',
          inputType: 'tel',
          autocomplete: 'tel',
          placeholder: manager.screen?.texts?.phonePlaceholder || 'Enter your phone number'
        };
      case 'username':
        return {
          type: 'username',
          id: 'username',
          name: 'username',
          label: 'Username',
          inputType: 'text',
          autocomplete: 'username',
          placeholder: manager.screen?.texts?.usernamePlaceholder || 'Enter your username'
        };
      default:
        return null;
    }
  }).filter((field): field is NonNullable<typeof field> => field !== null);

  // Display email field by default (when no identifiers are specified)
  if (identifierFields.length === 0) {
    identifierFields.push({
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email Address',
      inputType: 'email',
      autocomplete: 'email',
      placeholder: manager.screen?.texts?.emailPlaceholder || 'Enter your email'
    });
  }

  // Prepare data to pass to template
  const templateData = {
    ...manager,
    mandatoryIdentifiers,
    optionalIdentifiers,
    socialConnections,
    hasSocialConnections: socialConnections && socialConnections.length > 0,
    identifierFields
  };

  const templateHtml = renderWithLayout(compiledTemplate, templateData);
  container.innerHTML = templateHtml;

  // Set email field if email exists in submitted_form_data
  const emailValue = loginHintEmail || submittedEmail;
  if (emailValue) {
    const emailField = identifierFields.find(field => field.type === 'email');
    if (emailField) {
      const emailInput = container.querySelector(`#${emailField.id}`) as HTMLInputElement;
      if (emailInput) {
        emailInput.value = emailValue as string;
      }
    }
  }

  // Form submission handling
  form = container.querySelector("#signupForm");
  if (form) {
    submitListener = (e: SubmitEvent) => {
      e.preventDefault();
      const signupParams: SignupOptions = {};

      // Collect values from required/optional identifiers
      identifierFields.forEach(field => {
        const input = container.querySelector(`#${field.id}`) as HTMLInputElement;
        if (input?.value) {
          if (field.type === 'email') {
            signupParams.email = input.value;
          } else if (field.type === 'phone') {
            signupParams.phone = input.value;
          } else if (field.type === 'username') {
            signupParams.username = input.value;
          }
        }
      });

      try {
        manager.signup(signupParams);
      } catch (error) {
        console.error('Signup failed:', error);
        // Re-render to show updated errors
        render(container);
      }
    };
    form.addEventListener("submit", submitListener);
  }

  // Handle federated signup buttons
  socialButtons = container.querySelectorAll(".social-signup-btn");
  socialButtons.forEach(button => {
    const connectionName = button.getAttribute('data-connection');
    if (connectionName) {
      const listener = (e: MouseEvent) => {
        e.preventDefault();
        manager.federatedSignup({ connection: connectionName });
      };
      button.addEventListener('click', listener);
      socialListeners.set(button, listener);
    }
  });
}
