# 🔧 Customization Guide

## Adding a New Screen

1. **Create screen directory:**
   ```
   src/screens/my-new-screen/
   ├── my-new-screen.hbs
   └── my-new-screen.ts
   ```

2. **Create the Handlebars template** (`my-new-screen.hbs`):
   ```handlebars
   {{! Content container }}
   <div class="max-w-2xl mx-auto">
     <div class="bg-white rounded-xl shadow-lg border border-gray-100">
       <header class="p-8 pb-4">
         <h1 class="text-2xl font-bold text-center text-gray-900">
           {{screen.texts.title}}
         </h1>
       </header>
       
       {{> shared/error-messages}}
       
       <form id="myForm" class="p-8">
         <!-- Your form elements here -->
       </form>
     </div>
   </div>
   ```

3. **Create the TypeScript module** (`my-new-screen.ts`):
   ```typescript
   import MyNewScreen from '@auth0/auth0-acul-js/my-new-screen';
   import { renderWithLayout } from '../../renderTemplate';
   import compiledTemplate from './my-new-screen.hbs?compiled';

   export function render(container: HTMLElement): void {
     const manager = new MyNewScreen();
     const { screen, transaction } = manager;

     const templateData = {
       screen: screen,
       transaction: transaction,
     };

     const templateHtml = renderWithLayout(compiledTemplate, templateData);
     container.innerHTML = templateHtml;

     // Add event listeners
     setupEventListeners();
   }

   function setupEventListeners() {
     // Your event handling logic
   }
   ```

4. **Register in main.ts:**
   ```typescript
   import * as myNewScreen from './screens/my-new-screen/my-new-screen';

   const screenModules = {
     // ...existing screens
     'my-new-screen': myNewScreen,
   };
   ```

## Using Shared Components

The project includes reusable components in the `shared/` directory:

```handlebars
{{! Use error messages component }}
{{> shared/error-messages}}

{{! Use identifier field component }}
{{> shared/identifier-field}}

{{! Use password field component }}
{{> shared/password-field}}

{{! Use input field component }}
{{> shared/input-field 
  id="fieldId"
  name="fieldName"
  type="email"
  label="Field Label"
  placeholder="Enter value..."
  required=true
}}
```

### Input Field Component

The `input-field` component provides a standardized input field with label:

**Required Properties:**
- `id`: Unique identifier for the input field
- `name`: Form field name
- `type`: Input type (email, text, tel, etc.)
- `label`: Label text to display

**Optional Properties:**
- `placeholder`: Placeholder text
- `autocomplete`: Autocomplete attribute value
- `required`: Whether the field is required (defaults to false)
- `autofocus`: Whether to autofocus this field (defaults to false)
- `value`: Initial value for the field
- `cssClass`: Additional CSS classes for the input (defaults to standard styling)

## Styling with Tailwind CSS

All styling uses Tailwind CSS utility classes with the following configuration:
- Tailwind CSS 4.1.10
- Forms plugin for better form styling
- Container queries plugin
- PostCSS with autoprefixer and cssnano for optimization

Example styling:
```handlebars
<button class="w-full py-3 px-6 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg">
  Submit
</button>
```
