import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import style from './header.module.less';

const Header = ({ pageName }) => {
  return (
    <header className={style.siteHeader}>
      <div className={style.content}>
        <p>
          <Link className={`${style.link} ${style.linkHome}`} to="/">
            Blog
            {pageName === 'blog' && <span className={style.active} />}
          </Link>
          <Link className={style.link} to="/about">
            About
            {pageName === 'about' && <span className={style.active} />}
          </Link>
          <a className={style.link} href="https://github.com/davidnguyen179">
            GitHub
          </a>
        </p>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  pageName: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
