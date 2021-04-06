import * as React from "react";
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout";
import BusinessRoll from '../components/BusinessRoll';

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import banner from '../../static/reflectionBG.jpg';

import * as styles from "./index.module.scss";

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

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
        <h3
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
        </h3>
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
                    <BusinessRoll />
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
  console.log("data: ", data);
  const { contentfulPages } = data;
  const x = contentfulPages;
  return (
    <Layout>
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
