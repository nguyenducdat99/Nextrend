const { slash } = require(`gatsby-core-utils`);
const { ProductsFragment } = require('./fragements/products/index.js');
const { ImageFragment } = require('./fragements/image/index.js');
const landingPage = require.resolve(`../src/templates/landing/index.js`);

// Get all the posts.
const GET_LANDING_PAGES = `
  query PROJECTS {
     

    landingData: allWpLandingPage {
      edges {
        node {
          slug
          title
          content
          featuredImage {
            node {
              ...ImageFragment
            }
          }
          landingPages {
            bannerImage{
               ...ImageFragment
            }
            bannerText
            bannerTitle
            fieldGroupName
            footerText
            footerButtonText
            footerUrl
            video
            industry
            popUpImage {
              ...ImageFragment
            }
            testimonialImages {
              ...ImageFragment
            }
            footerImage {
              ...ImageFragment
            }
            popUpImage {
              ...ImageFragment
            }
          }
        }
      }
    }

    landingOurRanges: allWpLandingPage {
      edges {
        node {
          landingPages {
            ourRangesText
            range1Link
            range1Name
            range1Image {
              ...ImageFragment
            }
            range2Link
            range2Name
            range2Image {
              ...ImageFragment
            }
            range3Link
            range3Name
            range3Image {
              ...ImageFragment
            }
            range4Link
            range4Name
            range4Image {
              ...ImageFragment
            }
            range5Link
            range5Name
            range5Image {
              ...ImageFragment
            }
            range6Link
            range6Name
            range6Image {
              ...ImageFragment
            }
            range7Link
            range7Name
            range7Image {
              ...ImageFragment
            }
          }
        }
      }
    }

    groupedProductsCustom: allGoogleNextrendproductSheet(limit: 8, filter: {groupedProducts: {ne: null}}) {
      totalCount
      edges {
        node {
         ...ProductsFragment
        }
      }
    }

    allSimpleProducts: allGoogleNextrendproductSheet(
      filter: { groupedProducts: { eq: null } }
    ) {
      totalCount
      edges {
        node {
          ...ProductsFragment
        }
      }
    } 
  }
  ${ImageFragment}
  ${ProductsFragment}
`;

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      ${GET_LANDING_PAGES}
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  /**
   * ADD SIMPLE PRODUCTS ARRAY TO GROUPED PRODUCTS
   */

  // const listSimpleProductsOfGroupedProduct = [];
  result.data.groupedProductsCustom.edges.forEach((groupedProduct, i) => {
    let listSimpleProducts = [];
    groupedProduct.node.groupedProducts.split(', ').forEach((sku) => {
      const simpleProduct = result.data.allSimpleProducts.edges.find(
        (product) => product.node.sku === sku
      );

      simpleProduct && listSimpleProducts.push(simpleProduct);
    });
    // listSimpleProducts.length > 0 &&
    // listSimpleProductsOfGroupedProduct.push(listSimpleProducts);
    groupedProduct.node.listSimpleProduct = listSimpleProducts;
  });

  /**
   * BLOG DETAIL
   */
  result.data.landingData.edges.forEach((page, index) => {
    createPage({
      path: `landing-pages/${page.node.slug}/`,
      component: slash(landingPage),
      context: {
        page: page.node,
        landingOurRanges: result.data.landingOurRanges.edges[index].node,
        // allLandingPages: result.data.landingData.edges,
        groupedProductsCustom: result.data.groupedProductsCustom.edges,
      },
    });
  });
};
