import React from 'react';

import Landing from '../components/landing';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { useStaticQuery, graphql } from 'gatsby';

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
  );
  const image = `${site.siteMetadata.url}${site.siteMetadata.image}`;

  return (
    <Layout>
      <SEO
        title="About"
        image={image}
        keywords={[`gatsby`, `application`, `react`]}
      />
      <Landing />
    </Layout>
  );
};

export default AboutPage;
