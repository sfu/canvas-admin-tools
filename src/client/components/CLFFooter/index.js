import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import styles from './styles.module.css';

const CLFFooter = () => {
  return (
    <Grid padded as="footer" className={styles.footer}>
      <Grid.Column mobile={8} computer={3}>
        <ul>
          <li>
            <a href="https://www.sfu.ca/main/admission.html">Admission</a>
          </li>
          <li>
            <a href="https://www.sfu.ca/main/programs.html">Programs</a>
          </li>
          <li>
            <a href="https://www.sfu.ca/main/learning.html">Learning</a>
          </li>
          <li>
            <a href="https://www.sfu.ca/main/research-at-sfu.html">Research</a>
          </li>
          <li>
            <a href="https://www.sfu.ca/main/sfu-community.html">Community</a>
          </li>
          <li>
            <a href="https://www.sfu.ca/main/about.html">About</a>
          </li>
        </ul>
      </Grid.Column>

      <Grid.Column mobile={8} computer={3}>
        <ul>
          <li>
            <a href="https://www.sfu.ca/main/campuses/maps.html">
              Maps + directions
            </a>
          </li>
          <li>
            <a href="http://www.lib.sfu.ca/">Library</a>
          </li>
          <li>
            <a href="https://www.sfu.ca/calendar">Academic Calendar</a>
          </li>
          <li>
            <a href="http://www.sfu.ca/security/sfuroadconditions/">
              Road Report
            </a>
          </li>
          <li>
            <a href="http://www.sfu.ca/advancement">Give to SFU</a>
          </li>
          <li>
            <a href="http://www.sfu.ca/emergency">Emergency Information</a>
          </li>
        </ul>
      </Grid.Column>

      <Grid.Column mobile={8} computer={3}>
        <ul>
          <li className={styles.header}>Connect with us</li>
          <li>
            <div>
              <p>
                <a href="http://www.twitter.com/sfu_it">
                  <Icon name="twitter" /> Twitter
                </a>
                <br />
              </p>
            </div>
          </li>
        </ul>
      </Grid.Column>

      <Grid.Column mobile={8} computer={3}>
        <ul>
          <li className={styles.header}>
            <a href="https://www.sfu.ca/itservices/contact.html">Contact us</a>
          </li>
          <li>
            <div>
              <p>
                <b>IT Services</b>
              </p>
              <p>
                Strand Hall 1001
                <br />
                8888 University Drive
                <br />
                Burnaby, B.C.
                <br />
                Canada. V5A 1S6
              </p>
            </div>
          </li>
        </ul>
      </Grid.Column>

      <Grid.Column mobile={8} computer={3}>
        <ul>
          <li>
            <a href="https://www.sfu.ca/contact/terms-conditions.html">
              Terms and conditions
            </a>
          </li>
          <li>© Simon Fraser University</li>
          <li className={styles.land_acknowledgement}>
            SFU acknowledges the Squamish, Musqueam, Tsleil-Waututh, Katzie and
            Kwikwetlem peoples on whose traditional territories our three
            campuses stand.
          </li>
        </ul>
      </Grid.Column>
    </Grid>
  );
};

export default CLFFooter;
