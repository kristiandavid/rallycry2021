import * as React from "react";
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout";
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

const CategoriesPage = ({ data }) => {
  const { edges: cats } = data.allContentfulCategory
  const { site: {siteMetadata: { title, description }} } = data

  return (
    <Layout>
      <section className="section">
      <Helmet title={`Categories | ${title}`}>
        <link rel="canonical" href="https://rallycry.ca/categories" />
        <meta
          name="title"
          content={`${title} | Rally Cry`}
        />
        <meta
          name="description"
          content={`A categorized listing of businesses. ${description}`}
        />
        <meta
          name="og:title"
          content={`${title} | Rally Cry`}
        />
        <meta
          name="og:description"
          content={`A categorized listing of businesses. ${description}`}
        />
        <meta
          name="og:url"
          content={`https://rallycry.ca/categories`}
        />
        <meta
          name="og:image"
          content={`${withPrefix('/')}og-image.jpg`}
        />
        <meta content="summary" name="twitter:card" />
        <meta content={`${title} | Rally Cry`} name="twitter:title" />
        <meta content={`A categorized listing of businesses. ${description}`} name="twitter:description" />
      </Helmet>
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Business Categories</h1>
            <ul className="taglist tagsList">
              {cats.map(({ node: tag }) => (
                <li key={`id-${tag.slug}`}>
                  <Link to={`/category/${tag.slug}/`}>
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </section>
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query CategoriesTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulCategory(sort: {fields: name, order: ASC}) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`
