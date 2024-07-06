# Contrax Adds-On Extension

### Commands

#### Deploy

After login, and creating your document, run the following command to deploy the contract to the blockchain.

```bash
npm run deploy
```

### Style Guide

use [tailwindcss](https://tailwindcss.com/) for styling.
use [tailwindcss animated](https://www.tailwindcss-animated.com/) for animations.
see our style system on [figma](https://www.figma.com/file/XS7FAOVrbjl8wnpWmVj0Mt/assets?type=design&t=He9VjZHI1DICBRiZ-6).

### Component library [shadcn-vue](https://www.shadcn-vue.com/)

### Route Manual Configuration Documentation

See the [Vue Router](https://router.vuejs.org/) documentation for more information.

#### Format Guidelines

- Pages should follow this format: `page.sub-page.sub-sub-page`
- The format signifies the URL path structure: `/page/sub-page/sub-sub-page`
- For each page, include the following fields:
  - `path`: URL path
  - `component`: Component to render
  - `name`: Route name
  - `meta.displayName`: Display name in the sidebar
  - `meta.description`: Description displayed under the displayName
  - `meta.icon`: Icon displayed in the sidebar and name ([Lucide Icons](https://lucide.dev/guide/packages/lucide-vue-next))

#### Example Structure

```javascript
{
  path: '/example',
  component: ExampleComponent,
  name: 'Example',
  meta: {
    displayName: 'Example Page',
    description: 'This is an example page',
    icon: 'IconName',
  }
}
```

### Environment Variables

- `BEARER_TOKEN`: Bearer token for authentication

  Generate one using the following command:

  ```bash
      gcloud auth print-identity-token
  ```

  Then:

  1. Open your Apps Script project in the online editor.
  1. Go to Project Settings (under the gear icon).
  1. Scroll to Script Properties.
  1. Add your key-value pairs here. This is similar to setting environment variables.

### Moke Google Apps Script

On every function you add to the script, add it to `src\lib\mock-google-script.js` as well.
that's will allow you to test the function locally.
