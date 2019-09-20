import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content from '../components/content';
import Heading from '../components/title';
import SEO from '../components/seo';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Content>
        <Heading>{post.frontmatter.title}</Heading>
        <Heading color='dark' level={4}>
          {post.frontmatter.date} - {post.fields.readingTime.text}
        </Heading>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
