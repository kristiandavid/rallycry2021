// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

require('dotenv').config()

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
// if (process.env.CONTENTFUL_HOST) {
//   contentfulConfig.host = process.env.CONTENTFUL_HOST;
//   contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
// }

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    title: `Rally Cry | Support Small Businesses in Hamilton, ON`,
    titleTemplate: "%s | Rally Cry",
    description: `Rally Cry is a listing of small businesses in Hamilton that could use your
    support through this COVID-19 pandemic, and beyond.`,
    siteURL: "https://www.rallycry.ca", // No trailing slash allowed!
    author: `@kristiandavid`
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-google-marketing-platform',
      options: {
        // dataLayer: {
        //   gaPropertyId: '[Google Analytics ID]',
        // },
        tagmanager: {
          id: 'GTM-TRVX64B'
        },
        // analytics: {
        //   id: '[Google Analytics ID]'
        // }
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon152.png",
      },
    },
    "gatsby-plugin-react-leaflet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    }
  ],
};
