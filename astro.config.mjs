import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import playformCompress from '@playform/compress'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { SITE } from './site.config'

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    expressiveCode({
      // useThemedScrollbars: true,
      themeCssSelector: (theme) => `.${theme.type}`,
      themes: ['material-theme-ocean', 'material-theme-lighter'],
      styleOverrides: {
        borderRadius: '0.5em',
      },
    }),
    playformCompress(),
    sitemap(),
    mdx(),
  ],
})
