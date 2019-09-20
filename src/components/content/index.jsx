import React from 'react';
import PropTypes from 'prop-types';

import style from './content.module.less';

const Content = props => <div className={style.conent}>{props.children}</div>;

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
