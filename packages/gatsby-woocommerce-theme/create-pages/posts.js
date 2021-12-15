const { slash } = require(`gatsby-core-utils`);
const detailPostTemplate = require.resolve(
  `../src/templates/blog-details/index.js`
);
const blogListingPageTemplate = require.resolve(
  `../src/templates/blog-listing/index.js`
);

// Get all the posts.
const GET_POSTS = `
query GET_POSTS {
  allWpPost {
    totalCount
    nodes {
      slug
      title
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      tags {
        nodes {
          name
          id
        }
      }
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          name
        }
      }
      content
      tags {
        nodes {
          name
        }
      }
    }
  }
}

`;

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      ${GET_POSTS}
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const numOfBlogs = result.data.allWpPost.totalCount;
  const blogsPerPage = 9;
  const numPages = Math.ceil(numOfBlogs / blogsPerPage);

  /**
   * BLOG
   */
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `blog` : `blog/${i + 1}`,
      component: slash(blogListingPageTemplate),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1,
        totalCount: numOfBlogs,
      },
    });
  });

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  /**
   * BLOG DETAIL
   */
  result.data.allWpPost.nodes.forEach((currentPost) => {
    let tagsArr = currentPost.tags.nodes.map((tag) => tag.name);
    let listRelatedPosts = [];
    result.data.allWpPost.nodes.forEach((pst) => {
      pst.tags.nodes.forEach((tagOfLoopingPost) => {
        listRelatedPosts = getUniqueListBy(listRelatedPosts, 'title');
        tagsArr.includes(tagOfLoopingPost.name) &&
          currentPost.title !== pst.title &&
          listRelatedPosts.length < 3 &&
          listRelatedPosts.push(pst);
      });
    });

    createPage({
      path: `blog/${currentPost.slug}/`,
      component: slash(detailPostTemplate),
      context: {
        currentPost,
        listRelatedPosts,
        allPosts: result.data.allWpPost.nodes,
      },
    });
  });
};
