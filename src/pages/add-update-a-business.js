import * as React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

const AddBusinessPage = ({ data }) => {
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
            <iframe title="Add/Update a Business Form" src="https://docs.google.com/forms/d/e/1FAIpQLSfoG1dR9R0o2qQDQyqOFbh54K3a83rbNK-dmcZXwsUJyu0ZpA/viewform?embedded=true" className="iframeForm" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AddBusinessPage

export const pageQuery = graphql`
  query AddBusinessTemplate {
    site {
      siteMetadata {
        title
        description
      }
    }
    contentfulPages(slug: {eq: "add-update-a-business"}) {
      id
      slug
      content {
        raw
      }
      title
    }
  }
`
