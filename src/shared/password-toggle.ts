// src/shared/password-toggle.ts
// Password Visibility Toggle Utility

interface PasswordToggleElements {
  button: HTMLButtonElement;
  input: HTMLInputElement;
  showIcon: SVGElement;
  hideIcon: SVGElement;
  listener: () => void;
}

const activeToggles = new Map<string, PasswordToggleElements>();

/**
 * Initialize password visibility toggle for a specific field
 * @param container - Container element to search within
 * @param fieldId - ID of the password field
 */
export function initPasswordToggle(container: HTMLElement, fieldId: string): void {
  const input = container.querySelector<HTMLInputElement>(`#${fieldId}`);
  const button = container.querySelector<HTMLButtonElement>(`[data-password-toggle="${fieldId}"]`);
  const showIcon = button?.querySelector<SVGElement>('[data-icon="show"]');
  const hideIcon = button?.querySelector<SVGElement>('[data-icon="hide"]');

  if (!input || !button || !showIcon || !hideIcon) {
    console.warn(`Password toggle elements not found for field: ${fieldId}`);
    return;
  }

  // Remove existing listener if it exists
  destroyPasswordToggle(fieldId);

  const listener = () => {
    const isPasswordType = input.type === 'password';
    input.type = isPasswordType ? 'text' : 'password';
    
    // Toggle icon visibility
    showIcon.classList.toggle('hidden', isPasswordType);
    hideIcon.classList.toggle('hidden', !isPasswordType);
    
    // Update aria-label for accessibility
    button.setAttribute('aria-label', isPasswordType ? 'Hide password' : 'Show password');
  };

  button.addEventListener('click', listener);

  // Store elements and listener for cleanup
  activeToggles.set(fieldId, {
    button,
    input,
    showIcon,
    hideIcon,
    listener
  });
}

/**
 * Initialize password visibility toggles for all password fields in container
 * @param container - Container element to search within
 */
export function initAllPasswordToggles(container: HTMLElement): void {
  const toggleButtons = container.querySelectorAll<HTMLButtonElement>('[data-password-toggle]');
  
  toggleButtons.forEach(button => {
    const fieldId = button.getAttribute('data-password-toggle');
    if (fieldId) {
      initPasswordToggle(container, fieldId);
    }
  });
}

/**
 * Remove password toggle listener for a specific field
 * @param fieldId - ID of the password field
 */
export function destroyPasswordToggle(fieldId: string): void {
  const toggle = activeToggles.get(fieldId);
  if (toggle) {
    toggle.button.removeEventListener('click', toggle.listener);
    activeToggles.delete(fieldId);
  }
}

/**
 * Remove all password toggle listeners
 */
export function destroyAllPasswordToggles(): void {
  activeToggles.forEach((_, fieldId) => {
    destroyPasswordToggle(fieldId);
  });
}
