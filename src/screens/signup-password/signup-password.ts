import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { renderWithLayout } from '../../renderTemplate';
import compiledTemplate from './signup-password.hbs?compiled';

// State management
let signupPasswordManager: SignupPassword | null = null;
let form: HTMLFormElement | null = null;
let backButton: HTMLButtonElement | null = null;
let passwordToggle: HTMLButtonElement | null = null;
let passwordInput: HTMLInputElement | null = null;
let confirmPasswordToggle: HTMLButtonElement | null = null;
let confirmPasswordInput: HTMLInputElement | null = null;

// Event listeners
let formSubmitListener: ((e: SubmitEvent) => void) | null = null;
let backButtonListener: (() => void) | null = null;
let passwordToggleListener: (() => void) | null = null;
let confirmPasswordToggleListener: (() => void) | null = null;

export function render(container: HTMLElement): void {
  try {
    // Initialize the SignupPassword manager
    signupPasswordManager = new SignupPassword();
    const { transaction, screen } = signupPasswordManager;

    // Get required and optional identifiers
    const mandatoryIdentifiers = transaction.requiredIdentifiers;
    const optionalIdentifiers = transaction.optionalIdentifiers;
    
    // Get signup data from previous screen
    const previousScreenData = screen.data;

    // Prepare template data
    const templateData = {
      screen: screen,
      transaction: transaction,
      previousData: previousScreenData,
      mandatoryIdentifiers,
      optionalIdentifiers,
      // Check if we have specific identifiers
      hasEmail: previousScreenData?.email || mandatoryIdentifiers?.includes('email'),
      hasPhone: previousScreenData?.phone || mandatoryIdentifiers?.includes('phone'),
      hasUsername: previousScreenData?.username || mandatoryIdentifiers?.includes('username'),
      emailValue: previousScreenData?.email || '',
      phoneValue: previousScreenData?.phone || '',
      usernameValue: previousScreenData?.username || ''
    };

    // Render the template
    const templateHtml = renderWithLayout(compiledTemplate, templateData);
    container.innerHTML = templateHtml;

    // Setup form submission
    form = container.querySelector('#signup-password-form');
    if (form) {
      formSubmitListener = async (e: SubmitEvent) => {
        e.preventDefault();
        
        const formData = new FormData(form!);
        const password = formData.get('password') as string;

        if (!password) {
          console.error('Password is required');
          return;
        }

        try {
          // Prepare signup parameters with data from previous screen
          const signupParams: any = {
            password: password
          };

          // Add identifiers from previous screen
          if (previousScreenData?.email) {
            signupParams.email = previousScreenData.email;
          }
          if (previousScreenData?.phone) {
            signupParams.phone = previousScreenData.phone;
          }
          if (previousScreenData?.username) {
            signupParams.username = previousScreenData.username;
          }

          await signupPasswordManager!.signup(signupParams);
        } catch (error) {
          console.error('Signup failed:', error);
          // Re-render the screen to show updated errors
          render(container);
        }
      };
      form.addEventListener('submit', formSubmitListener);
    }

    // Setup back button
    backButton = container.querySelector('#back-button');
    if (backButton) {
      backButtonListener = () => {
        try {
          // Navigate back to previous screen
          window.history.back();
        } catch (error) {
          console.error('Failed to go back:', error);
        }
      };
      backButton.addEventListener('click', backButtonListener);
    }

    // Setup password visibility toggle
    passwordInput = container.querySelector('#password');
    passwordToggle = container.querySelector('#password-toggle');
    const iconShow = container.querySelector<SVGElement>('#icon-show');
    const iconHide = container.querySelector<SVGElement>('#icon-hide');

    if (passwordInput && passwordToggle && iconShow && iconHide) {
      passwordToggleListener = () => {
        const isPassword = passwordInput!.type === 'password';
        passwordInput!.type = isPassword ? 'text' : 'password';
        
        // Toggle visibility of the SVG icons
        iconShow.classList.toggle('hidden', isPassword);
        iconHide.classList.toggle('hidden', !isPassword);
      };
      passwordToggle.addEventListener('click', passwordToggleListener);
    }

    // Setup confirm password visibility toggle
    confirmPasswordInput = container.querySelector('#confirmPassword');
    confirmPasswordToggle = container.querySelector('#confirm-password-toggle');
    const confirmIconShow = container.querySelector<SVGElement>('#confirm-icon-show');
    const confirmIconHide = container.querySelector<SVGElement>('#confirm-icon-hide');

    if (confirmPasswordInput && confirmPasswordToggle && confirmIconShow && confirmIconHide) {
      confirmPasswordToggleListener = () => {
        const isPassword = confirmPasswordInput!.type === 'password';
        confirmPasswordInput!.type = isPassword ? 'text' : 'password';
        
        // Toggle visibility of the SVG icons
        confirmIconShow.classList.toggle('hidden', isPassword);
        confirmIconHide.classList.toggle('hidden', !isPassword);
      };
      confirmPasswordToggle.addEventListener('click', confirmPasswordToggleListener);
    }

  } catch (error) {
    console.error('Error rendering signup-password screen:', error);
    container.innerHTML = '<div class="text-red-600">Error loading signup password screen</div>';
  }
}
