import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Title from '../title';

import style from './landing.module.less';

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className={style.container}>
        <div className={style.content}>
          <Title size='large'>
            <span role="img" aria-label="I build stuffs">
              🍺👨🏻‍💻☕️ & 📸
            </span>
          </Title>
          <p className={style.description}>I build stuffs</p>
        </div>
      </div>
    )}
  />
);

export default LandingBio;
