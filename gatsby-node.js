const Promise = require('bluebird')
const path = require('path')


exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      businesses: allContentfulBusiness {
        edges {
          node {
            slug
          }
        }
      }
      notHome:allContentfulPages(filter: {slug: {ne: "index"}}) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  data.businesses.edges.forEach(edge => {
    const slug = edge.node.slug
    actions.createPage({
      path: `/business/${slug}`,
      component: require.resolve(`./src/templates/business.js`),
      context: { slug: slug },
    })
  });

  data.notHome.edges.forEach(edge => {
    const slug = edge.node.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/page.js`),
      context: { slug: slug },
    })
  })
}
