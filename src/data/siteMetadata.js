const siteMetadata = {
  defaultLocale: 'en',
  locales: ['en', 'vi'],
  siteUrl: 'https://wishzy.com',
  siteRepo: 'https://github.com/yourname/wishzy',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/og-banner.png',
  theme: 'wishzy',

  author: {
    name: 'Wishzy Team',
    email: 'contact@wishzy.com',
    github: 'https://github.com/wishzy',
    linkedin: 'https://linkedin.com/company/wishzy',
    facebook: 'https://facebook.com/wishzy',
    youtube: 'https://youtube.com/@wishzy',
    twitter: 'https://twitter.com/wishzy',
    instagram: 'https://instagram.com/wishzy',
  },

  analytics: {
    googleAnalytics: {
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
    },
  },

}

export default siteMetadata
