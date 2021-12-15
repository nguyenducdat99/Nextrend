const { slash } = require(`gatsby-core-utils`);
const { ProductsFragment } = require('./fragements/products/index.js');
//prettier-ignore
const productByCateTemplate = require.resolve(`../src/templates/product-listing/index.js`);
//prettier-ignore
const productDetailTemplate = require.resolve(`../src/templates/product-details/index.js`);

/***
 * HELPER
 */
const getUniqueListBy = (arr, key) => [
  ...new Map(arr.map((item) => [item.node[key], item])).values(),
];
//prettier-ignore
const textToSlug = (text) => text.split(' ').join('-').replace(/[\s\/\\]/g, '').toLowerCase();
const initArr = (totalCount, productsPerPage) =>
  Array.from({
    length: Math.ceil(totalCount / productsPerPage),
  });

const convertSlug = (slug) => {
  if (slug !== undefined) {
    let slug1 =
      slug &&
      slug
        .split('/')
        .map((el) => (el.includes('-') ? el.replace(/[^\w\s]/gi, ' ') : el))
        .join(' - ');
    let slug2 = slug1
      .split(' ')
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
      .join(' ');
    return slug2;
  }
};
const getTotalProductInCate = (productList, categoryName) => {
  const totalAmount = productList.reduce((prev, cur) => {
    const isProductInCate =
      cur.categories ||
      cur.node.categories.split(' > ')[0].includes(categoryName);
    if (isProductInCate) {
      return prev + 1;
    } else {
      return prev;
    }
  });

  return totalAmount;
};

/***
/***====================================
 * QUERY
 ========================================*/

const GET_PRODUCTS_NEXTREND = `
query GET_PRODUCTS_NEXTREND {
groupedProductsCustom: allGoogleNextrendproductSheet(sort: {fields: sortOrder}, filter: {groupedProducts: {ne: null}}) {
    totalCount
    edges {
      node {
        ...ProductsFragment
      }
    }
  }
  allSimpleProducts: allGoogleNextrendproductSheet(sort: {fields: sortOrder}, filter: {groupedProducts: {eq: null}}) {
    totalCount
    edges {
      node {
        ...ProductsFragment
      }
    }
  }
}

${ProductsFragment}
`;

