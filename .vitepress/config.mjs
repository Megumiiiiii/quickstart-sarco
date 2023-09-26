import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  logo: '/pharoah.png',
  title: "Quick Start Archeologist",
  description: "Guide to setup Archeologist",
  returnToTopLabel: 'Back to top',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    id: {
      label: 'Bahasa',
      lang: 'id',
      link: '/id/'
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/'
    },
    ru: {
      label: 'Русский язык',
      lang: 'ru',
      link: '/ru/'
    },
    zh: {
      label: '中文',
      lang: 'zh',
      link: '/zh/'
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: 'https://sarcophagus.io/' },
      { text: 'Repository', link: 'https://github.com/sarcophagus-org/sarcophagus-v2-archaeologist-service' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sarcophagus-org' },
      { icon: 'twitter', link: 'https://x.com/sarcophagusio' },
      { icon: 'discord', link: 'https://discord.gg/sarcophagus-community-753398645507883099' }
    ],
    footer: {
      text: 'This is a permapage.'
    },
    editLink: true,
    sidebar: [
      {
        items: [
          { text: 'Let&#39;s get Started', link: '/guide/' }
        ]
      }
    ]
  }
})
