const { slash } = require(`gatsby-core-utils`);
const { ProductsFragment } = require("./fragements/products/index.js");
//prettier-ignore
const projectDetailTemplate = require.resolve(`../src/templates/project-details/index.js`);
//prettier-ignore
const projectPageTemplate = require.resolve(`../src/templates/project-listing/index.js`);

const GET_PROJECT = `
query GET_PROJECT {
  allWpProject {
    totalCount
    nodes {
      id
      title
      slug
      date(formatString: "MMMM DD, YYYY")
			featuredImage {
				node {
					altText
					mediaItemUrl
				}
			}
      acfProject {
        subHeading
        productRelated
        theClient
        theSuburb
        whatWeDid
        location
        industry
        fieldGroupName
      }
    }
  }
  groupedProductsCustom: allGoogleNextrendproductSheet(filter: {groupedProducts: {ne: null}}) {
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
${ProductsFragment}
`;

module.exports = async ({ actions, graphql }) => {
	const { createPage } = actions;
	const result = await graphql(
		`
			${GET_PROJECT}
		`
	);
	const { allSimpleProducts, groupedProductsCustom, allWpProject } =
		result.data;

	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	/**================================================
	 * ADD SIMPLE PRODUCTS ARRAY TO GROUPED PRODUCTS
	 ====================================================*/

	const listSimpleProductsOfGroupedProduct = [];
	groupedProductsCustom.edges.forEach((groupedProduct, i) => {
		let listSimpleProducts = [];
		groupedProduct.node.groupedProducts.split(", ").forEach((sku) => {
			const simpleProduct = allSimpleProducts.edges.find(
				(product) => product.node.sku === sku
			);
			simpleProduct && listSimpleProducts.push(simpleProduct);
		});
		listSimpleProducts.length > 0 &&
			listSimpleProductsOfGroupedProduct.push(listSimpleProducts);
		groupedProduct.node.listSimpleProduct = listSimpleProducts;
	});

	/**========================================
	 * ADD PRODUCTS RELATED
	 ============================================*/
	const listProductsRelated = [];
	allWpProject.nodes.forEach((project, i) => {
		let listGroupedProducts = [];
		project.acfProject.productRelated &&
			project.acfProject.productRelated.split(", ").forEach((sku) => {
				const groupedProduct = groupedProductsCustom.edges.find(
					(product) => product.node.sku === sku
				);

				groupedProduct && listGroupedProducts.push(groupedProduct);
			});
		listGroupedProducts.length > 0 &&
			listProductsRelated.push(listGroupedProducts);
		project.listGroupedProducts = listGroupedProducts;
	});

	/**=====================================
	 * GET LIST OF CATEGORY
	 =========================================*/

	function getListCategories(projectList, category) {
		const listCategories = [];
		projectList.forEach((project) =>
			listCategories.push(project.acfProject[category])
		);
		return [...new Set(listCategories.flat())];
	}

	const listOfLocation = getListCategories(allWpProject.nodes, "location");
	const listOfIndustry = getListCategories(allWpProject.nodes, "industry");

	/**
	 * PAGINATION
	 */
	const numOfProjects = allWpProject.totalCount;
	const projectsPerPage = 9;
	const numPagesMainProjectListing = Math.ceil(numOfProjects / projectsPerPage);
	// CREATE PROJECTS LISTING
	Array.from({ length: numPagesMainProjectListing }).forEach((_, i) => {
		createPage({
			path: i === 0 ? `projects` : `/projects/${i + 1}`,
			component: slash(projectPageTemplate),
			context: {
				limit: projectsPerPage,
				skip: i * projectsPerPage,
				numPagesMainProjectListing,
				currentPage: i + 1,
				totalCount: numOfProjects,
				listOfLocation,
				listOfIndustry,
			},
		});
	});

	// create function to map the list
	const createListingItemRoute = (
		listOfCategories,
		category,
		projectsPerPage,
		pageTemplate
	) => {
		// map through the list

		listOfCategories.forEach((subCategory) => {
			// filter projects of each category
			const projectsDueCategory = allWpProject.nodes.filter((pj) => {
				if (category === "category") {
					return pj.acfProject["industry"].includes(subCategory);
				} else {
					return pj.acfProject[category].includes(subCategory);
				}
			});

			const numPages = Math.ceil(projectsDueCategory.length / projectsPerPage);
			let categoryPath;
			if (category === "location") {
				categoryPath = "project_location";
			} else if (category === "category") {
				categoryPath = "project_category";
			} else if (category === "industry") {
				categoryPath = "project_industry";
			}

			Array.from({ length: numPages }).forEach((_, i) => {
				createPage({
					path: `/blog/${categoryPath}/${subCategory}`,
					component: slash(pageTemplate),
					context: {
						limit: projectsPerPage,
						skip: i * projectsPerPage,
						numPages,
						currentPage: i + 1,
						totalCount: projectsDueCategory.length,
						projectsDueCategory,
					},
				});
			});
		});
	};

	// CREATE PROJECTS LISTING DUE CATEGORY ROUTES
	createListingItemRoute(
		listOfLocation,
		"location",
		projectsPerPage,
		projectPageTemplate
	);
	createListingItemRoute(
		listOfIndustry,
		"category",
		projectsPerPage,
		projectPageTemplate
	);
	createListingItemRoute(
		listOfIndustry,
		"industry",
		projectsPerPage,
		projectPageTemplate
	);

	// CREATE PROJECT DETAIL DUE CATEGORY ROUTES
	allWpProject.nodes.map((project) => {
		createPage({
			path: `projects/${project.slug}/`,
			component: slash(projectDetailTemplate),
			context: {
				project,
				location: project.acfProject.location,
				industry: project.acfProject.industry,
			},
		});
	});
};
