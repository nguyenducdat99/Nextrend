require('dotenv').config();

module.exports = {
  flags: {
    DEV_SSR: false,
    FAST_REFRESH: true,
    FAST_DEV: true,
  },
  siteMetadata: {
    title: `Nextrend`,
    description: `fill this out at some point`,
    siteUrl: `https://new.nextrend.com.au`,
    fbAppId: '',
  },
  plugins: [
    // Tell gatsby which theme you will be using and other configs.
    {
      resolve: 'gatsby-woocommerce-theme',
      options: {
        wordPressUrl: `${process.env.WORDPRESS_SITE_URL}`,
        // wordPressUrl: `https://new.nextrend.com.au`,
        gatsbySiteUrl: `${process.env.GATSBY_SITE_URL}`,
        // googleTagManagerId: `${ process.env.GOOGLE_TAGMANAGER_ID }`,
        // fbAppId: `${ process.env.FB_APP_ID }`
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
