import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Title from '../components/title';
import Content from '../components/content';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  return (
    <Layout pageName="blog">
      <SEO title="Blog" />
      <Content>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.frontmatter.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Title level={3} type="title">
                {node.frontmatter.title}
              </Title>
              <Title level={5} color="dark" type="date">
                {node.frontmatter.date} - {node.fields.readingTime.text}
              </Title>
              <p>{node.frontmatter.description}</p>
            </Link>
          </div>
        ))}
      </Content>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "DD MMMM, YYYY")
            path
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`;
