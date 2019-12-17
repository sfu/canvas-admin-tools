import React from 'react';

import 'sfu-fonts';
import '@sfu/semantic-ui-css-sfu/semantic.css';
import styles from './styles.module.css';

import CLFWrapper from '../CLFWrapper';
import CLFHeader from '../CLFHeader';
import CLFMainContent from '../CLFMainContent';
import CLFFooter from '../CLFFooter';

const App = () => (
  <CLFWrapper>
    <CLFHeader title="Canvas Support Tools" />
    <CLFMainContent>
      <p>Content Here</p>
    </CLFMainContent>
    <CLFFooter />
  </CLFWrapper>
);

export default App;
