import React from "react"

import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql } from "gatsby"

const AboutPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
            url
          }
        }
      }
    `
  )
  const image = `${site.siteMetadata.url}${site.siteMetadata.image}`

  return (
    <Layout>
      <SEO title="About" image={image} keywords={[`gatsby`, `application`, `react`]} />
      <LandingBio />
    </Layout>
  )
}

export default AboutPage
