import * as React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import Helmet from 'react-helmet'
import BusinessRoll from '../components/BusinessRoll';
import { withPrefix } from 'gatsby'

const BusinessesPage = () => {
  return (
    <Layout>
      <section className="section">
        <Helmet titleTemplate="Businesses | Rally Cry" defer={false}>
          <link rel="canonical" href="https://rallycry.ca/businesses" />
          <meta
            name="title"
            content={`Businesses | Rally Cry`}
          />
          <meta
            name="description"
            content={`The complete list of small businesses we have on the site so far. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
          />
          <meta
            name="og:title"
            content={`Businesses | Rally Cry`}
          />
          <meta
            name="og:description"
            content={`The complete list of small businesses we have on the site so far. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
          />
          <meta
            name="og:url"
            content={`https://rallycry.ca/businesses`}
          />
          <meta
            name="og:image"
            content={`${withPrefix('/')}img/og-image.jpg`}
          />
          <meta content="summary" name="twitter:card" />
          <meta content={`Businesses | Rally Cry`} name="twitter:title" />
          <meta content={`The complete list of small businesses we have on the site so far. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19."`} name="twitter:description" />
        </Helmet>
        <div className="container">
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              color: '#A13639',
              padding: '1rem',
            }}
          >
            All Listed Businesses
          </h1>
          <div className="content">
            <BusinessRoll />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default BusinessesPage

export const pageQuery = graphql`
  query BusinessesTemplate {
    contentfulPages(slug: {eq: "businesses"}) {
      id
      slug
      content {
        raw
      }
      title
    }
  }
`
