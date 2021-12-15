require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { project } = require("./package.json");

const buildCredentials = ({
  SPREADSHEET_ID,
  PROJECT_ID,
  PRIVATE_KEY,
  PRIVATE_KEY_ID,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
}) => ({
  spreadsheetId: SPREADSHEET_ID,
  credentials: {
    type: "service_account",
    project_id: PROJECT_ID || project.id,
    private_key_id: PRIVATE_KEY_ID || project.keyId,
    private_key: (PRIVATE_KEY || project.key).replace(/(\\r)|(\\n)/g, "\n"),
    client_email: CLIENT_EMAIL || project.email,
    client_id: CLIENT_ID,
    auth_uri: AUTH_URI,
    token_uri: TOKEN_URI,
    auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: `${CLIENT_X509_CERT_URL}/${encodeURIComponent(
      CLIENT_EMAIL || project.email
    )}`,
  },
});

module.exports = ({ googleTagManagerId }) => ({
  siteMetadata: {
    title: `Nextrend`,
    description: `Nextrend`,
    siteUrl: "https://new.nextrend.com.au/graphql",
    wordPressSiteUrl: "https://new.nextrend.com.au/graphql",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    // {
    //   resolve: 'gatsby-plugin-google-tagmanager',
    //   options: {
    //     id: googleTagManagerId,
    //     includeInDevelopment: false,
    //   },
    // },
    {
      resolve: "gatsby-source-google-spreadsheets",
      options: buildCredentials(process.env),
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://new.nextrend.com.au/graphql`,
        verbose: true,
        schema: {
          timeout: 3000000,
          perPage: 20,
          requestConcurrency: 50,
          previewRequestConcurrency: 2,
        },
        type: {
          MediaItem: {
            localFile: {
              // killed all concurrency which the command line probably overrode
              requestConcurrency: 1,
              // large images would die if they were larger than.. like, 5mb by default? undocumented and threw no warnings, just died.
              maxFileSizeBytes: 100000000,
            },
          },
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: false,
        },
        debug: {
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 30 : 5000,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nextrend`,
        short_name: `Nextrend`,
        start_url: `/`,
        background_color: `#eaeaea`,
        theme_color: `#1e1e1e`,
        display: `standalone`,
        icon: `${__dirname}/src/images/favicon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `nextrend`,
      },
    },
  ],
});
