# Auth0 ACUL Login Boilerplate

A minimal, clean boilerplate for building custom Auth0 Universal Login (ACUL) experiences.

## Features

- **Simple**: Focused on core login and signup flows only
- **Precompiled Templates**: Uses vite-plugin-handlebars-precompile for optimized template compilation
- **Modular Architecture**: Each screen is self-contained with its own TypeScript and Handlebars files

## Tech Stack

- **Core**: TypeScript, `@auth0/auth0-acul-js` (v0.1.0-beta.8)
- **Build Tool**: Vite 6.3.5
- **Templating**: Handlebars.js with precompilation support
- **Styling**: Tailwind CSS 4.1.10 with forms plugin
- **Package Manager**: npm

## Available Screens

This boilerplate includes these core authentication screens:

- **login-id**: Email/username input for login with social login options and passkey login support
- **login-password**: Password input for login
- **signup-id**: Email/username input for registration  
- **signup-password**: Password creation for registration

## Quick Start

### Prerequisites

- Node.js (v20 or later)
- npm package manager

### Serve files

1. **Clone this repository:**
   ```bash
   git clone https://github.com/luckpoint/acul-login-handlebars-boilerplate.git
   cd acul-login-handlebars-boilerplate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Development workflow:**
   ```bash
   # Start development with watch mode
   npm run dev
   ```

4. **Serve the built files:**
   ```bash
   # Make the server script executable
   chmod +x run-server.sh
   
   # Run the local server (serves dist/ on port 8080)
   ./run-server.sh
   ```

### Testing

1. **Configure Auth0**:
   - Go to Auth0 Dashboard → Branding → Universal Login → Customize Screens
   - Select login-id
   - Select "Advanced mode"
   - Select "Head Tags" and add the following snippet
   ```json
    {
        "tag": "script",
        "attributes": {
          "src": "http://127.0.0.1:8080/index.js",
          "defer": true
        }
    }
   ```

   - Select "Additional Data" and check "Texts" and "Submitted form data"

   Then apply the same settings to login-password, signup-id and signup-password

2. **Configure Authentication Profile "Identifier First"**

   - Go to Auth0 Dashboard → Authentication Profile
   - Select "Identifier First"
   - Save

3. **Test**: Trigger a login flow from your application

## 📝 Development Tips

### 📂 Project Structure

```text
├── LICENSE
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── run-server.sh          # Local development server script
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.js         # Vite build configuration
├── docs/
│   └── customization-guide.md # Customization documentation
└── src/
    ├── main.ts                 # Main application entry point
    ├── style.css               # Global styles with Tailwind CSS
    ├── layout.hbs              # Main page layout wrapper
    ├── header.hbs              # Header component  
    ├── footer.hbs              # Footer component
    ├── renderTemplate.ts       # Template rendering utility
    ├── vite-env.d.ts           # Vite environment type definitions
    ├── screens/                # Individual auth screens
    │   ├── login-id/           # Email/username input for login
    │   │   ├── login-id.hbs    # Template
    │   │   └── login-id.ts     # Logic & event handling
    │   ├── login-password/     # Password input for login
    │   │   ├── login-password.hbs
    │   │   └── login-password.ts
    │   ├── signup-id/          # Email/username input for signup
    │   │   ├── signup-id.hbs
    │   │   └── signup-id.ts
    │   └── signup-password/    # Password creation for signup
    │       ├── signup-password.hbs
    │       └── signup-password.ts
    └── shared/                 # Reusable components
        ├── error-messages.hbs  # Error display component
        ├── identifier-field.hbs # Email/username input field
        ├── input-field.hbs     # General input field component
        ├── password-field.hbs  # Password input field
        ├── password-toggle.ts  # Password visibility toggle logic
        └── social-login-buttons.hbs # Social login buttons component
```

### Project Architecture

- **Screen-based routing**: The main.ts file automatically renders the appropriate screen based on Auth0's `getCurrentScreen()` function
- **Precompiled templates**: Templates are compiled at build time using `vite-plugin-handlebars-precompile`
- **Event management**: Each screen handles its own event listeners with proper cleanup
- **Shared components**: Common UI elements are abstracted into the `shared/` directory

### TypeScript Integration

All files are fully typed with:
- **Auth0 ACUL types**: The `@auth0/auth0-acul-js` package provides comprehensive TypeScript definitions
- **Handlebars precompilation**: Templates are imported with `?compiled` suffix for type safety
- **Strict configuration**: TypeScript is configured for strict type checking

### Development Workflow

```bash
# Watch mode for continuous development
npm run dev

# Type checking without build
npm run type-check

# Production build
npm run build
```

## 📄 License

MIT License
