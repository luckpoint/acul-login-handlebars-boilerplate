// renderTemplate.ts

import Handlebars from 'handlebars';
import layoutTemplate from './layout.hbs?compiled';
import headerTemplateRaw from './header.hbs?raw';
import footerTemplateRaw from './footer.hbs?raw';
import passwordFieldTemplateRaw from './shared/password-field.hbs?raw';
import errorMessagesTemplateRaw from './shared/error-messages.hbs?raw';
import identifierFieldTemplateRaw from './shared/identifier-field.hbs?raw';
import inputFieldTemplateRaw from './shared/input-field.hbs?raw';
import socialLoginButtonsTemplateRaw from './shared/social-login-buttons.hbs?raw';

// --- Register all helpers globally in one place ---
Handlebars.registerPartial('header', headerTemplateRaw);
Handlebars.registerPartial('footer', footerTemplateRaw);
Handlebars.registerPartial('passwordField', passwordFieldTemplateRaw);
Handlebars.registerPartial('shared/error-messages', errorMessagesTemplateRaw);
Handlebars.registerPartial('shared/identifier-field', identifierFieldTemplateRaw);
Handlebars.registerPartial('shared/input-field', inputFieldTemplateRaw);
Handlebars.registerPartial('shared/social-login-buttons', socialLoginButtonsTemplateRaw);
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('contains', (array, value) => Array.isArray(array) && array.includes(value));
Handlebars.registerHelper('or', (a, b) => a || b);

const compiledLayoutTemplate = layoutTemplate;

/**
 * Renders the specified view template with data and incorporates it into the layout
 * @param viewTemplate Compiled Handlebars template function for **each screen**
 * @param viewData Data for the view template
 * @returns Rendered HTML string
 */
export function renderWithLayout(viewTemplate: Handlebars.TemplateDelegate<any>, viewData: any): string {
  const viewContentHtml = viewTemplate(viewData);
  const layoutRenderData = {
    body: viewContentHtml
  };
  return compiledLayoutTemplate(layoutRenderData);
}
