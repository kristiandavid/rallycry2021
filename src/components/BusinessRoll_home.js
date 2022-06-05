import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

class BusinessRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allContentfulBusiness

    return (
      <div className="grid">
        {posts &&
          posts.slice(0,9).map(({ node: post }) => (
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
                      <ul className="homeTaglist">
                        {post.categories.map(tag => (
                          <li key={tag.id + `tag`}>
                            <Link to={`/category/${tag.slug}/`}>{tag.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <Link className="button" to={`/business/${post.slug}`}>
                  More Info →
                </Link>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

BusinessRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

const staticQuery = () => {
  return <StaticQuery
    query={graphql`
      query BusinessRollHomeQuery {
        allContentfulBusiness(sort: {fields: updatedAt, order: DESC}) {
          edges {
            node {
              id
              name
              updatedAt(formatString: "YYYYMMDDhhmm")
              categories {
                id
                name
                slug
              }
              featuredImage {
                gatsbyImageData(placeholder: DOMINANT_COLOR)
              }
              slug
              openForBusiness
            }
          }
        }
      }
    `}
    render={(data, count, limit) => <BusinessRoll data={data} count={count} />}
  />
}

export default staticQuery;
