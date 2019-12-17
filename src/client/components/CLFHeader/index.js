import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const CLFHeader = ({ title, children }) => (
  <header role="banner">
    <Grid padded stackable>
      <Grid.Row className={styles.sfu_header}>
        <Grid.Column width={children ? 10 : 16}>
          <a
            href="https://www.sfu.ca/"
            name="sfu.ca Home Page"
            aria-label="sfu.ca Home Page"
          >
            <div className={styles.sfu_logo} />
          </a>
          <div className={styles.title}>
            <Header as="h1" size="large">
              {title}
            </Header>
          </div>
        </Grid.Column>
        {children && <Grid.Column width={6}>{children}</Grid.Column>}
      </Grid.Row>
      <div className={styles.rainbow} />
    </Grid>
  </header>
);

CLFHeader.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
};

export default CLFHeader;

/*
<header role="banner">
   <div class="grid sfu-header">
       <div class="row">
           <div class="col sm-12">
               <a href="http://www.sfu.ca">
                   <div class="sfu-logo"><h1>Simon Fraser University</h1></div>
               </a>
               <div class="sfu-service-name">
                   <h2>CAS</h2>
               </div>
           </div>
       </div>
       <div class="row sm-banner"></div>
   </div>
</header>
*/
