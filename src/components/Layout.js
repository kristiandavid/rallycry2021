import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

const TemplateWrapper = ({ children }) => {
  const { title, description, siteURL } = useSiteMetadata()
  return (
    <div>
      <Helmet defer={false}>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteURL} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}safari-pinned-tab.svg`}
          color="#A13639"
        />
        <meta name="theme-color" content="#A13639" />

        <meta property="og:type" content="business.business" />
        <meta content={`${withPrefix('/')}mstile-310x310`} name="twitter:image" />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
