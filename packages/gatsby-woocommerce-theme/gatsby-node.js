const path = require("path");
const createPosts = require("./create-pages/posts");
const createProducts = require("./create-pages/products");
const createProjects = require("./create-pages/projects");
const createLandingPage = require("./create-pages/landing-page");
const createOtherPage = require("./create-pages/other-page");
const createContactPage = require("./create-pages/contact-us");

exports.createPages = async ({ actions, graphql }) => {
	const { createRedirect } = actions;
	await createOtherPage({ actions, graphql });
	await createLandingPage({ actions, graphql });
	await createProjects({ actions, graphql });
	await createPosts({ actions, graphql });
	await createProducts({ actions, graphql });
	await createContactPage({ actions, graphql });
	await createRedirect({
		fromPath: `/2015/09/17/5-of-the-best-cafes-in-australia/`,
		toPath: `https://new.nextrend.com.au/2015/09/17/5-best-cafes-in-australia/`,
	});
};

/**
 * Since the node_modules ( packages ) live outside the theme directory, making an alias for them.
 *
 * So Gutenberg styles can be accessed like so `@import "~@wordpress/base-styles/colors"`
 *
 * @param stage
 * @param actions
 */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "../../node_modules"),
			},
		},
	});
};
