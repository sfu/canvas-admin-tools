import React from 'react';
import { Container } from 'semantic-ui-react';
import 'sfu-fonts';
import '@sfu/semantic-ui-css-sfu/semantic.css';
import styles from './styles.module.css';

import CLFWrapper from '../CLFWrapper';
import CLFHeader from '../CLFHeader';
import CLFMainContent from '../CLFMainContent';
import CLFFooter from '../CLFFooter';

import AddUserToCourse from '../AddUserToCourse';

const App = () => (
  <CLFWrapper>
    <CLFHeader title="Canvas Support Tools" />
    <CLFMainContent>
      <Container>
        <AddUserToCourse />
      </Container>
    </CLFMainContent>
    <CLFFooter />
  </CLFWrapper>
);

export default App;
