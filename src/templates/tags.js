import React from 'react'
import Helmet from 'react-helmet'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postHTML = posts.map(post => (
      <article
        className={`business-list-item tile is-child box notification gridBusinessRoll`}
      >
        <header>
          {post.node.frontmatter.featuredimage ? (
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.node.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                }}
              />
            </div>
          ) : null}
          <div className="post-meta">
            <Link
              className="title has-text-primary is-size-4"
              to={post.node.fields.slug}
            >
              {post.node.frontmatter.title}
            </Link>
            <div className="openBusiness">{post.node.frontmatter.open === true ? (<div className="openYes">Open: Modified Hours</div>) : (<div className="openNo">Closed</div>)}</div>
          </div>
        </header>
        <div>
          {post.node.frontmatter.tags && post.node.frontmatter.tags.length ? (
            <div style={{ marginTop: `1rem` }}>
              <ul className="homeTaglist">
                {post.node.frontmatter.tags.map(tag => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <Link className="button" to={post.node.fields.slug}>
          More Info →
        </Link>
      </article>
    ))

    // const postLinks = posts.map(post => (
    //   <li key={post.node.fields.slug}>
    //     <Link to={post.node.fields.slug}>
    //       <h2>{post.node.frontmatter.title}</h2>
    //     </Link>
    //   </li>
    // ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const description = this.props.data.site.siteMetadata.description
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} business${
      totalCount === 1 ? '' : 'es'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} defer={false}>
            <meta
              name="description"
              content={`A listing of businesses in Hamitlon categorized under the term "${tag}". ${description}`}
            />
          </Helmet>
          <div className="container content">
            <div className="columns">
              <div
                className="column is-12"
                style={{ marginBottom: '6rem' }}
              >
                <h1 className="title is-size-2 is-bold-light tagsH1">{tagHeader}</h1>
                <p className="allTags"><Link to="/tags/">Browse all tags</Link></p>
                <div className="grid">{postHTML}</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title,
        description
      }
    }
    allContentfulBusiness(
      sort: { fields: [name], order: ASC }
      filter: {categories: {elemMatch: {slug: {eq: $tag}}}}
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`
