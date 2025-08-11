// main.ts
import { getCurrentScreen } from "@auth0/auth0-acul-js";
import './style.css';

// --- Import each screen module ---
import * as loginIdScreen from './screens/login-id/login-id';
import * as loginPasswordScreen from './screens/login-password/login-password';
import * as signupIdScreen from './screens/signup-id/signup-id';
import * as signupPasswordScreen from './screens/signup-password/signup-password';

// --- Mapping of screen names to modules ---
const screenModules = {
  'login-id': loginIdScreen,
  'login-password': loginPasswordScreen,
  'signup-id': signupIdScreen,
  'signup-password': signupPasswordScreen,
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
  if (module) {
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
