const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
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
      categories: allContentfulCategory {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

  
    result.data.businesses.edges.forEach(edge => {
      const slug = edge.node.slug
      createPage({
        path: `/business/${slug}`,
        component: path.resolve(`./src/templates/business.js`),
        context: { slug: slug },
      })
    });

    result.data.categories.edges.forEach(edge => {
      const slug = edge.node.slug
      createPage({
        path: `/category/${slug}`,
        component: path.resolve(`./src/templates/category.js`),
        context: { slug: slug },
      })
    });
  })
}
