// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

require('dotenv').config()

// console.debug("process.env: ", process.env);
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN
};

// console.debug("WTF: contentfulConfig: ", contentfulConfig);
// console.debug("WTF: process.env: ", process.env);

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
  siteMetadata: {
    title: `Rally Cry | Support Small Businesses in Hamilton, ON`,
    titleTemplate: "%s | Rally Cry",
    description: `Rally Cry is a listing of small businesses in Hamilton that could use your support.`,
    siteURL: "https://www.rallycry.ca",
    author: `@kristiandavid`
  },
  plugins: [
    `@contentful/rich-text-types`,
    `@contentful/rich-text-react-renderer`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
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
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
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
    },
  ],
};
