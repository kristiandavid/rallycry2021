import * as React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'
import Leaflet from "../components/map";

const MapPage = ({ data }) => {
  const { site: {siteMetadata: { title, description, siteURL }} } = data

  return (
    <Layout>
      <section className="section">
      <Helmet title={`Categories | ${title}`}>
        <link rel="canonical" href={`${siteURL}/categories`} />
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
            <h1 className="title is-size-2 is-bold-light">Businesses Map</h1>
            <Leaflet />
          </div>
        </div>
      </div>
      </section>
    </Layout>
  )
}

export default MapPage

export const pageQuery = graphql`
  query MapTemplate {
    site {
      siteMetadata {
        title
        description
        siteURL
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
