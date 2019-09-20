/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../header';

import style from './layout.module.less';

import '../../assets/global.less';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header />
        <div className={style.content}>
          <main>{children}</main>
          <footer className={style.footer}>
            <a className={style.link} href="https://www.linkedin.com/in/dzungnguyen179/">
              linkedin
            </a>
            {`-`}
            <a className={style.link} href="https://github.com/davidnguyen179">
              github
            </a>
            {`-`}
            <a className={style.link} href="https://twitter.com/davidnguyen1791">
              twitter
            </a>
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
