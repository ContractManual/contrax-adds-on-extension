# Contrax Adds-On Extension

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