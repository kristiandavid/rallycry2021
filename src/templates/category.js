import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const CatPostTemplate = ({
  helmet,
  name,
  posts
}) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-12">
            <h1 className="title is-size-2 is-bold-light">{name}</h1>
            <div className="grid">
              {posts && posts.slice(0,9).map(({ node: post }) => (
                <div className="is-parent" key={post.id}>
                  <article
                    className={`business-list-item tile is-child box notification gridBusinessRoll`}
                  >
                  <header>
                      <div className="featured-thumbnail">
                        <GatsbyImage image={getImage(post.featuredImage)} alt={post.name} />
                      </div>
                    <div className="post-meta">
                      <Link
                        className="title has-text-primary is-size-4"
                        to={`/business/${post.slug}`}
                      >
                        {post.name}
                      </Link>
                      <div className="openBusiness">{post.openForBusiness === true ? (<div className="openYes">Open: Modified Hours</div>) : (<div className="openNo">Closed</div>)}</div>
                    </div>
                  </header>
                    <div>
                      {post.categories && post.categories.length ? (
                        <div>
                          <ul className="taglist">
                            {post.categories.map(tag => (
                              <li key={tag.id + `tag`}>
                                <Link to={`/category/${tag.slug}/`}>{tag.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                    <Link className="button" to={`/category/${post.slug}`}>
                      More Info →
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CatPostTemplate.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  slug: PropTypes.string,
  helmet: PropTypes.object,
}

const CatPost = ({ data }) => {
  const { categoryQuery, storiesQuery } = data;
  const catName = categoryQuery.name;
  const catSlug = categoryQuery.slug;
  const { edges: posts } = storiesQuery;

  return (
    <Layout>
      <CatPostTemplate
        helmet={
          <Helmet defer={false}>
            <link rel="canonical" href={`https://rallycry.ca/category/${catSlug}`} />
            <meta
              name="og:url"
              content={`https://rallycry.ca/category/${catSlug}`}
            />
            <meta
              name="og:image"
              content={`${withPrefix('/')}img/og-image.jpg`}
            />
            <title>{catName} | Rally Cry</title>
            <meta
              name="title"
              content={`${catName} | Rally Cry`}
            />
            <meta
              name="og:title"
              content={`${catName} | Rally Cry`}
            />
            <meta
              name="description"
              content={`A listing of businesses in Hamitlon categorized under the term "${catName}"`}
            />
            <meta
              name="og:description"
              content={`A listing of businesses in Hamitlon categorized under the term "${catName}"`}
            />
            <meta content="summary" name="twitter:card" />
            <meta content={`${catName} | Rally Cry`} name="twitter:title" />
            <meta content={`A listing of businesses in Hamitlon categorized under the term "${catName}"`} name="twitter:description" />
          </Helmet>
        }
        name={catName}
        posts={posts}
      />
    </Layout>
  )
}

CatPost.propTypes = {
  data: PropTypes.shape({
    BusinessPostByCat: PropTypes.object,
  }),
}

export default CatPost

export const pageQuery = graphql`
  query BusinessPostByCat($slug: String!) {
    categoryQuery: contentfulCategory(slug: {eq: $slug}) {
      id
      name
      slug
    }
    storiesQuery: allContentfulBusiness(
      filter: {categories: {elemMatch: {slug: {eq: $slug}}}}
        sort: {fields: name, order: ASC}
      ) {
        edges {
          node {
            id
            name
            openForBusiness
            slug
            featuredImage {
              gatsbyImageData
            }
          }
        }
      }
  }
`