/***
/***===========================
 * CREATE PAGES
 ==============================*/

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const nextrendProducts = await graphql(
    `
      ${GET_PRODUCTS_NEXTREND}
    `
  );

  const { allSimpleProducts, groupedProductsCustom } = nextrendProducts.data;

  // catch error
  if (nextrendProducts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  /***
   *
   * CREATE CATEGORIES
   *
   */

  const listCategories = [];
  const hierarchyCategories = {};

  groupedProductsCustom.edges.map((product) => {
    listCategories.push(product.node.categories);
  });

  [...new Set(listCategories)].map((list) => {
    const tempCate = list && list.split(',');
    tempCate &&
      tempCate.map((cate) => {
        const arrOfMultipleLevelCate = cate.includes(' >') && cate.split(' > ');

        // Check if current hierarchy cate has level 2 cate
        if (arrOfMultipleLevelCate && arrOfMultipleLevelCate[1]) {
          /* =================================
					check if hierarchyCategories has property name cate level 1 
					=================================== */
          if (hierarchyCategories[arrOfMultipleLevelCate[0]]) {
            const secondLevelCateIndex = hierarchyCategories[
              arrOfMultipleLevelCate[0]
            ].categoriesList.findIndex(
              (item) => item.name === arrOfMultipleLevelCate[1]
            );

            /*  ================
						IF LEVEL 2 NOT EXIST, CREATE NEW ONE
						================*/
            if (secondLevelCateIndex === -1) {
              hierarchyCategories[
                arrOfMultipleLevelCate[0]
              ].categoriesList.push({
                name: arrOfMultipleLevelCate[1],
                cateThirdLevel: [],
                totalAmount: 0,
              });
            }

            /*===========             
						Check if current hierarchy cate has level 3 cate
						==========*/
            if (arrOfMultipleLevelCate[2] && secondLevelCateIndex !== -1) {
              hierarchyCategories[arrOfMultipleLevelCate[0]].categoriesList[
                secondLevelCateIndex
              ].cateThirdLevel.push(arrOfMultipleLevelCate[2]);
            }
          } else {
            /* ====
						Create Cate Level 1- a object with totalAmount and categoriesList
						======*/
            hierarchyCategories[arrOfMultipleLevelCate[0]] = {
              totalAmount: 0,
              categoriesList: [
                {
                  name: arrOfMultipleLevelCate[1],
                  cateThirdLevel: [],
                  totalAmount: 0,
                },
              ],
            };
          }
        }
      });
  });
  // Remote duplicate categories level 3
  for (const property in hierarchyCategories) {
    hierarchyCategories[property].categoriesList.map((cateLevel2) => {
      cateLevel2.cateThirdLevel = [...new Set(cateLevel2.cateThirdLevel)];

      cateLevel2.cateThirdLevel.map((cate, index) => {
        cateLevel2.cateThirdLevel[index] = { name: cate, totalAmount: 0 };
      });
    });
  }

  /**
   * ADD SIMPLE PRODUCTS ARRAY TO GROUPED PRODUCTS
   */

  groupedProductsCustom.edges.forEach((groupedProduct, i) => {
    let listSimpleProducts = [];
    groupedProduct.node.groupedProducts.split(', ').forEach((sku) => {
      const simpleProduct = allSimpleProducts.edges.find(
        (product) => product.node.sku === sku
      );

      simpleProduct && listSimpleProducts.push(simpleProduct);
    });
    groupedProduct.node.listSimpleProduct = listSimpleProducts;
  });

  /**
   * PAGINATION
   */
  const productsPerPage = 15;

  /**
   * CREATE PRODUCTS PAGE
   */

  initArr(groupedProductsCustom.totalCount, productsPerPage).forEach((_, i) => {
    createPage({
      path: `/products`,
      component: slash(productByCateTemplate),
      context: {
        groupedProductsCustom: groupedProductsCustom.edges,
        subCategories: hierarchyCategories,
        categoryName: 'all',
        des: '',
      },
    });
  });

  /***
   * CREATE PRODUCTS BY CATE PAGE
   ***/
  for (prop in hierarchyCategories) {
    let mainCateSlug = textToSlug(prop);
    let filteredProducts = groupedProductsCustom.edges.filter((product) => {
      const arrOfCates =
        product.node.categories && product.node.categories.split(',');
      return (
        arrOfCates &&
        arrOfCates.some((item) => {
          return item.split(' > ')[0] === prop || item === prop;
        })
      );
    });

    hierarchyCategories[prop].totalAmount = filteredProducts.length;

    /***
     * MAIN CATE
     ***/
    initArr(filteredProducts.length, productsPerPage).forEach((_, i) => {
      createPage({
        path: `/product-category/${mainCateSlug}`,
        component: slash(productByCateTemplate),
        context: {
          filteredProducts,
          subCategories: hierarchyCategories[prop],
          slug: `${mainCateSlug}`,
          category: prop,
          des: convertSlug(`${mainCateSlug}`),
        },
      });
    });

    /***
     * LEVEL 2 CATE
     ***/
    hierarchyCategories[prop].categoriesList.forEach((cateLevel2, _) => {
      let cateSlugLevel2 = textToSlug(cateLevel2.name);

      let filteredProductsSecondLevel = groupedProductsCustom.edges.filter(
        (product) => {
          const arrOfCates =
            product.node.categories && product.node.categories.split(',');
          return (
            arrOfCates &&
            arrOfCates.some((item) => {
              const arrMultiLevelCate =
                item.includes(' > ') && item.split(' > ');
              return (
                arrMultiLevelCate[0] === prop &&
                arrMultiLevelCate[1] === cateLevel2.name
              );
            })
          );
        }
      );
      /* // ADD TOTAL PRODUCT AMOUNT - CATE LEVEL2
       */
      cateLevel2.totalAmount = filteredProductsSecondLevel.length;

      initArr(filteredProducts.length, productsPerPage).forEach((_, i) => {
        createPage({
          path: `/product-category/${mainCateSlug}/${cateSlugLevel2}`,
          component: slash(productByCateTemplate),
          context: {
            filteredProducts: filteredProductsSecondLevel,
            subCategories: cateLevel2['cateThirdLevel'],
            slug: `${mainCateSlug}/${cateSlugLevel2}`,
            category: cateLevel2.name,
            des: convertSlug(`${mainCateSlug}/${cateSlugLevel2}`),
          },
        });
      });

      /***
       * LEVEL 3 CATE
       ***/
      if (cateLevel2.cateThirdLevel.length > 0) {
        cateLevel2.cateThirdLevel.forEach((cateLevel3, index) => {
          const cateSlugLevel3 = textToSlug(cateLevel3.name);
          let filteredProductsThirdLevel = groupedProductsCustom.edges.filter(
            (product) => {
              const arrOfCates =
                product.node.categories && product.node.categories.split(',');
              return (
                arrOfCates &&
                arrOfCates.some((item) => {
                  const arrMultiLevelCate =
                    item.includes('>') && item.split(' > ');
                  return (
                    arrMultiLevelCate[2] &&
                    arrMultiLevelCate[0] === prop &&
                    arrMultiLevelCate[1] === cateLevel2.name &&
                    arrMultiLevelCate[2] === cateLevel3.name
                  );
                })
              );
            }
          );

          /* // ADD TOTAL PRODUCT AMOUNT - CATE LEVEL 3
           */

          cateLevel3.totalAmount = filteredProductsThirdLevel.length;

          /***
           * CREATE PAGE LV 3
           ***/
          initArr(filteredProductsThirdLevel.length, productsPerPage).forEach(
            (_, i) => {
              createPage({
                path: `/product-category/${mainCateSlug}/${cateSlugLevel2}/${cateSlugLevel3}/`,
                component: slash(productByCateTemplate),
                context: {
                  filteredProducts: filteredProductsThirdLevel,
                  slug: `${mainCateSlug}/${cateSlugLevel2}/${cateSlugLevel3}`,
                  category: cateLevel2.name,
                  des: convertSlug(
                    `${mainCateSlug}/${cateSlugLevel2}/${cateSlugLevel3}`
                  ),
                },
              });
            }
          );
        });
      }
    });
  }

  /***
   * CREATE PRODUCT DETAIL PAGE
   */

  // CREATE GROUPED PRODUCT  ROUTES
  groupedProductsCustom.totalCount > 0 &&
    groupedProductsCustom.edges.forEach(({ node }) => {
      let listProductsRelated = [];
      if (node.categories) {
        const listCate = node.categories && node.categories.split(',');
        // GET RELATED PRODUCTS
        groupedProductsCustom.edges.forEach((product) => {
          listProductsRelated = getUniqueListBy(listProductsRelated, 'name');
          listProductsRelated.length < 4 &&
            listCate &&
            listCate.forEach(
              (cate) =>
                product.node.categories &&
                product.node.categories.split(',').includes(cate) &&
                listProductsRelated.push(product)
            );
        });
      }
      createPage({
        path: `/${node.slug}`,
        component: slash(productDetailTemplate),
        context: {
          product: node,
          listProductsRelated,
          test: `*${node.sku}*`,
        },
      });
    });

  // CREATE SIMPLE PRODUCT  ROUTES
  allSimpleProducts.totalCount > 0 &&
    allSimpleProducts.edges.forEach(({ node }) => {
      const parentProduct = groupedProductsCustom.edges.find((product) => {
        return product.node.groupedProducts.includes(node.sku);
      });

      createPage({
        path: `/${node.slug}`,
        component: slash(productDetailTemplate),
        context: {
          product: node,
          parentProduct: parentProduct?.node,
        },
      });
    });
};
