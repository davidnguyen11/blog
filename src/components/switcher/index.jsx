import React, { useState } from 'react';
import PropTypes from 'prop-types';

import light from '../../images/svg/light.svg';
import dark from '../../images/svg/dark.svg';

import style from './switcher.module.less';

function Switcher(props) {
  const [mode, setMode] = useState('light');

  /**
   * Set mode when start the web page
   */
  let theme = 'light';
  try {
    theme = window.localStorage.getItem('theme');
    setMode(!theme ? 'light' : theme);
  } catch (err) {}

  const handleClick = () => {
    const theme = mode === 'light' ? 'dark' : 'light';
    setMode(theme);
    document.body.className = theme;
    window.localStorage.setItem('theme', theme);
  };

  const imgUrl = mode === 'dark' ? dark : light;

  return (
    <div onClick={handleClick} className={style.switcherContainer}>
      <img height={40} src={imgUrl} alt={mode} />
    </div>
  );
}

Switcher.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
  onChange: PropTypes.func,
};

export default Switcher;
