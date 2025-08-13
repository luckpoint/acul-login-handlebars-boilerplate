// main.ts
import { getCurrentScreen } from "@auth0/auth0-acul-js";
import './style.css';

// --- Import each screen module ---
import * as loginIdScreen from './screens/login-id/login-id';
import * as loginPasswordScreen from './screens/login-password/login-password';
import * as signupIdScreen from './screens/signup-id/signup-id';
import * as signupPasswordScreen from './screens/signup-password/signup-password';
// --- Add imports for reset password screens ---
import * as resetPasswordRequestScreen from './screens/reset-password-request';
import * as resetPasswordEmailScreen from './screens/reset-password-email';
import * as resetPasswordScreen from './screens/reset-password';
import * as resetPasswordSuccessScreen from './screens/reset-password-success';

// --- Mapping of screen names to modules ---
const screenModules = {
  'login-id': loginIdScreen,
  'login-password': loginPasswordScreen,
  'signup-id': signupIdScreen,
  'signup-password': signupPasswordScreen,
  // --- Add mappings for reset password screens ---
  'reset-password-request': resetPasswordRequestScreen,
  'reset-password-email': resetPasswordEmailScreen,
  'reset-password': resetPasswordScreen,
  'reset-password-success': resetPasswordSuccessScreen,
};

function rerenderAuthScreen() {
  console.log("Rerendering auth screen...");

  // Get the rendering container
  let appContainer = document.getElementById("app-container");
  if (!appContainer) {
    console.warn("#app-container not found, using document.body instead");
    appContainer = document.body;
  }

  // Select the appropriate module based on the current screen name
  const currentScreenName = getCurrentScreen();
  console.log("Current screen:", currentScreenName);

  const module = screenModules[currentScreenName as keyof typeof screenModules];

  // Execute the module's render function
  if (module && typeof module.render === 'function') {
    module.render(appContainer);
  } else {
    // Fallback handling for unsupported screens
    console.log(`Rendering fallback for unhandled screen: ${currentScreenName}`);
    appContainer.innerHTML = `<p>Display logic for "${currentScreenName}" is not implemented.</p>`;
  }
  console.log("Screen rendered successfully");
}

// Execute initial rendering
rerenderAuthScreen();

// Assign to window object to be called by ACUL SDK for screen transitions
(window as any).rerenderAuthApp = rerenderAuthScreen;
