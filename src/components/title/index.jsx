import React from 'react';
import PropTypes from 'prop-types';

import style from './title.module.less';

class Title extends React.Component {
  render() {
    const { children } = this.props;
    const elementType = this.getHeadingTagType();
    const className = this.getClassName();
    return React.createElement(elementType, { className, children });
  }

  getHeadingTagType() {
    const { level } = this.props;
    return `h${level}`;
  }

  getClassName() {
    const color = this.getColorClassName();
    const layout = this.getLayoutClassName();
    const size = this.getSizeClassName();
    const classes = [style.heading, style[`headingH${this.props.level}`]];

    if (color) {
      classes.push(color);
    }

    if (layout) {
      classes.push(layout);
    }

    if (size) {
      classes.push(size);
    }

    return classes.join(' ');
  }

  getColorClassName() {
    const { color } = this.props;
    let className;

    switch(color) {
      case 'black':
        className = style.colorBlack;
        break;
      case 'dark':
        className = style.colorDark;
        break;
      default:
        break;
    }
    return className;
  }

  getLayoutClassName() {
    const { layout } = this.props;
    let className;

    switch(layout) {
      case 'inline':
        className = style.layoutInline;
        break;
      case 'block':
        className = style.layoutBlock;
        break;
      default:
        break;
    }
    return className;
  }

  getSizeClassName() {
    const { size } = this.props;
    let className;

    switch(size) {
      case 'small':
        className = style.sizeSmall;
        break;
      case 'medium':
        className = style.sizeMedium;
        break;
      case 'large':
        className = style.sizeLarge;
        break;
      default:
        break;
    }
    return className;
  }
}

Title.propTypes = {
  /* Heading type such as h1, h2, h3, h4, h5 */
  level: PropTypes.oneOf([1, 2, 3, 4, 5]),
  /* Custom size for heading */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /* Heading color */
  color: PropTypes.oneOf(['dark', 'black']),
  /* Heading display type  */
  layout: PropTypes.oneOf(['inline', 'block']),
  /* The children node  */
  children: PropTypes.node.isRequired,
};

Title.defaultProps = {
  level: 1,
  color: 'black',
  layout: 'block',
};

export default Title;
