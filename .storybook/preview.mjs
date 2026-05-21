import '../app/globals.css'

/** @type {import('@storybook/nextjs-vite').Preview} */
const preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
    },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#f7f1eb' },
        { name: 'dusk', value: '#10131d' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
}

export default preview
