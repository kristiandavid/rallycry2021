import * as React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

const ContactPage = ({ data }) => {
  const { site: {siteMetadata: { title, description }} } = data
  return (
    <Layout>
    <Helmet title={`Categories | ${title}`}>
      <link rel="canonical" href="https://rallycry.ca/add-update-a-business" />
      <meta
        name="title"
        content={`${title} | Rally Cry`}
      />
      <meta
        name="description"
        content={`Add a new listing or update an existing one. ${description}`}
      />
      <meta
        name="og:title"
        content={`${title} | Rally Cry`}
      />
      <meta
        name="og:description"
        content={`Add a new listing or update an existing one. ${description}`}
      />
      <meta
        name="og:url"
        content={`https://rallycry.ca/add-update-a-business`}
      />
      <meta
        name="og:image"
        content={`${withPrefix('/')}og-image.jpg`}
      />
      <meta content="summary" name="twitter:card" />
      <meta content={`${title} | Rally Cry`} name="twitter:title" />
      <meta content={`Add a new listing or update an existing one. ${description}`} name="twitter:description" />
    </Helmet>
      <section className="section">
        <div className="container">
          <div className="content">
            <iframe title="Rally Cry Contact Form" src="https://docs.google.com/forms/d/e/1FAIpQLSdfDKjeDP07MP52KNFUFzoFP6KtKjDUJ1Zb-NaYMmPu1HiopQ/viewform?embedded=true" className="iframeForm" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query ContactTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
    contentfulPages(slug: {eq: "contact"}) {
      id
      slug
      content {
        raw
      }
      title
    }
  }
`
