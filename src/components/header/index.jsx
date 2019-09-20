import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import style from './header.module.less';

const Header = () => (
  <header className={style.siteHeader}>
    <div className={style.content}>
      <p>
        <Link className={`${style.link} ${style.linkHome}`} to="/">Blog</Link>
        <Link className={style.link} to="/about">About</Link>
        <a className={style.link} href="https://github.com/davidnguyen179">GitHub</a>
      </p>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
