import * as React from "react";
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout";
import Helmet from 'react-helmet'
import BusinessRollHome from '../components/BusinessRoll_home';
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { options } from "../assets/richtext";
import { withPrefix } from 'gatsby'

import banner from '../../static/reflectionBG.jpg';

import * as styles from "./index.module.scss";

const IndexPageTemplate = ({
  content,
  homeHeading,
  homeTitle,
  slug,
  title
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`,
        marginBottom: `20px`
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(161, 54, 57) 0.5rem 0px 0px, rgb(161, 54, 57) -0.5rem 0px 0px',
            backgroundColor: 'rgb(161, 54, 57)',
            color: 'white',
            lineHeight: '1',
            padding: '0.5em',
          }}
        >
          {homeTitle}
        </h1>
        <h2
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(161, 54, 57) 0.5rem 0px 0px, rgb(161, 54, 57) -0.5rem 0px 0px',
            backgroundColor: 'rgb(161, 54, 57)',
            color: 'white',
            lineHeight: '1',
            padding: '0.5em',
          }}
        >
          {renderRichText(homeHeading)}
        </h2>
      </div>
    </div>
    <section className="section section--gradient" style={{ padding:0 }}>
      <div className="container">
        <div className="section" style={{paddingTop: 0}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className={styles.contentText}>
                    {renderRichText(content, options)}
                  </div>
                </div>

                <div className="columns">
                  <div className="column is-12">
                    <h2 className="has-text-weight-semibold">
                      Latest Businesses Updated
                    </h2>
                    <BusinessRollHome />
                    <div className="column is-12 has-text-centered indexAllBusinesses">
                      <Link className="btn" to="/businesses">
                        View all businesses
                      </Link>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  id: PropTypes.string,
  content: PropTypes.object,
  homeHeading: PropTypes.object,
  homeTitle: PropTypes.string,
  showInNav: PropTypes.bool,
  slug: PropTypes.string,
  title: PropTypes.string
}

const IndexPage = ({ data }) => {
  const { contentfulPages } = data;
  const x = contentfulPages;
  return (
    <Layout>
      <Helmet titleTemplate="Rally Cry | Support Small Businesses in Hamilton, ON" defer={false}>
        <link rel="canonical" href="https://rallycry.ca/" />
        <meta
          name="title"
          content={`Rally Cry | Support Small Businesses in Hamilton, ON`}
        />
        <meta
          name="description"
          content={`Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
        />
        <meta
          name="og:title"
          content={`Rally Cry | Support Small Businesses in Hamilton, ON`}
        />
        <meta
          name="og:description"
          content={`Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
        />
        <meta
          name="og:url"
          content={`https://rallycry.ca/`}
        />
        <meta
          name="og:image"
          content={`${withPrefix('/')}og-image.jpg`}
        />
        <meta content="summary" name="twitter:card" />
        <meta content={`Rally Cry | Support Small Businesses in Hamilton, ON`} name="twitter:title" />
        <meta content={`Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`} name="twitter:description" />
      </Helmet>
      <IndexPageTemplate
        id={x.id}
        content={x.content}
        homeHeading={x.homeHeading}
        homeTitle={x.homeTitle}
        showInNav={x.showInNav}
        slug={x.slug}
        title={x.title}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    contentfulPages: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    contentfulPages(slug: {eq: "index"}) {
      id
      content {
        raw
      }
      homeHeading {
        raw
      }
      homeTitle
      showInNav
      slug
      title
    }
  }
`
