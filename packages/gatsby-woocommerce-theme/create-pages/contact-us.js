const { slash } = require(`gatsby-core-utils`);
const ContactLocationBaseTemplate = require.resolve(
  `../src/templates/contact-location-page/index.js`
);

// Get all the posts.
const CONTACT_LOCATION_PAGES = ['brisbane', 'sydney', 'melbourme'];

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;

  /**
   * BLOG DETAIL
   */
  CONTACT_LOCATION_PAGES.forEach((location) => {
    createPage({
      path: `/contact-us/${location}`,
      component: slash(ContactLocationBaseTemplate),
      context: {
        test: 'this is test data',
      },
    });
  });
};
