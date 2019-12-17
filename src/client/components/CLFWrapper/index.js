import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const CLFWrapper = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

CLFWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CLFWrapper;
