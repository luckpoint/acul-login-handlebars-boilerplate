/// <reference types="vite/client" />

// Type definitions for precompiled Handlebars templates
declare module '*.hbs?compiled' {
  import { TemplateDelegate } from 'handlebars';
  const template: TemplateDelegate;
  export default template;
}

// Type definitions for raw import of existing templates
declare module '*.hbs?raw' {
  const content: string;
  export default content;
}