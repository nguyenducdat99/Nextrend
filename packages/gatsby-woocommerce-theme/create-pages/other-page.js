const { slash } = require(`gatsby-core-utils`);
const detailPostTemplate = require.resolve(
	`../src/templates/other-page/index.js`
);

const GET_OTHER_PAGE = `
query GET_OTHER_PAGE {
	allWpPage {
		edges {
			node {
				content
				slug
				title
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
			}
		}
	}
  allWpFaq {
    nodes {
      title
      slug
      content
    }
  }
  allWpTestimonial {
    nodes {
      slug
      title
      content
    }
  }
}
`;

module.exports = async ({ actions, graphql }) => {
	const { createPage } = actions;
	const result = await graphql(
		`
			${GET_OTHER_PAGE}
		`
	);

	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	const { allWpPage, allWpFaq, allWpTestimonial } = result.data;

	function createOtherDetailsPage(arrOfOtherDetailsPage, path, template) {
		arrOfOtherDetailsPage.forEach((page) => {
			let pathToCreate;
			if (path === "nextrendtestimonials") {
				pathToCreate = "/blog/nextrendtestimonials";
			} else if (path === "nextrendfaqs") {
				pathToCreate = "/blog/nextrendfaqs";
			} else {
				pathToCreate = "";
			}
			let pageToCreate = page.node || page;
			createPage({
				path: `${pathToCreate}/${pageToCreate.slug}/`,
				component: slash(template),
				context: {
					page: pageToCreate,
				},
			});
		});
	}

	createOtherDetailsPage(allWpPage.edges, "", detailPostTemplate);
	createOtherDetailsPage(
		allWpTestimonial.nodes,
		"nextrendtestimonials",
		detailPostTemplate
	);
	createOtherDetailsPage(allWpFaq.nodes, "nextrendfaqs", detailPostTemplate);
};
