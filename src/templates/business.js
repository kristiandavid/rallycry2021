import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { options } from "../assets/richtext";

const BusinessPostTemplate = ({
  helmet,
  tags,
  id,
  address,
  categories,
  email,
  featuredImage,
  hoursMonday,
  hoursTuesday,
  hoursWednesday,
  hoursThursday,
  hoursFriday,
  hoursSaturday,
  hoursSunday,
  name,
  openForBusiness,
  otherWaysToSupport,
  phoneNumber,
  rules,
  additionalInfo,
  slug,
  socialFacebook,
  socialInstagram,
  socialTwitter,
  visible,
  website
}) => {
  const mapLink = `https://www.google.com/maps/place/${address}`
  const phoneLink = `tel:${phoneNumber}`

  function socialLink(type, acct) {
    const link = type === "email" ? `mailto:${acct}` : `https://www.${type}.com/${acct}`;
    switch(type) {
      case 'email':
        return <>Email: <a href={link} target="_blank" rel="noopener noreferrer">{acct}</a><br /></>;
      case 'instagram':
        return <>Instagram: <a href={link} target="_blank" rel="noopener noreferrer">@{acct}</a><br /></>;
      case 'twitter':
        return <>Twitter: <a href={link} target="_blank" rel="noopener noreferrer">@{acct}</a><br /></>;
      case 'facebook':
        return <>Facebook: <a href={acct} target="_blank" rel="noopener noreferrer">{acct}</a><br /></>;
      default:
        return null;
    }
  }

  console.log("getImage(featuredImage): ", getImage(featuredImage))


  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-12 businessPageGrid">

            <div className="col1">
              {featuredImage && <GatsbyImage className="businessImg" image={getImage(featuredImage)} alt={name} />}
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {name}
              </h1>
              <div className="openBusiness">{openForBusiness === true ? (<div className="openYes">Open: Modified Hours</div>) : (<div className="openNo">Closed</div>)}</div>
            </div>

            <div className="col2">
              {address !== null ? (
                <div className="businessTextSection">
                  <h2>Address</h2>
                  <div className="blog-post-content">
                    {address}
                    <div className="productMapLink"><a href={mapLink} target="_blank" rel="noopener noreferrer">View Map</a></div>
                  </div>
                </div>
              ) : null}
              {website !== null ? (
                <div className="businessTextSection"><h2>Website</h2>
                  <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                </div>
                ) : null}
              {phoneNumber !== null ? (
                <div className="businessTextSection"><h2>Phone</h2>
                  <a href={phoneLink}>{phoneNumber}</a>
                </div>
                ) : null}

                {(email !== null || socialFacebook !== null || socialInstagram !== null || socialTwitter !== null) ? (
                  <div className="businessTextSection">
                    <h2>Other ways to get in touch</h2>
                    <div className="blog-post-content">
                      {email && socialLink("email", email)}
                      {socialInstagram && socialLink("instagram", socialInstagram)}
                      {socialTwitter && socialLink("twitter", socialTwitter)}
                      {socialFacebook && socialLink("facebook", socialFacebook)}
                    </div>
                  </div>
                ) : null}

            </div>

            <div className="col3">
              <div className="businessTextSection">
                <h2>Hours</h2>
                {openForBusiness && (
                  <div className="blog-post-content">
                    <strong>Monday:</strong> {hoursMonday ? hoursMonday : "Closed"}<br />
                    <strong>Tuesday:</strong> {hoursTuesday ? hoursTuesday : "Closed"}<br />
                    <strong>Wednesday:</strong> {hoursWednesday ? hoursWednesday : "Closed"}<br />
                    <strong>Thursday:</strong> {hoursThursday ? hoursThursday : "Closed"}<br />
                    <strong>Friday:</strong> {hoursFriday ? hoursFriday : "Closed"}<br />
                    <strong>Saturday:</strong> {hoursSaturday ? hoursSaturday : "Closed"}<br />
                    <strong>Sunday:</strong> {hoursSunday ? hoursSunday : "Closed"}
                  </div>
                )}
              </div>

              {rules !== null ? (
                <div className="businessTextSection">
                  <h2>Rules to follow when visiting</h2>
                  {renderRichText(rules, options)}
                </div>
              ) : null}

              {otherWaysToSupport !== null ? (
                <div className="businessTextSection">
                  <h2>Other ways you can support us</h2>
                  {renderRichText(otherWaysToSupport, options)}
                </div>
              ) : null}

              {additionalInfo !== null ? (
                <div className="businessTextSection">
                  <h2>Additional Info</h2>
                  {renderRichText(additionalInfo, options)}
                </div>
              ) : null}
            </div>

            {tags && tags.length ? (
              <div className="col3" style={{ marginTop: `2rem` }}>
                <h4>Categories</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${tag
                       }/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BusinessPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string,
  openForBusiness: PropTypes.bool,
  hoursMonday: PropTypes.string,
  hoursTuesday: PropTypes.string,
  hoursWednesday: PropTypes.string,
  hoursThursday: PropTypes.string,
  hoursFriday: PropTypes.string,
  hoursSaturday: PropTypes.string,
  hoursSunday: PropTypes.string,
  otherContact: PropTypes.string,
  address:PropTypes.string,
  email:PropTypes.string,
  socialFacebook:PropTypes.string,
  socialInstagram:PropTypes.string,
  socialTwitter:PropTypes.string,
  website:PropTypes.string,
  featuredImage:PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  phoneNumber:PropTypes.string,
  hours:PropTypes.string,
  rules:PropTypes.object,
  otherWaysToSupport:PropTypes.object,
  additionalInfo:PropTypes.object,
  helmet: PropTypes.object,
}

const BusinessPost = ({ data }) => {
  const { contentfulBusiness: post } = data

  return (
    <Layout>
      <BusinessPostTemplate
        content="TODO content"
        description="TODO description"
        helmet={
          <Helmet defer={false}>
            <link rel="canonical" href={`https://rallycry.ca/category/${post.slug}`} />
            <meta
              name="og:url"
              content={`https://rallycry.ca/category/${post.slug}`}
            />
            <meta
              name="og:image"
              content={`${withPrefix('/')}og-image.jpg`}
            />
            <title>{post.name} | Rally Cry</title>
            <meta
              name="title"
              content={`${post.name} | Rally Cry`}
            />
            <meta
              name="og:title"
              content={`${post.name} | Rally Cry`}
            />
            <meta
              name="description"
              content={`${post.name} on Rally Cry. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
            />
            <meta
              name="og:description"
              content={`${post.name} on Rally Cry. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
            />
            <meta content="summary" name="twitter:card" />
            <meta content={`${post.name} | Rally Cry`} name="twitter:title" />
            <meta content={`${post.name} on Rally Cry. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`} name="twitter:description" />
          </Helmet>
        }
        // tags={post.frontmatter.tags}
        name={post.name}
        openForBusiness={post.openForBusiness}
        hoursMonday={post.hoursMonday}
        hoursTuesday={post.hoursTuesday}
        hoursWednesday={post.hoursWednesday}
        hoursThursday={post.hoursThursday}
        hoursFriday={post.hoursFriday}
        hoursSaturday={post.hoursSaturday}
        hoursSunday={post.hoursSunday}
        // otherContact={post.frontmatter.otherContact}
        address={post.address}
        website={post.website}
        featuredImage={post.featuredImage}
        phoneNumber={post.phoneNumber}
        email={post.email}
        socialFacebook={post.socialFacebook}
        socialInstagram={post.socialInstagram}
        socialTwitter={post.socialTwitter}
        rules={post.rules}
        otherWaysToSupport={post.otherWaysToSupport}
        additionalInfo={post.additionalInfo}
      />
    </Layout>
  )
}

BusinessPost.propTypes = {
  data: PropTypes.shape({
    BusinessPostByID: PropTypes.object,
  }),
}

export default BusinessPost

export const pageQuery = graphql`
  query BusinessPostByID($slug: String!) {
    contentfulBusiness(slug: { eq: $slug }) {
      id
      address
      categories {
        name
        slug
        id
      }
      email
      featuredImage {
        gatsbyImageData(width: 100, placeholder: DOMINANT_COLOR)
        fluid {
          src
        }
        title
      }
      hoursFriday
      hoursMonday
      hoursSaturday
      hoursSunday
      hoursThursday
      hoursTuesday
      hoursWednesday
      name
      openForBusiness
      otherWaysToSupport {
        raw
      }
      phoneNumber
      rules {
        raw
      }
      slug
      socialFacebook
      socialInstagram
      socialTwitter
      visible
      website
      additionalInfo {
        raw
      }
    }
  }
`
